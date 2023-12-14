import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { LeaderRoleService } from '../leader_role/leader_role.service';
// import { JwtPayload } from './strategies/jwt-payload.interface';
// import { User } from '../user/interfaces/user.interface';


@Injectable()
export class AuthService {
  private jwtBlacklist: string[] = [];  
  constructor(
    private leaderRoleService: LeaderRoleService,
    private userService: UserService, 
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async register(registerDto: RegisterDto) {
    const { email } = registerDto;

    // Vérifie si l'utilisateur existe déjà
    const userInDb = await this.userService.findOneByEmail(email);
    if (userInDb) {
        throw new ConflictException('Email already registered');
    }

    // Hash le mot de passe
    const hashedPassword = await this.hashPassword(registerDto.password);

    // Crée un nouvel objet utilisateur
    let newUser = {
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        email: email,
        password: hashedPassword,
        isAdmin: registerDto.isAdmin,
        isActive: registerDto.isActive,
        createdAt: new Date(),
        gender: registerDto.gender,
        leaderRoles: null,
    };

    if (registerDto.leaderRoles) {
        const newLeaderRoles = await this.leaderRoleService.create(registerDto.leaderRoles);
        newUser.leaderRoles = newLeaderRoles._id;
    }

    // Enregistre le nouvel utilisateur dans la base de données
    console.log('newUser',newUser);
    
    return this.userService.create(newUser);
}


  async validateUser(email: string, pass: string): Promise<any> {
    // console.log('validateUser: ', email, pass);
    
    const user = await this.userService.findOneByEmail(email);
    
    if (user && bcrypt.compare(pass, user.password)) {
        // console.log('validateUser2: ', user, ' is valid', pass, user.password, 'bcrypt', bcrypt.compare(pass, user.password), );
        
    const { password, ...result } = user;
    
    return result;
    }
    return null;
  }

  // async refresh(refreshToken: string): Promise<any> {
  //   try {
  //     const payload = await this.jwtService.verifyAsync(refreshToken);

  //     const user = await this.userService.findOneById(payload.sub);
  //     if (!user || user.refreshToken !== refreshToken) {
  //       throw new UnauthorizedException();
  //     }

  //     const newPayload = { email: user.email, sub: user._id, isAdmin: user.isAdmin };
  //     return {
  //       access_token: await this.jwtService.signAsync(newPayload, { expiresIn: '15m' }),
  //     };
  //   } catch (err) {
  //     throw new UnauthorizedException();
  //   }
  // }

  async login(email: string, pass: string): Promise<any> {

    const user = await this.userService.findOneByEmail(email);
    console.log('user',user);
    

    let passwordCrypt = bcrypt.compare(pass, user.password)

    if (!passwordCrypt) {
        throw new UnauthorizedException();   
    } 
    
    // Get the leaderRoles document for the user
    const leaderRoles = await this.leaderRoleService.findOneById(user.leaderRoles.toString());
    console.log('leaderRoles',leaderRoles);
    

    const payload = { 
        email: user.email, 
        sub: user._id, 
        isAdmin: user.isAdmin,
        roles: leaderRoles.roles  // Add the user roles to the payload
    };
    console.log('payload',payload);
    
    
    // const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    // await this.userService.updateRefreshToken(user._id.toString(), refreshToken);

    return {
      access_token: await this.jwtService.signAsync(payload),
      expires_in: moment().add(7, 'days').unix(),
      // refresh_token: refreshToken,
    };
  }

  async updatePassword(userId: string, newPassword: string, currentPassword: string): Promise<void> {
    const user = await this.userService.findOneById(userId);
    console.log(user);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Vérifier le mot de passe actuel
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    console.log('validPassword: ', validPassword, );
    console.log('user.password: ', user.password);
    console.log('currentPassword: ', currentPassword,);
    console.log('newPassword',newPassword);
    
    
    
    if (!validPassword) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Vérifier la complexité du nouveau mot de passe
    if (newPassword.length < 8) {
      throw new BadRequestException('New password must be at least 8 characters long');
    }
    if (!/[0-9]/.test(newPassword)) {
      throw new BadRequestException('New password must contain at least one digit');
    }
    if (!/[A-Z]/.test(newPassword)) {
      throw new BadRequestException('New password must contain at least one uppercase letter');
    }

    // Hacher et enregistrer le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
  }
  
  async updateIsAdmin(email: string, isAdmin: boolean): Promise<void> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isAdmin = isAdmin;

    await user.save();
  }

  async updateIsActive(email: string, isActive: boolean): Promise<void> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = isActive;

    await user.save();


  }

  // async logout(user: User) {
  //   await this.userService.updateRefreshToken(user._id, null);
  //   this.jwtBlacklist.push(user.refreshToken);
  // }
  // isBlacklisted(jwt: string): boolean {
  //   return this.jwtBlacklist.includes(jwt);
  // }
}
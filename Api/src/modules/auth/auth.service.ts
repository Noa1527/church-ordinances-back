import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { LeaderRoleService } from '../leader_role/leader_role.service';

@Injectable()
export class AuthService {
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

    return this.userService.create(newUser);
}


  async validateUser(email: string, pass: string): Promise<any> {
    
    const user = await this.userService.findOneByEmail(email);
    
    if (user && bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, pass: string): Promise<any> {

    const user = await this.userService.findOneByEmail(email);

    let passwordCrypt = bcrypt.compare(pass, user.password)

    if (!passwordCrypt) {
        throw new UnauthorizedException();   
    } 
    
    // Get the leaderRoles document for the user
    const leaderRoles = await this.leaderRoleService.findOneById(user.leaderRoles.toString());
    const payload = { 
        email: user.email, 
        sub: user._id, 
        isAdmin: user.isAdmin,
        roles: leaderRoles.roles 
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      expires_in: moment().add(7, 'days').unix(),
    };
  }

  async updatePassword(userId: string, newPassword: string, currentPassword: string): Promise<void> {
    const user = await this.userService.findOneById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Vérifier le mot de passe actuel
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    
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
}
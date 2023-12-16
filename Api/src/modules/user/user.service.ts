import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDocument, User} from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(user: Partial<User>): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async profile(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async findAll() {
        return await this.userModel.find().exec();
    }

    async findOneByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }

    async findOneById(id: string) {
        return await this.userModel.findById(id).exec();
    }

    async findOneByFirstName(firstName: string) {
        return await this.userModel.findOne({ firstName }).exec();
    }

    async findOneByLastName(lastName: string) {
        return await this.userModel.findOne({ lastName }).exec();
    }

    async findOneByIsActive(isActive: boolean) {
        return await this.userModel.findOne({ isActive }).exec();
    }

    async findOneByIsAdmin(isAdmin: boolean) {
        return await this.userModel.findOne({ isAdmin }).exec();
    }

    async findOneByCreatedAt(createdAt: Date) {
        return await this.userModel.findOne({ createdAt }).exec();
    }

    async update(id: string, updateDto: UpdateUserDto) {

        const { email, firstName, lastName } = updateDto
    
        const getUser = await this.userModel.findById(id).exec();
    
        if (!getUser) {
            throw new NotFoundException('User not found');
        }
    
        if (getUser.firstName !== firstName) {
            getUser.firstName = firstName;
        } else {
            throw new ConflictException('Vous avez déjà mis ce prénom, veuillez en choisir un autre');
        }
    
        if (getUser.lastName !== lastName) {
            getUser.lastName = lastName;
        } else {
            throw new ConflictException('Vous avez déjà mis ce nom de famille, veuillez en choisir un autre');
        }
    
        if (getUser.email !== email) {
            const userInDb = await this.userModel.findOne({ email }).exec();
            if (userInDb) {
                throw new ConflictException('Cet email est déjà utilisé par un autre utilisateur, veuillez en choisir un autre');
            }
            getUser.email = email;
        } else {
            throw new ConflictException('Vous avez déjà mis cette email, veuillez en choisir un autre');
        }
    
        await getUser.save();
    
        return getUser;
    }
    

    async delete(id: string) {
        return await this.userModel.findByIdAndRemove(id);
    }

    async updateRefreshToken(userId: string, refreshToken: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(userId, { refreshToken }, { new: true });
      }
}

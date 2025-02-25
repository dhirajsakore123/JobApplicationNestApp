import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schems';
import { Model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const existingUser = await this.userModel.findOne({
      username: createAuthDto.username,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const newUser = new this.userModel({
      ...createAuthDto,
      password: await hash(createAuthDto.password, 10),
    });
    return await newUser.save();
  }
  async login(user: User) {
    const foundUser = await this.userModel.findOne({ username: user.username });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    const payload: TokenPayload = {
      userId:
        foundUser._id instanceof ObjectId
          ? foundUser._id.toString()
          : String(foundUser._id),
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: '123456',
      expiresIn: '10h',
    });
    return { token: accessToken };
  }

  async verifyuser(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const match = await compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

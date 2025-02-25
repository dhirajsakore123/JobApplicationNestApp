import { LocalAuthGuard } from './guards/local-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CurrentUser } from './current-user.decorator';
import { User } from './schemas/user.schems';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() payload: CreateAuthDto) {
    return this.authService.create(payload);
  }

  @Post('login')
  async login(@Body() payload: { username: string; password: string }) {
    const user = await this.authService.verifyuser(
      payload.username,
      payload.password,
    );
    return this.authService.login(user);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

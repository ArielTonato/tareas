import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/Auth.guard';
import { ActiveUser } from './decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/ActiveUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('registro')
  register(@Body() userRegister:RegisterDto) {
    return this.authService.register(userRegister);
  }

  @Get('perfil')
  @UseGuards(AuthGuard)
  profile(@ActiveUser() user:ActiveUserInterface) {
    return this.authService.profile(user);
  }

}

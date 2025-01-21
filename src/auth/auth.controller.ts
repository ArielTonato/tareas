import { Controller, Get, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/Auth.guard';
import { ActiveUser } from './decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/ActiveUser.interface';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('registro')
  register(@Body() userRegister: RegisterDto) {
    return this.authService.register(userRegister);
  }

  @Get('perfil')
  @UseGuards(AuthGuard)
  profile(@ActiveUser() user: ActiveUserInterface) {
    return this.authService.profile(user);
  }

  @Get('google')
  @UseGuards(PassportAuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(PassportAuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = await this.authService.validateGoogleUser(req.user);
    const payload = {
      id: user.usuario_id,
      nombre: user.nombre,
      apellido: user.apellido,
      rol: user.rol,
      correo: user.correo,
      numero: user.numero,
    };
    const token = this.authService.generateJwt(payload);
    res.redirect(`${process.env.REDIRECTION_URL}?token=${token}`);
  }
}
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService
  ) {}


  async login({nombre_usuario, password}: LoginDto) {
    const user = await this.usuarioService.findByUserNameAndPassword(nombre_usuario);
    if (!user) {
      throw new BadRequestException('Credenciales incorrectas o usuario no encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Credenciales incorrectas o usuario no encontrado');
    }
    const payload = {id:user.usuario_id, nombre: user.nombre, apellido: user.apellido, rol: user.rol, correo: user.correo, numero: user.numero};
    const token = this.jwtService.sign(payload);
    return {token};
  }

  async register(userRegister:RegisterDto){
    const user = await this.validateUser(userRegister);
    await this.usuarioService.create({
      ...user,
      password: await bcrypt.hash(userRegister.password, 10)
    });

    return {message: "Usuario registrado correctamente"};
  }

  async validateUser(user:RegisterDto) {
    const userExists = await this.usuarioService.findOneByEmail(user.correo);
    if(userExists){
        throw new BadRequestException('Ya existe un usuario con ese correo');
    }
    const userExistsPhone = await this.usuarioService.findOneByCellPhone(user.numero);
    if(userExistsPhone){
        throw new BadRequestException('Ya existe un usuario con ese número de teléfono');
    }
    return user
  }
}

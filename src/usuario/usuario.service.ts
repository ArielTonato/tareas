import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioRepository.save(createUsuarioDto);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOneWithOutPassword(id: number) {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException('El usuario no existe');
    }
    return user;
  }

  findOne(id: number) {
    return this.usuarioRepository.findOneBy({ usuario_id: id });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.validateUser(id, updateUsuarioDto);
    
    // Si hay una contraseña nueva, la hasheamos
    if (updateUsuarioDto.password) {
      const hashedPassword = await bcrypt.hash(updateUsuarioDto.password, 10);
      updateUsuarioDto = {
        ...updateUsuarioDto,
        password: hashedPassword
      };
    }

    await this.usuarioRepository.update({ usuario_id: id }, updateUsuarioDto);
    return { message: "Usuario actualizado" };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }
    await this.usuarioRepository.delete({ usuario_id: id });
    return { message: "Usuario eliminado" };
  }

  findByUserNameAndPassword(userName: string) {
    return this.usuarioRepository.findOne({
      where: { nombre_usuario: userName },
      select: ['usuario_id','correo', 'password', "nombre", "apellido", "rol"]
    });
  }

  async findOneByEmail(correo: string) {
    return this.usuarioRepository.findOneBy({ correo });
  }

  async findByUserName(userName: string) {
    return this.usuarioRepository.findOneBy({ nombre_usuario: userName });
  }

  async findOneByCellPhone(numero: string) {
    return this.usuarioRepository.findOneBy({ numero });
  }

  async validateUser(id: number, user: UpdateUsuarioDto) {
    const userE = await this.usuarioRepository.findOneBy({ usuario_id: id });
    if (!userE) {
      throw new BadRequestException('El usuario no existe');
    }

    if (user.nombre_usuario) {
      const userNameExists = await this.findByUserName(user.nombre_usuario);
      if (userNameExists && userNameExists.usuario_id !== id) {
        throw new BadRequestException('Ya existe un usuario con ese nombre de usuario');
      }
    }

    if (user.correo) {
      const userExists = await this.findOneByEmail(user.correo);
      if (userExists && userExists.usuario_id !== id) {
        throw new BadRequestException('Ya existe un usuario con ese correo');
      }
    }

    if (user.numero) {
      const userExistsPhone = await this.findOneByCellPhone(user.numero);
      if (userExistsPhone && userExistsPhone.usuario_id !== id) {
        throw new BadRequestException('Ya existe un usuario con ese número de teléfono');
      }
    }

    return user;
  }
}
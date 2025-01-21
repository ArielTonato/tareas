import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  findOne(id: number) {
    return this.usuarioRepository.findOneBy({ usuario_id: id });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try{
      await this.validateUser(id, updateUsuarioDto);
      this.usuarioRepository.update({ usuario_id: id }, updateUsuarioDto);
      return { message: "Usuario actualizado" }
    }catch(error){
      throw new BadRequestException(error);
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }
    await this.usuarioRepository.delete({ usuario_id: id });
    return { message: "Usuario eliminado" };
  }

  async findOneByEmail(correo: string) {
    return this.usuarioRepository.findOneBy({ correo });
  }

  async findOneByCellPhone(numero: string) {
    return this.usuarioRepository.findOneBy({ numero });
  }


  async validateUser(id: number, user: UpdateUsuarioDto) {
    const userE = await this.usuarioRepository.findOneBy({ usuario_id: id });
    if (!userE) {
      throw new BadRequestException('El usuario no existe');
    }
    const userExists = await this.findOneByEmail(user.correo);
    if (userExists && userExists.usuario_id !== id) {
      throw new BadRequestException('Ya existe un usuario con ese correo');
    }
    const userExistsPhone = await this.findOneByCellPhone(user.numero);
    if (userExistsPhone && userExistsPhone.usuario_id !== id) {
      throw new BadRequestException('Ya existe un usuario con ese número de teléfono');
    }
    return user;
  }

}

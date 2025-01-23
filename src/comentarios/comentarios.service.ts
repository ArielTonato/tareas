import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario } from './entities/comentario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ComentariosService {

  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>
  ) { }

  create(createComentarioDto: CreateComentarioDto) {
    try{
      return this.comentarioRepository.save(createComentarioDto);
    }catch(err){
      throw new BadRequestException('Error al crear comentario');
    }
  }

  findByTarea(id: number) {
    return this.comentarioRepository.find({
      where: { id_tarea: id },
      order: { fecha_comentario: 'ASC' },
      relations: ['usuario']
    });
  }

  update(id: number, updateComentarioDto: UpdateComentarioDto) {
    return `This action updates a #${id} comentario`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { Repository } from 'typeorm';
import { TareasService } from 'src/tareas/tareas.service';
import { EstadoTarea } from 'src/common/enums/estado-tarea.enum';

@Injectable()
export class EncuestaService {
  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,
    private readonly tareasService: TareasService
  ) {}

  async create(createEncuestaDto: CreateEncuestaDto) {
    const tarea = await this.tareasService.findOne(createEncuestaDto.id_tarea);
    if (!tarea) {
      throw new Error('Tarea no encontrada');
    }
    if(tarea.estado !== EstadoTarea.FINALIZADO){
      throw new BadRequestException('La tarea debe estar finalizada para poder realizar la encuesta');
    }
    return this.encuestaRepository.save(createEncuestaDto);
  }

  findAll() {
    return this.encuestaRepository.find();
  }

  findOne(id: number) {
    return this.encuestaRepository.findOne({ where: { encuesta_id: id } });
  }

  findOneByTarea(id_tarea: number) {
    return this.encuestaRepository.findOne({ where: { id_tarea} });
  }

}

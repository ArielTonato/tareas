import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Between, Like, Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { EstadoTarea } from 'src/common/enums/estado-tarea.enum';
import { ComprobanteService } from 'src/comprobante/comprobante.service';
import { EstadoComprobante } from 'src/common/enums/estado-comprobante.enum';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly comprobanteService: ComprobanteService,
  ) { }

  async create(createTareaDto: CreateTareaDto, file: Express.Multer.File) {
    try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const fechaARealizarDate = new Date(createTareaDto.fecha_a_realizar);
      fechaARealizarDate.setHours(0, 0, 0, 0);

      if (fechaARealizarDate <= currentDate) {
        throw new BadRequestException('La fecha a realizar debe ser mayor a la fecha actual');
      }

      const uploadResult = await this.cloudinaryService.upload(file);

      const newTarea = this.tareaRepository.create({
        ...createTareaDto,
        adjunto_url: uploadResult.secure_url
      });

      return await this.tareaRepository.save(newTarea);
    } catch (error) {
      throw new BadRequestException('Error al crear la tarea: ' + error.message);
    }
  }

  findAll() {
    return this.tareaRepository.find({
      relations: ['comentarios',"encuestas","comprobantes"]
    });
  }

  findOne(id: number) {
    return this.tareaRepository.findOne({ where: { id }, relations: ['comentarios', 'encuestas'] });
  }

  async findByEstado(estado: EstadoTarea) {
    try {
      const tareas = await this.tareaRepository.find({
        where: { estado },
        order: { fecha_envio: 'DESC' },
        relations: ['comentarios', 'encuestas']
      });

      if (!tareas.length) {
        throw new NotFoundException(`No se encontraron tareas con estado: ${estado}`);
      }

      return tareas;
    } catch (error) {
      throw new BadRequestException('Error al buscar tareas: ' + error.message);
    }
  }

  async getTotalByEstado() {
    try {
      const totales = {
        aprobadas: await this.tareaRepository.count({ where: { estado: EstadoTarea.APROBADA } }),
        en_progreso: await this.tareaRepository.count({ where: { estado: EstadoTarea.EN_PROGRESO } }),
        enRevision: await this.tareaRepository.count({ where: { estado: EstadoTarea.EN_REVISION } }),
        finalizadas: await this.tareaRepository.count({ where: { estado: EstadoTarea.FINALIZADO } })
      };

      return {
        message: 'Total de tareas por estado',
        data: totales
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener totales: ' + error.message);
    }
  }


  async searchTareas(searchTerm: string) {
    try {
      const tareas = await this.tareaRepository.find({
        where: [
          { nombre: Like(`%${searchTerm}%`) }
        ],
        relations: ['comentarios', 'encuestas'],
        order: { fecha_envio: 'DESC' }
      });

      if (!tareas.length) {
        throw new NotFoundException(`No se encontraron tareas que coincidan con: ${searchTerm}`);
      }

      return {
        message: 'Tareas encontradas',
        data: tareas
      };
    } catch (error) {
      throw new NotFoundException('Error al buscar tareas: ' + error.message);
    }
  }

  async findByUser(userId: number) {
    try {
      const tareas = await this.tareaRepository.find({
        where: { usuario_cliente_id: userId },
        order: { fecha_envio: 'DESC' },
        relations: ['comentarios', 'encuestas','comprobantes']
      });

      if (!tareas.length) {
        throw new NotFoundException(`No se encontraron tareas para el usuario: ${userId}`);
      }

      return tareas;
    } catch (error) {
      throw new BadRequestException('Error al buscar tareas del usuario: ' + error.message);
    }
  }

  async update(id: number, updateTareaDto: UpdateTareaDto, file?: Express.Multer.File) {
    try {
      const tarea = await this.tareaRepository.findOne({ where: { id } });
      if (!tarea) {
        throw new BadRequestException(`Tarea con ID ${id} no encontrada`);
      }

      if (updateTareaDto.fecha_a_realizar) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const fechaARealizarDate = new Date(updateTareaDto.fecha_a_realizar);
        fechaARealizarDate.setHours(0, 0, 0, 0);

        if (fechaARealizarDate <= currentDate) {
          throw new BadRequestException('La fecha a realizar debe ser mayor a la fecha actual');
        }
      }

      const comprobante = await this.comprobanteService.findOne(id);
      console.log(comprobante);
      if (comprobante) {
        if (updateTareaDto.estado === EstadoTarea.CANCELADA && comprobante.estado_comprobante === EstadoComprobante.RECHAZADO) {
          throw new BadRequestException('El comprobante no puede ser cancelado porque ya fue rechazado');
        }

        if (updateTareaDto.estado === EstadoTarea.CANCELADA && comprobante.estado_comprobante === EstadoComprobante.APROBADO) {
          throw new BadRequestException('El comprobante no puede ser cancelado porque ya fue aprobado'); {
          }
        }
      }
      
      if (file) {
        const uploadResult = await this.cloudinaryService.upload(file);
        updateTareaDto.tarea_realizada_url = uploadResult.secure_url;
        updateTareaDto.estado = EstadoTarea.FINALIZADO;
        updateTareaDto.fecha_realizada = new Date();
      }

      if (updateTareaDto.estado === EstadoTarea.FINALIZADO) {
        updateTareaDto.fecha_realizada = new Date();
      }

      const updatedTarea = Object.assign(tarea, updateTareaDto);
      return await this.tareaRepository.save(updatedTarea);

    } catch (error) {
      throw new BadRequestException('Error al actualizar la tarea: ' + error.message);
    }
  }


  remove(id: number) {
    return `This action removes a #${id} tarea`;
  }
}

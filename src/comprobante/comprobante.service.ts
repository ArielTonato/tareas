import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { UpdateComprobanteDto } from './dto/update-comprobante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comprobante } from './entities/comprobante.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { TareasService } from 'src/tareas/tareas.service';
import { EstadoTarea } from 'src/common/enums/estado-tarea.enum';
import { EstadoComprobante } from 'src/common/enums/estado-comprobante.enum';

@Injectable()
export class ComprobanteService {
  constructor(
    @InjectRepository(Comprobante)
    private readonly comprobanteRepository: Repository<Comprobante>,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => TareasService))
    private readonly tareasService: TareasService,
  ) {}
  async create(createComprobanteDto: CreateComprobanteDto, file : Express.Multer.File) {
    try{
      const uploadResult = await this.cloudinaryService.upload(file);
      return this.comprobanteRepository.save({
        ...createComprobanteDto,
        url_comprobante: uploadResult.secure_url
      });
    }catch(err){
      throw new Error('Error al crear comprobante');
    }
  }

  findAll() {
    return this.comprobanteRepository.find();
  }

  findOne(id: number) {
    return this.comprobanteRepository.findOne({ where: { id_comprobante: id } });
  }

  async update(id: number, updateComprobanteDto: UpdateComprobanteDto) {
    if (updateComprobanteDto.estado_comprobante === EstadoComprobante.APROBADO) {
      const tarea = await this.tareasService.findOne(id);
      if (!tarea) {
        throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
      }
      tarea.estado = EstadoTarea.APROBADA;
      await this.tareasService.update(id, tarea);
      return this.comprobanteRepository.update(id, updateComprobanteDto);
    }else if (updateComprobanteDto.estado_comprobante === EstadoComprobante.RECHAZADO) {
      const tarea = await this.tareasService.findOne(id);
      if (!tarea) {
        throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
      }
      tarea.estado = EstadoTarea.RECHAZADA;
      await this.tareasService.update(id, tarea);
      return this.comprobanteRepository.update(id, updateComprobanteDto);
    }
    return this.comprobanteRepository.update(id, updateComprobanteDto);
  }

  remove(id: number) {
    return `This action removes a #${id} comprobante`;
  }
}

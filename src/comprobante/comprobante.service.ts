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

  async create(createComprobanteDto: CreateComprobanteDto, file: Express.Multer.File) {
    try {
      const uploadResult = await this.cloudinaryService.upload(file);
      return this.comprobanteRepository.save({
        ...createComprobanteDto,
        url_comprobante: uploadResult.secure_url,
      });
    } catch (err) {
      throw new Error('Error al crear comprobante');
    }
  }

  findAll() {
    return this.comprobanteRepository.find();
  }

  findByTarea(id: number) {
    return this.comprobanteRepository.findOne({
      where: { id_tarea: id }
    });
  }

  findOne(id: number) {
    return this.comprobanteRepository.findOne({ where: { id_comprobante: id } });
  }

  async update(id: number, updateComprobanteDto: UpdateComprobanteDto) {
    const comprobante = await this.comprobanteRepository.findOne({ where: { id_comprobante: id } });
    if (!comprobante) {
      throw new NotFoundException(`Comprobante con ID ${id} no encontrada`);
    }

    await this.updateTareaEstado(comprobante.id_tarea, updateComprobanteDto.estado_comprobante);
    updateComprobanteDto.fecha_revision = new Date();
    return this.comprobanteRepository.update(id, updateComprobanteDto);
  }

  private async updateTareaEstado(id_tarea: number, estado_comprobante: EstadoComprobante) {
    const tarea = await this.tareasService.findOne(id_tarea);
    if (!tarea) {
      throw new NotFoundException(`Tarea con ID ${id_tarea} no encontrada`);
    }

    if (estado_comprobante === EstadoComprobante.APROBADO) {
      tarea.estado = EstadoTarea.APROBADA;
    } else if (estado_comprobante === EstadoComprobante.RECHAZADO) {
      tarea.estado = EstadoTarea.RECHAZADA;
    }

    await this.tareasService.update(id_tarea, tarea);
  }
}
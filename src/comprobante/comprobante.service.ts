import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { UpdateComprobanteDto } from './dto/update-comprobante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comprobante } from './entities/comprobante.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { TareasService } from 'src/tareas/tareas.service';
import { EstadoTarea } from 'src/common/enums/estado-tarea.enum';

@Injectable()
export class ComprobanteService {
  constructor(
    @InjectRepository(Comprobante)
    private readonly comprobanteRepository: Repository<Comprobante>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly tareasService: TareasService,
  ) {}
  async create(createComprobanteDto: CreateComprobanteDto, file : Express.Multer.File) {
    try{
      const uploadResult = await this.cloudinaryService.upload(file);
      // const tarea = await this.tareasService.findOne(createComprobanteDto.id_tarea);
      // if(!tarea){
      //   throw new NotFoundException('Tarea no encontrada');
      // }
      // tarea.estado = EstadoTarea.APROBADA;
      // await this.tareasService.update(createComprobanteDto.id_tarea, tarea);
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
    return `This action returns a #${id} comprobante`;
  }

  update(id: number, updateComprobanteDto: UpdateComprobanteDto) {
    return `This action updates a #${id} comprobante`;
  }

  remove(id: number) {
    return `This action removes a #${id} comprobante`;
  }
}

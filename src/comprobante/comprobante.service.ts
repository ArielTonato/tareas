import { Injectable } from '@nestjs/common';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { UpdateComprobanteDto } from './dto/update-comprobante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comprobante } from './entities/comprobante.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class ComprobanteService {
  constructor(
    @InjectRepository(Comprobante)
    private readonly comprobanteRepository: Repository<Comprobante>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(createComprobanteDto: CreateComprobanteDto, file : Express.Multer.File) {
    try{
      const uploadResult = await this.cloudinaryService.upload(file);
      return this.comprobanteRepository.save({
        ...createComprobanteDto,
        adjunto_url: uploadResult.secure_url
      });
    }catch(err){
      throw new Error('Error al crear comprobante');
    }
  }

  findAll() {
    return `This action returns all comprobante`;
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

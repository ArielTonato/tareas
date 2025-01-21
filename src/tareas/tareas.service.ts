import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { EstadoTarea } from 'src/common/enums/estado-tarea.enum';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createTareaDto: CreateTareaDto, file: Express.Multer.File) {
    try {
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
    return `This action returns all tareas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tarea`;
  }

  update(id: number, updateTareaDto: UpdateTareaDto) {
    return `This action updates a #${id} tarea`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarea`;
  }
}

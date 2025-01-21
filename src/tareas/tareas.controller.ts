import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, UploadedFile } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  @UseInterceptors(FileInterceptor('adjunto'))  // Changed to single file
  create(
    @Body() createTareaDto: CreateTareaDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 8 }),
          new FileTypeValidator({ fileType: 'application/pdf' })
        ],
        exceptionFactory: (errors) => {
          if (errors === "File is required") {
            throw new BadRequestException('Se requiere un archivo PDF');
          }
          throw new BadRequestException('El archivo debe ser un PDF');
        }
      })
    ) file: Express.Multer.File,
  ) {
    return this.tareasService.create(createTareaDto, file);
  }
  @Get()
  findAll() {
    return this.tareasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tareasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareasService.update(+id, updateTareaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tareasService.remove(+id);
  }
}

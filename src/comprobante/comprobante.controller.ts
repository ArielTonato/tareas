import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException } from '@nestjs/common';
import { ComprobanteService } from './comprobante.service';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { UpdateComprobanteDto } from './dto/update-comprobante.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('comprobante')
export class ComprobanteController {
  constructor(private readonly comprobanteService: ComprobanteService) {}

  @Post()
  @UseInterceptors(FileInterceptor('comprobante'))
  create(@Body() createComprobanteDto: CreateComprobanteDto,
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 8 }),
            new FileTypeValidator({ fileType: 'application/pdf' })
          ],
          exceptionFactory: (errors) => {
            if (errors === "File is required") {
              throw new BadRequestException('Se requiere el comprobante en PDF');
            }
            throw new BadRequestException('El archivo debe ser un PDF');
          }
        })
      ) file: Express.Multer.File,
  ) {
    return this.comprobanteService.create(createComprobanteDto, file);
  }

  @Get()
  findAll() {
    return this.comprobanteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comprobanteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComprobanteDto: UpdateComprobanteDto) {
    return this.comprobanteService.update(+id, updateComprobanteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comprobanteService.remove(+id);
  }
}

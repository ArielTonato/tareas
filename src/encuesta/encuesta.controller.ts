import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';

@Controller('encuesta')
export class EncuestaController {
  constructor(private readonly encuestaService: EncuestaService) {}

  @Post()
  create(@Body() createEncuestaDto: CreateEncuestaDto) {
    return this.encuestaService.create(createEncuestaDto);
  }

  @Get()
  findAll() {
    return this.encuestaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encuestaService.findOne(+id);
  }

  @Get('tarea/:id')
  findOneByTarea(@Param('id') id: string) {
    return this.encuestaService.findOneByTarea(+id);
  }

}

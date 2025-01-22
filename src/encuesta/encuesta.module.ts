import { Module } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { EncuestaController } from './encuesta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Encuesta]),
    TareasModule
  ],
  controllers: [EncuestaController],
  providers: [EncuestaService],
})
export class EncuestaModule {}

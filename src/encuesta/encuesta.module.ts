import { Module } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { EncuestaController } from './encuesta.controller';

@Module({
  controllers: [EncuestaController],
  providers: [EncuestaService],
})
export class EncuestaModule {}

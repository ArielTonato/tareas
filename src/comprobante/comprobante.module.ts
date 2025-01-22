import { Module, forwardRef } from '@nestjs/common';
import { ComprobanteService } from './comprobante.service';
import { ComprobanteController } from './comprobante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comprobante } from './entities/comprobante.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TareasModule } from 'src/tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comprobante]),
    CloudinaryModule,
    forwardRef(() => TareasModule)
  ],
  controllers: [ComprobanteController],
  providers: [ComprobanteService],
  exports: [ComprobanteService]
})
export class ComprobanteModule {}

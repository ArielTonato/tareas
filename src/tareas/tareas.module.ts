import { Module, forwardRef } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ComprobanteModule } from '../comprobante/comprobante.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarea]),
    CloudinaryModule,
    forwardRef(() => ComprobanteModule)
  ],
  controllers: [TareasController],
  providers: [TareasService],
  exports: [TareasService]
})
export class TareasModule {}
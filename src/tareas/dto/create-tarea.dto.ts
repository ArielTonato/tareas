import { IsString, IsEnum, IsOptional, IsNumber, IsUrl, IsDateString } from 'class-validator';
import { EstadoTarea } from 'src/common/enums/estado-tarea.enum';

export class CreateTareaDto {
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsEnum(EstadoTarea)
    estado: EstadoTarea;

    @IsUrl()
    adjunto_url: string;

    @IsOptional()
    @IsUrl()
    tarea_realizada_url?: string;

    @IsOptional()
    @IsNumber()
    costo?: number;

    @IsDateString()
    fecha_a_realizar: Date;

    @IsOptional()
    @IsDateString()
    fecha_realizada?: Date;
}
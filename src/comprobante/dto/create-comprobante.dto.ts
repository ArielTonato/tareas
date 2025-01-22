import { Type } from 'class-transformer';
import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { EstadoComprobante } from 'src/common/enums/estado-comprobante.enum';

export class CreateComprobanteDto {
    @IsNumber()
    @Type(() => Number)
    id_tarea: number;

    @IsString()
    @IsOptional()
    url_comprobante?: string;

    @IsEnum(EstadoComprobante)
    @IsOptional()
    estado_comprobante?: EstadoComprobante;

    @IsString()
    @IsOptional()
    comentario?: string;

    @IsOptional()
    fecha_revision?: Date;
}
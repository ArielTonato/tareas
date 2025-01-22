import { IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Atencion } from "../enums/atencion.enum";
import { Costo } from "../enums/costo.enum";
import { Calidad } from "../enums/calidad.enum";

export class CreateEncuestaDto {
    @IsNumber()
    id_tarea: number;

    @IsEnum(Atencion)
    atencion: Atencion;

    @IsEnum(Costo)
    costo: Costo;

    @IsEnum(Calidad)
    calidad: Calidad;

    @IsNumber()
    @Min(0)
    @Max(10)
    nota: number;
}
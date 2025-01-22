import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateComentarioDto {
    @IsNotEmpty()
    @IsNumber()
    id_tarea: number;

    @IsNotEmpty()
    @IsNumber()
    id_usuario: number;

    @IsNotEmpty()
    @IsString()
    comentario: string;
}
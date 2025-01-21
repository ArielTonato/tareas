import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { EstadoTarea } from 'src/common/enums/estado-tarea.enum';
import { IsNumber, IsOptional } from 'class-validator';

@Entity()
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    estado: EstadoTarea;

    @Column()
    adjunto_url: string;

    @IsOptional()
    @Column()
    tarea_realizada_url?: string;

    @IsOptional()
    @Column()
    @IsNumber()
    costo?: number;

    @Column({type:"timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})    fecha_envio: Date;

    @Column(
        {
            type: "date",
        }
    )
    fecha_a_realizar: Date;

    @Column(
        {
            type: "date",
        }
    )
    fecha_realizada: Date;  
}
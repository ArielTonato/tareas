import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Atencion } from "../enums/atencion.enum";
import { Costo } from "../enums/costo.enum";
import { Calidad } from "../enums/calidad.enum";

@Entity()
export class Encuesta {
    @PrimaryGeneratedColumn()
    encuesta_id: number;

    @Column()
    id_tarea: number;

    @Column(
        {type: 'enum', enum: Atencion}
    )
    atencion: Atencion;

    @Column(
        {
            type: 'enum',
            enum: Costo
        }
    )
    costo: Costo;

    @Column(
        {
            type: 'enum',
            enum: Calidad
        }
    )
    calidad: Calidad;

    @Column()
    nota: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    fecha_encuesta: Date;
}

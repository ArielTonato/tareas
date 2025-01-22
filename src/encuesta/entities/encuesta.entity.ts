import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Atencion } from "../enums/atencion.enum";
import { Costo } from "../enums/costo.enum";
import { Calidad } from "../enums/calidad.enum";
import { Tarea } from "src/tareas/entities/tarea.entity";

@Entity()
export class Encuesta {
    @PrimaryGeneratedColumn()
    encuesta_id: number;

    @ManyToOne(() => Tarea, tarea => tarea.encuestas)
    @JoinColumn({ name: 'id_tarea' })
    tarea: Tarea;

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

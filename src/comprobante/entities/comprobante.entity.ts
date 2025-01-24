import { EstadoComprobante } from "src/common/enums/estado-comprobante.enum";
import { Tarea } from "src/tareas/entities/tarea.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comprobante {
    @PrimaryGeneratedColumn()
    id_comprobante: number;

    @ManyToOne(() => Tarea, tarea => tarea.comprobantes)
    @JoinColumn({ name: 'id_tarea' })
    tarea: Tarea;

    @Column()
    id_tarea: number;

    @Column({
        nullable: true
    })
    url_comprobante: string;

    @Column({
        type: "enum",
        enum: EstadoComprobante,
        default: EstadoComprobante.PENDIENTE
    })
    estado_comprobante: EstadoComprobante;

    @Column({
        nullable: true
    })
    comentario: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    fecha_creacion: Date;

    @Column({
        type:"date",
        nullable: true
    })
    fecha_revision: Date;
}

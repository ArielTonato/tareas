import { EstadoComprobante } from "src/common/enums/estado-comprobante.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comprobante {
    @PrimaryGeneratedColumn()
    id_comprobante: number;

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

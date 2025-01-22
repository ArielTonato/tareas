import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comentario {
    @PrimaryGeneratedColumn()
    id_comentario: number;

    @Column()
    id_tarea: number;

    @Column()
    id_usuario: number;

    @Column()
    comentario: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }) 
    fecha_comentario: Date;
}

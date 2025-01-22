import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Tarea } from "src/tareas/entities/tarea.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity()
export class Comentario {
    @PrimaryGeneratedColumn()
    id_comentario: number;

    @ManyToOne(() => Tarea, tarea => tarea.comentarios)
    @JoinColumn({ name: 'id_tarea' })
    tarea: Tarea;

    @ManyToOne(() => Usuario, usuario => usuario.comentarios)
    @JoinColumn({ name: 'id_usuario' })

    @Column()
    id_tarea: number;

    @Column()
    id_usuario: number;

    @Column()
    comentario: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }) 
    fecha_comentario: Date;
}
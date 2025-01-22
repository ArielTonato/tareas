import { Comentario } from "src/comentarios/entities/comentario.entity";
import { Instituciones } from "src/common/enums/instituciones.enum";
import { Rol } from "src/common/enums/roles.enum";
import { Tarea } from "src/tareas/entities/tarea.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    usuario_id: number;

    @Column({
        unique:true
    })
    nombre_usuario: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    numero: string;

    @Column()
    carrera: string;

    @Column(
        {
            unique:true
        }
    )
    correo: string;

    @Column({
        type: 'enum',
        default: Instituciones.UNIVERSIDAD,
        enum: Instituciones
    })
    institucion: string;

    @Column({
        select: false
    })
    password: string;

    @Column({
        type: 'enum',
        default: Rol.CLIENTE,
        enum: Rol
    })
    rol: Rol;

    @OneToMany(() => Tarea, tarea => tarea.usuario)
    tareas: Tarea[];

    @OneToMany(() => Comentario, comentario => comentario.id_usuario)
    comentarios: Comentario[];
}

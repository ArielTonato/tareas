import { Instituciones } from "src/common/instituciones.enum";
import { Rol } from "src/common/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    password: string;

    @Column({
        type: 'enum',
        default: Rol.CLIENTE,
        enum: Rol
    })
    rol: Rol;
}

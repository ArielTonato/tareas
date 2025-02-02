import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoTarea } from 'src/common/enums/estado-tarea.enum';
import { IsNumber, IsOptional } from 'class-validator';
import { TipoTarea } from 'src/common/enums/tipos-tarea.enum';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Comentario } from 'src/comentarios/entities/comentario.entity';
import { Encuesta } from 'src/encuesta/entities/encuesta.entity';
import { Comprobante } from 'src/comprobante/entities/comprobante.entity';

@Entity()
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, usuario => usuario.tareas)
    @JoinColumn({ name: 'usuario_cliente_id' })
    usuario: Usuario;

    @Column()
    usuario_cliente_id: number;

    @Column()
    nombre: string;

    @Column({
        type: 'enum',
        enum: TipoTarea,
        default: TipoTarea.TAREA
    })
    tipo_tarea: TipoTarea;

    @Column()
    indicaciones: string;

    @Column()
    rubrica: string;

    @Column({
        type: 'enum',
        enum: EstadoTarea,
        default: EstadoTarea.EN_REVISION
    })
    estado: EstadoTarea;

    @Column()
    adjunto_url: string;

    @Column({ nullable: true })
    tarea_realizada_url: string;

    @Column({ nullable: true })
    costo: number;

    @Column({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP", 
        onUpdate: "CURRENT_TIMESTAMP",
        transformer: {
            to(value: Date): Date {
                return value;
            },
            from(value: Date): Date {
                return new Date(value.setHours(value.getHours() - 5)); // Adjusting for -5 timezone
            }
        }
    })
    fecha_envio: Date;

    @Column(
        {
            type: "date",
            nullable: true
        }
    )
    fecha_a_realizar: Date;

    @Column(
        {
            type: "date",
            nullable: true
        }
    )
    fecha_realizada: Date;
    
    @OneToMany(() => Comentario, comentario => comentario.tarea)
    comentarios: Comentario[];

    @OneToMany(() => Encuesta, encuesta => encuesta.tarea)
    encuestas: Encuesta[];

    @OneToMany(() => Comprobante, comprobante => comprobante.tarea)
    comprobantes: Comprobante[];
}
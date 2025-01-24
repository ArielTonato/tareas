import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { TareasModule } from './tareas/tareas.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { ComprobanteModule } from './comprobante/comprobante.module';
import { EncuestaModule } from './encuesta/encuesta.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        // host: process.env.dbHost,
        // port: +process.env.dbPort, //Poner el puerto de su base de datos
        // username: process.env.dbUser,
        // password: process.env.dbPassword,
        // database: process.env.dbDatabase,//Nombrar su base de esta manera
        url:process.env.url,
        autoLoadEntities: true,
        synchronize: true,
      }
    ),
    UsuarioModule,
    AuthModule,
    TareasModule, 
    CloudinaryModule, ComentariosModule, ComprobanteModule, EncuestaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

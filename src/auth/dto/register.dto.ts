import { IsEmail, IsEnum, IsPhoneNumber, Matches, MinLength } from "class-validator";
import { Instituciones } from "src/common/enums/instituciones.enum";

export class RegisterDto {
    @MinLength(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" })
    nombre_usuario: string;

    @Matches(/^[a-zA-Z\s]+$/, { message: 'El  nombre no puede contener números' })
    @MinLength(3, { message: "El  nombre debe tener al menos 3 caracteres" })
    nombre: string;

    @Matches(/^[a-zA-Z\s]+$/, { message: 'El  apellido no puede contener números' })
    @MinLength(3, { message: "El  apellido debe tener al menos 3 caracteres" })
    apellido: string;

    @Matches(/^[0-9]+$/, { message: 'El número debe contener solo números' })
    @IsPhoneNumber("EC", { message: "El número de teléfono debe ser válido para Ecuador" })
    numero: string;

    @Matches(/^[a-zA-Z\s]+$/, { message: 'La carrera no puede contener números' })
    @MinLength(3, { message: "La carrera debe tener al menos 3 caracteres" })
    carrera: string;
    @IsEmail({}, { message: "El correo no es valido" })
    correo: string;

    @IsEnum(Instituciones)
    institucion: Instituciones;

    @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    password: string;
}

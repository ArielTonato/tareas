import { applyDecorators, UseGuards } from "@nestjs/common";
import { SetMetadata } from "@nestjs/common";
import { Rol } from "src/common/enums/roles.enum";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export const ROLES_KEY = 'roles';
export const RolesDecorator = (rol:Rol) => SetMetadata(ROLES_KEY, rol);

export function Auth(rol:Rol){
    return applyDecorators(
        RolesDecorator(rol),
        UseGuards(AuthGuard, RolesGuard)
    );
}
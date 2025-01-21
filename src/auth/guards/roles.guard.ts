import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/auth.decorator";
import { Rol } from "src/common/enums/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private readonly reflector: Reflector
    ){}
    canActivate(context: ExecutionContext): boolean  {
        const rol = this.reflector.getAllAndOverride<Rol>(ROLES_KEY,[
            context.getHandler(),
            context.getClass()
        ]);

        if(!rol){
            return true;
        }
        const {usuario:user} = context.switchToHttp().getRequest();
        if(user.rol === Rol.ADMIN){
            return true;
        }
        if(user.rol !== rol){
            throw new ForbiddenException("No tienes permisos para realizar esta acción");
        }
        return true;
    }
}
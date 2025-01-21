import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ){}

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Tu token no es valido");
    }
    try{
      const payload = await this.jwtService.verifyAsync(token,{
        secret:process.env.jwtSecret
      });
      request['usuario'] = payload;
    }catch(e){
      throw new UnauthorizedException("No tienes permisos para acceder a este recurso");
    }
    return true;
  }


  _extractTokenFromHeader(request: Request): string | undefined {
    //@ts-ignore
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}

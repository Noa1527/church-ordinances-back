import { Injectable, CanActivate, ExecutionContext, ConflictException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    if (!request.user.isAdmin) {
        throw new ConflictException('vous nest pas adminitrateur')
    }
    
    return request.user.isAdmin;  // Assurez-vous que l'utilisateur possède une propriété 'isAdmin'
  }
}

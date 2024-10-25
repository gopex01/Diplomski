import { ExecutionContext, Injectable } from "@nestjs/common";
import { RolesGuard } from "./role.guard";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard extends RolesGuard{
    override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.getUserRole(context)==='user';
    }
}
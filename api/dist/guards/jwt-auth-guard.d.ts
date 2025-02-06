import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
export declare class JwtAuthGuard implements CanActivate {
    private readonly authServiceClient;
    constructor(authServiceClient: ClientProxy);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException("No authentication token provided");
        }

        try {
            const { user } = await this.authService.validateSession(token);

            // Attach user to request
            (request as any).user = {
                id: (user._id as any).toString(),
                email: user.email,
                name: user.name,
                image: user.image,
            };

            return true;
        } catch {
            throw new UnauthorizedException("Invalid or expired token");
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return undefined;
        }

        const [type, token] = authHeader.split(" ");
        return type === "Bearer" ? token : undefined;
    }
}

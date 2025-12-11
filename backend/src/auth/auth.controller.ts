import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get("me")
  @UseGuards(AuthGuard)
  async getMe(@Req() req: AuthenticatedRequest) {
    return { user: req.user };
  }

  @Post("logout")
  @UseGuards(AuthGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace("Bearer ", "");

    if (token) {
      await this.authService.logout(token);
    }

    return res.status(HttpStatus.OK).json({ message: "Logged out successfully" });
  }

  @Post("logout-all")
  @UseGuards(AuthGuard)
  async logoutAll(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    if (req.user?.id) {
      await this.authService.logoutAllSessions(req.user.id);
    }

    return res.status(HttpStatus.OK).json({ message: "All sessions ended" });
  }
}

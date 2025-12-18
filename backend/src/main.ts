import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth";
import type { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  // Manually mount Better Auth handler with Express 5-compatible wildcard pattern
  // The @thallesp/nestjs-better-auth library uses /*path which doesn't work with Express 5
  const expressApp = app.getHttpAdapter().getInstance();
  const authHandler = toNodeHandler(auth);
  expressApp.all("/api/auth/*splat", (req: any, res: any) => {
    return authHandler(req, res);
  });
  console.log("Manually mounted BetterAuth on '/api/auth/*splat' for Express 5 compatibility");

  const port = process.env.PORT ?? 8080;
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}
bootstrap();


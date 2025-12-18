import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LlmModule } from "./llm/llm.module";
import { OrchestratorModule } from "./orchestrator/orchestrator.module";
import { GenerateModule } from "./generate/generate.module";
import { JobsModule } from "./jobs/jobs.module";
import { StorageModule } from "./storage/storage.module";
import { RendererModule } from "./renderer/renderer.module";
import { VectorModule } from "./vector/vector.module";
import { UserModule } from "./user/user.module";
import { LocalAuthModule } from "./auth/auth.module";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "./auth/auth";

@Module({
  imports: [
    // MongoDB connection
    MongooseModule.forRoot(
      process.env.MONGODB_URI!
    ),
    // Feature modules
    LlmModule,
    OrchestratorModule,
    GenerateModule,
    JobsModule,
    StorageModule,
    RendererModule,
    VectorModule,
    UserModule,
    LocalAuthModule,
    // Better-auth for OAuth (with disableControllers due to Express 5 compatibility issue)
    AuthModule.forRoot({
      auth,
      disableControllers: true, // Routes are manually mounted in main.ts with /*splat pattern
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
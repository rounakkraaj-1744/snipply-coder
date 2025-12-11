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
      process.env.MONGODB_URI || "mongodb://localhost:27017/atlaso"
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
    // Better-auth for OAuth
    AuthModule.forRoot({
      auth,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
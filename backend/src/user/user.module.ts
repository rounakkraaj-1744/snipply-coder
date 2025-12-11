import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import {
  User,
  UserSchema,
  Account,
  AccountSchema,
  Session,
  SessionSchema,
  Verification,
  VerificationSchema,
} from "./user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Session.name, schema: SessionSchema },
      { name: Verification.name, schema: VerificationSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule { }

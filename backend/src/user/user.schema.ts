import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    name: string;

    @Prop()
    image: string;

    @Prop({ default: false })
    emailVerified: boolean;

    @Prop({ type: Date })
    emailVerifiedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Account schema for OAuth providers
@Schema({ timestamps: true })
export class Account {
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    providerId: string;

    @Prop({ required: true })
    providerAccountId: string;

    @Prop()
    accessToken: string;

    @Prop()
    refreshToken: string;

    @Prop({ type: Date })
    accessTokenExpiresAt: Date;

    @Prop({ type: Date })
    refreshTokenExpiresAt: Date;

    @Prop()
    scope: string;

    @Prop()
    idToken: string;
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);

// Session schema
@Schema({ timestamps: true })
export class Session {
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    userId: Types.ObjectId;

    @Prop({ required: true, unique: true })
    token: string;

    @Prop({ type: Date, required: true })
    expiresAt: Date;

    @Prop()
    ipAddress: string;

    @Prop()
    userAgent: string;
}

export type SessionDocument = Session & Document;
export const SessionSchema = SchemaFactory.createForClass(Session);

// Verification schema (for email verification, password reset, etc.)
@Schema({ timestamps: true })
export class Verification {
    @Prop({ required: true, unique: true })
    identifier: string;

    @Prop({ required: true })
    value: string;

    @Prop({ type: Date, required: true })
    expiresAt: Date;
}

export type VerificationDocument = Verification & Document;
export const VerificationSchema = SchemaFactory.createForClass(Verification);

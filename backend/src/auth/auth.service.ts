import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";
import { Types } from "mongoose";
import { randomBytes } from "crypto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly userRepository: UserRepository
    ) { }

    async validateOAuthLogin(profile: {
        providerId: string;
        providerAccountId: string;
        email: string;
        name?: string;
        image?: string;
        accessToken?: string;
        refreshToken?: string;
    }) {
        // Check if account already exists
        let account = await this.userRepository.findAccountByProvider(
            profile.providerId,
            profile.providerAccountId
        );

        let user;

        if (account) {
            // Account exists, get the user
            user = await this.userService.findById(account.userId.toString());
        } else {
            // Find or create user by email
            user = await this.userService.findOrCreateByOAuth({
                email: profile.email,
                name: profile.name,
                image: profile.image,
                emailVerified: true, // OAuth emails are verified
            });

            // Create account link
            account = await this.userRepository.createAccount({
                userId: new Types.ObjectId(user._id as string),
                providerId: profile.providerId,
                providerAccountId: profile.providerAccountId,
                accessToken: profile.accessToken,
                refreshToken: profile.refreshToken,
            });
        }

        // Create session
        const session = await this.createSession(
            user._id as string,
            undefined,
            undefined
        );

        return {
            user,
            session,
        };
    }

    async createSession(userId: string, ipAddress?: string, userAgent?: string) {
        const token = this.generateSessionToken();
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

        const session = await this.userRepository.createSession({
            userId: new Types.ObjectId(userId),
            token,
            expiresAt,
            ipAddress,
            userAgent,
        });

        return {
            token: session.token,
            expiresAt: session.expiresAt,
        };
    }

    async validateSession(token: string) {
        const session = await this.userRepository.findSessionByToken(token);

        if (!session) {
            throw new UnauthorizedException("Invalid session");
        }

        if (session.expiresAt < new Date()) {
            await this.userRepository.deleteSession(token);
            throw new UnauthorizedException("Session expired");
        }

        const user = await this.userService.findById(session.userId.toString());

        return { user, session };
    }

    async logout(token: string) {
        await this.userRepository.deleteSession(token);
    }

    async logoutAllSessions(userId: string) {
        await this.userRepository.deleteSessionsByUserId(userId);
    }

    private generateSessionToken(): string {
        return randomBytes(32).toString("hex");
    }
}

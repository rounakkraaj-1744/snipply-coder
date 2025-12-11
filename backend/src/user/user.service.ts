import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(data: Partial<User>): Promise<UserDocument> {
        return this.userRepository.createUser(data);
    }

    async findById(id: string): Promise<UserDocument> {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userRepository.findUserByEmail(email);
    }

    async updateUser(id: string, data: Partial<User>): Promise<UserDocument> {
        const user = await this.userRepository.updateUser(id, data);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.deleteUser(id);
    }

    async findOrCreateByOAuth(profile: {
        email: string;
        name?: string;
        image?: string;
        emailVerified?: boolean;
    }): Promise<UserDocument> {
        let user = await this.userRepository.findUserByEmail(profile.email);

        if (!user) {
            user = await this.userRepository.createUser({
                email: profile.email,
                name: profile.name,
                image: profile.image,
                emailVerified: profile.emailVerified ?? false,
                emailVerifiedAt: profile.emailVerified ? new Date() : undefined,
            });
        }

        return user;
    }
}

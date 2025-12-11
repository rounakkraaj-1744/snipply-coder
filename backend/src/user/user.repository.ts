import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
    User,
    UserDocument,
    Account,
    AccountDocument,
    Session,
    SessionDocument,
    Verification,
    VerificationDocument,
} from "./user.schema";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
        @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
        @InjectModel(Verification.name)
        private verificationModel: Model<VerificationDocument>
    ) { }

    // User methods
    async createUser(data: Partial<User>): Promise<UserDocument> {
        const user = new this.userModel(data);
        return user.save();
    }

    async findUserById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async findUserByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async updateUser(
        id: string,
        data: Partial<User>
    ): Promise<UserDocument | null> {
        return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id).exec();
    }

    // Account methods
    async createAccount(data: Partial<Account>): Promise<AccountDocument> {
        const account = new this.accountModel(data);
        return account.save();
    }

    async findAccountByProvider(
        providerId: string,
        providerAccountId: string
    ): Promise<AccountDocument | null> {
        return this.accountModel.findOne({ providerId, providerAccountId }).exec();
    }

    async findAccountsByUserId(userId: string): Promise<AccountDocument[]> {
        return this.accountModel
            .find({ userId: new Types.ObjectId(userId) })
            .exec();
    }

    async deleteAccount(
        providerId: string,
        providerAccountId: string
    ): Promise<void> {
        await this.accountModel.deleteOne({ providerId, providerAccountId }).exec();
    }

    // Session methods
    async createSession(data: Partial<Session>): Promise<SessionDocument> {
        const session = new this.sessionModel(data);
        return session.save();
    }

    async findSessionByToken(token: string): Promise<SessionDocument | null> {
        return this.sessionModel.findOne({ token }).exec();
    }

    async findSessionsByUserId(userId: string): Promise<SessionDocument[]> {
        return this.sessionModel
            .find({ userId: new Types.ObjectId(userId) })
            .exec();
    }

    async updateSession(
        token: string,
        data: Partial<Session>
    ): Promise<SessionDocument | null> {
        return this.sessionModel
            .findOneAndUpdate({ token }, data, { new: true })
            .exec();
    }

    async deleteSession(token: string): Promise<void> {
        await this.sessionModel.deleteOne({ token }).exec();
    }

    async deleteSessionsByUserId(userId: string): Promise<void> {
        await this.sessionModel
            .deleteMany({ userId: new Types.ObjectId(userId) })
            .exec();
    }

    // Verification methods
    async createVerification(
        data: Partial<Verification>
    ): Promise<VerificationDocument> {
        const verification = new this.verificationModel(data);
        return verification.save();
    }

    async findVerification(
        identifier: string
    ): Promise<VerificationDocument | null> {
        return this.verificationModel.findOne({ identifier }).exec();
    }

    async deleteVerification(identifier: string): Promise<void> {
        await this.verificationModel.deleteOne({ identifier }).exec();
    }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserSchema } from "./users.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: { email: string; password: string }) {
    const newUser = await this.userModel.create(user);
    await newUser.save();

    return newUser;
  }
}

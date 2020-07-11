import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  async create(@Body() user: { email: string; password: string }) {
    return await this.usersService.createUser(user);
  }
}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import path from "path";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: path.join(__dirname, '../../.env') }),
    MongooseModule.forRoot(
      `mongodb+srv://${'admin'}:${'11197811'}@cluster0-obnfg.mongodb.net/${'test'}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true
      }
    ),
    UsersModule
  ],
  controllers: [AppController]
})
export class AppModule {}

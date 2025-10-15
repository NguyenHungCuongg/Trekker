import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: "postgres",
    host: configService.get<string>("dbHost"),
    port: configService.get<number>("dbPort"),
    username: configService.get<string>("username"),
    password: configService.get<string>("password"),
    database: configService.get<string>("dbName"),
    entities: ["dist/**/*.entity.js"],
    synchronize: true,
  }),
};

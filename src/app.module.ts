import { ConfigModule } from "@nestjs/config";
import { join } from "path";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PokemonModule } from "./pokemon/pokemon.module";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    MongooseModule.forRoot(process.env.DB_HOST),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  constructor() {
    console.log(process.env);
  }
}

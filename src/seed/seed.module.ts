import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { SeedController } from "./seed.controller";
import { PokemonService } from "../pokemon/pokemon.service";
import { PokemonModule } from "../pokemon/pokemon.module";
import { CommonModule } from "../common/common.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [PokemonModule, CommonModule, ConfigModule],
  controllers: [SeedController],
  providers: [SeedService, PokemonService],
})
export class SeedModule {}

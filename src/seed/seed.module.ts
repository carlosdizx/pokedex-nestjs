import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonService } from "../pokemon/pokemon.service";
import { PokemonModule } from "../pokemon/pokemon.module";

@Module({
  imports: [
    PokemonModule
  ],
  controllers: [SeedController],
  providers: [SeedService, PokemonService]
})
export class SeedModule {}

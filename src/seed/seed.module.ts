import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonService } from "../pokemon/pokemon.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Pokemon, PokemonSchema } from "../pokemon/entities/pokemon.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService, PokemonService]
})
export class SeedModule {}

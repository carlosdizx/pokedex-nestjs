import { Injectable } from "@nestjs/common";
import { PokeResponse } from "./interfaces/poke-response.interface";
import { PokemonService } from "../pokemon/pokemon.service";
import AxiosAdapter from "../common/adapters/axios.adapter";

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter
  ) {}
  public executeSeed = async () => {
    const data = await this.http.get<PokeResponse>(
      "https://pokeapi.co/api/v2/pokemon?limit=650"
    );
    const { results } = data;
    const listPokemons: any[] = [];
    for (const { name, url } of results) {
      const segments = url.split("/");
      const no = +segments[segments.length - 2];
      listPokemons.push({ name, no });
    }
    return await this.pokemonService.createBulk(listPokemons);
  };
}

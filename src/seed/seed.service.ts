import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { PokeResponse } from "./interfaces/poke-response.interface";
import { PokemonService } from "../pokemon/pokemon.service";

@Injectable()
export class SeedService {
  constructor(private readonly pokemonService: PokemonService) {}

  private readonly axios: AxiosInstance = axios;
  public executeSeed = async () => {
    const { data } = await this.axios.get<PokeResponse>(
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

import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { PokeResponse } from "./interfaces/poke-response.interface";

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  public executeSeed = async () => {
    const { data } = await this.axios.get<PokeResponse>(
      "https://pokeapi.co/api/v2/pokemon?limit=10"
    );
    const { results } = data;
    for (const { name, url } of results) {
      const segments = url.split("/");
      const no = +segments[segments.length - 2];
      console.log(name, no);
    }
  };
}

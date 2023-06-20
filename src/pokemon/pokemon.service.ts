import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { isValidObjectId, Model } from "mongoose";
import { Pokemon } from "./entities/pokemon.entity";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly model: Model<Pokemon>
  ) {}
  public create = async (createPokemonDto: CreatePokemonDto) => {
    try {
      createPokemonDto.name = createPokemonDto.name.toUpperCase();

      const pokemon = await this.model.create(createPokemonDto);
      pokemon.__v = undefined;
      return pokemon;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `Pokemon already exists ${JSON.stringify(error.keyValue)}`
        );
      console.log(error);
      throw new InternalServerErrorException(
        `Can't create Pokemon - Check server logs`
      );
    }
  };

  public findAll = async () => {
    const pokemons = await this.model.find();
    return pokemons.map(({ name, no }) => ({ name, no }));
  };

  public findOne = async (term: string) => {
    let pokemon: Pokemon;
    if (!isNaN(+term)) pokemon = await this.model.findOne({ no: term });
    else if (isValidObjectId(term)) pokemon = await this.model.findById(term);
    else
      pokemon = await this.model.findOne({ name: term.toUpperCase().trim() });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name, or no "${term}" not found`
      );

    return pokemon;
  };

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}

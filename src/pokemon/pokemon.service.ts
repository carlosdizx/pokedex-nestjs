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
import PaginationDto from "../common/dto/pagination.dto";

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly model: Model<Pokemon>
  ) {
  console.log(process.env.DB_HOST);
  console.log(process.env.PORT);
  console.log(process.env.DEFAULT_LIMIT);
  }
  public create = async (createPokemonDto: CreatePokemonDto) => {
    try {
      createPokemonDto.name = createPokemonDto.name.toUpperCase();

      const pokemon = await this.model.create(createPokemonDto);
      pokemon.__v = undefined;
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  };

  public findAll = async (pagination: PaginationDto) => {
    const { limit = 10, offset = 0 } = pagination;
    return this.model
      .find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1,
      })
      .select(["-__v"]);
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

  update = async (term: string, updatePokemonDto: UpdatePokemonDto) => {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  };

  public remove = async (id: string) => {
    const { deletedCount } = await this.model.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new NotFoundException(`Pokemon with id "${id}" not found`);
    return;
  };

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`
    );
  }

  public createBulk = async (list: Pokemon[]) => {
    try {
      await this.model.insertMany(list);
      return { message: "Success, seed database" };
    } catch (error) {
      this.handleExceptions(error);
    }
  };
}

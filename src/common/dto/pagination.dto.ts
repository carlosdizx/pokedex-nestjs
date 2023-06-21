import { IsOptional, IsPositive, Min } from "class-validator";

export default class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}

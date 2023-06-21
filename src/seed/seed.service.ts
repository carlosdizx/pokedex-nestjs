import { Injectable } from "@nestjs/common";

@Injectable()
export class SeedService {
  public executeSeed = async () => {
    return { message: "Seed execute" };
  };
}

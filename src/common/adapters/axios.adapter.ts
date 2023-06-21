import { HttpAdapterInterface } from "../interfaces/http-adapter.interface";
import axios, { AxiosInstance } from "axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class AxiosAdapter implements HttpAdapterInterface {
  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await axios.get<T>(url);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("This is an error - Check logs");
    }
  }
}

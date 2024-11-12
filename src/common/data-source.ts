import { DataSource } from "typeorm";
import { Meta } from "../entity/Meta";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Meta],
  migrations: [],
  subscribers: [],
});

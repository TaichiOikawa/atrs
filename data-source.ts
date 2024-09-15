import "reflect-metadata";
import { DataSource } from "typeorm";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.RDB_HOST,
  port: Number(process.env.RDB_PORT),
  username: process.env.RDB_USER,
  password: process.env.RDB_PASSWORD,
  database: process.env.RDB_NAME,
  synchronize: true,
  logging: false,
  entities: ["./src/entity/*.ts"],
  migrations: ["./src/migration/*.ts"],
  subscribers: [],
});

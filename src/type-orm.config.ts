import { DataSource } from "typeorm";
import dotenv from "dotenv"
import pg from "pg"
import { UserAccount } from "./entities/UserAccount";



dotenv.config()



export default new DataSource({
  type: "postgres",
  url: process.env.CONNECTION_STRING,
  entities: [UserAccount],
  synchronize: true,
});
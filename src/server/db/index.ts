import { Sequelize } from "sequelize";
import { env } from "../env";

export const db = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  dialect: "mysql",
});

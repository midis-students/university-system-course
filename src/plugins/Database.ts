import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import MySQL from "mysql2/promise";
import entities from "../entities";
import { Colors } from "../lib/Colors";
import { SQLQuery } from "../types/global";

declare module "fastify" {
  interface FastifyInstance {
    query: <T extends Object = {}>(sql: string) => Promise<T[]>;
  }
}

const DatabasePlugin: FastifyPluginAsync = async (fastify) => {
  const logger = fastify.log.child({ name: "MySQL" });

  logger.info(
    `Try connect to ${Colors.FgYellow}'${process.env.MYSQL_DATABASE}'${Colors.Reset}`
  );

  const pool = await MySQL.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  const query = async <T extends Object = {}>(sql): Promise<T[]> => {
    const [rows] = await pool.query(sql);
    return rows as T[];
  };

  await query("SELECT 1");

  logger.info("Connected");
  logger.info("Start entities init");

  const promises = entities.map(async (Entity) => {
    await Entity.Init(query);
    logger.info(`${Colors.FgGreen}${Entity.name}${Colors.FgCyan} loaded`);
  });

  await Promise.all(promises);

  fastify.decorate("query", query);

  logger.info("MySQL ready for work");
};

export default fp(DatabasePlugin);

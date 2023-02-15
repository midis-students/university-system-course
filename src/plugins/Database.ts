import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import MySQL from "mysql2/promise";
import entities from "../entities";
import { Colors } from "../lib/Colors";
import { SQLQuery } from "../types/global";

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

  const query: SQLQuery<unknown> = async (sql) => {
    try {
      const [rows] = await pool.query(sql);

      const result = {};

      if (rows instanceof Array) {
        for (const row of rows) {
          Object.assign(result, row);
        }
      }

      return result;
    } catch (e) {
      logger.info(sql);
      logger.error(e);
    }
    return null;
  };

  await query("SELECT 1");

  logger.info("Connected");
  logger.info("Start entities init");

  const promises = entities.map(async (Entity) => {
    await Entity.Init(query);
    logger.info(`${Colors.FgGreen}${Entity.name}${Colors.FgCyan} loaded`);
  });

  await Promise.all(promises);

  logger.info("MySQL ready for work");
};

export default fp(DatabasePlugin);

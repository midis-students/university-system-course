import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import MySQL from "mysql2/promise";
import { Colors } from "../lib/Colors";
import fs from "fs/promises";
import path from "path";

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
    multipleStatements: true,
  });

  const query = async <T extends Object = {}>(sql): Promise<T[]> => {
    const [rows] = await pool.query(sql);
    return rows as T[];
  };

  await query("SELECT 1");

  logger.info("Connected");

  const sqlPath = path.resolve("sql");
  const sqlFiles = await fs.readdir(sqlPath);

  for (const sqlFile of sqlFiles) {
    const content = await fs.readFile(path.join(sqlPath, sqlFile), "utf8");
    if (content.startsWith("-- skip")) continue;
    if (content) {
      query(content).then(() => logger.info(sqlFile + " loaded"));
    }
  }

  fastify.decorate("query", query);

  logger.info("MySQL ready for work");
};

export default fp(DatabasePlugin);

import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import fs from "fs";
import path from "path";

type TestRunnerOptions = {
  dir: string;
  prefix?: string;
};

const TestRunner: FastifyPluginAsync<TestRunnerOptions> = async (
  fastify,
  options
) => {
  const name = options.prefix || "TestRunner";
  const logger = fastify.log.child({ name });

  const files = fs
    .readdirSync(options.dir)
    .filter((file) => file.endsWith(".js"));

  if (files.length === 0) return;

  const promises = files.map(async (file) => {
    const { run } = await import(path.join(options.dir, file));

    if (typeof run === "function") {
      const sublogger = logger.child({ name: `${name} [${file}]` });
      await run(sublogger);
    } else {
      logger.warn(`${file} not have a 'run' function`);
    }
  });

  await Promise.all(promises);

  logger.info("All test runned");
};

export default fp(TestRunner);

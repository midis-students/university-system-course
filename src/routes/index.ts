import { FastifyPluginAsync } from "fastify";

export const autoPrefix = "/";

const IndexRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (req, res) => {
    res.send("Hello world");
  });
};

export default IndexRoute;

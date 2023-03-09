import {FastifyPluginAsync} from "fastify";

export const autoPrefix = "/";

const IndexRoute: FastifyPluginAsync = async (fastify) => {

    const {query} = fastify;

    async function procedureExists(procedure) {
        const [status] = await query(`SHOW PROCEDURE STATUS WHERE NAME = '${procedure}';`)
        return status !== undefined;
    }

    fastify.get("/", async (req, res) => {
        res.send("Hello world");
    });

    type PostProcedure = { Params: { procedure: string }, Body: Array<unknown> };

    fastify.post<PostProcedure>("/:procedure", async (req) => {
        const {procedure} = req.params;
        const body = req.body;

        if (!procedure) throw fastify.httpErrors.badRequest("empty procedure");
        if (!body) throw fastify.httpErrors.badRequest("empty body");
        const exists = await procedureExists(procedure);
        if (!exists) throw fastify.httpErrors.notFound(`${procedure} not found`);

        const args = body.map(arg => typeof arg === 'string' ? `"${arg}"` : arg);

        const [response] = await query(`CALL ${procedure}(${args.join()})`);

        return response;

    });

};

export default IndexRoute;

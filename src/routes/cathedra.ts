import { FastifyPluginAsync } from "fastify";
import { Cathedra } from "../entities/Сathedra";
import { InsertInto } from "../lib/DatabaseUtils";

export const autoPrefix = "/cathedra";

const CathedraRoute: FastifyPluginAsync = async (fastify) => {
  const { query } = fastify;

  ///

  fastify.get("/", async () => {
    return query<Cathedra>(`SELECT * FROM \`${Cathedra.name}\``);
  });

  type CathedraCreateDTO = {
    Body: {
      name: string;
      phone: string;
    };
  };

  fastify.post<CathedraCreateDTO>("/", async (req) => {
    return query(InsertInto(Cathedra, req.body));
  });

  ///

  type CathedraUpdateDTO = {
    Body: {
      id: number;
      name: string;
      phone: string;
    };
  };

  fastify.patch<CathedraUpdateDTO>("/", async (req) => {
    const { id, ...body } = req.body;

    const [cathedra] = await query<Cathedra>(
      `SELECT * FROM \`${Cathedra.name}\` WHERE id = ${id}`
    );

    if (cathedra) {
      Object.assign(cathedra, body);

      let values: string[] = [];

      for (let [key, value] of Object.entries(body)) {
        if (typeof value === "string") {
          value = `"${value}"`;
        }

        values.push(`\`${key}\`=${value}`);
      }

      await query<Cathedra>(
        `UPDATE \`${Cathedra.name}\` SET ${values.join()} WHERE id = ${id}`
      );

      return cathedra;
    }

    throw fastify.httpErrors.notFound(`Cathedra(${id}) not found`);
  });
};

export default CathedraRoute;

import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getUrl(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/:token", 
    {
      schema: {
        params: z.object({
            token: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { token } = request.params;
      const linkURL = await prisma.linkURL.findMany({
        where: {
          token,
        },
      });
      
      if (!linkURL) {
        throw new Error("URL not found");
      }
      
      return reply.send({ url: linkURL[0].url }) ;
    }
  );
}

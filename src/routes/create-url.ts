import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import crypto from "node:crypto";

export async function createUrl(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/createUrl",
    {
      schema: {
        body: z.object({
          url: z.string().url(),
        }),
      },
    },
    async (request) => {
      const { url } = request.body;
      
      const token = crypto.randomBytes(3).toString("hex");

      await prisma.linkURL.create({
        data: {
          url,
          token,
        },
      });

      return { shortURL: "http://short.me/" + token };
    }
  );
}

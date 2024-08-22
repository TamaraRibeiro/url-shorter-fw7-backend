import fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "./lib/prisma";
import { createUrl } from "./routes/create-url";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { getUrl } from "./routes/get-url";
import { env } from "./env";

const app = fastify();

app.register(cors, {
    origin: '*', // which frontend url can access
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler); 

app.register(createUrl);
app.register(getUrl);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running!");
});

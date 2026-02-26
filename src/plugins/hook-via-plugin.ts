import fp from "fastify-plugin";

const simplePlugin = fp(async (fastify, opts) => {
  
  // THIS IS A HOOK - it runs automatically for EVERY request
  fastify.addHook('onRequest', async (request, reply) => {
    console.log("🔥 HOOK RAN: Request received!");
  });

});

export default simplePlugin
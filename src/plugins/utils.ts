// src/plugins/utils.ts
import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";

// Extend Fastify types
declare module "fastify" {
  interface FastifyInstance {
    utils: {
      formatDate: (date: Date) => string;
      generateRandomId: () => string;
      sleep: (ms: number) => Promise<void>;
    };
  }
}

const utilsPlugin: FastifyPluginAsync = fp(async (fastify, opts) => {

  const utils = {
    formatDate: (date: Date) => {
      return date.toISOString().split('T')[0];
    },
    
    generateRandomId: () => {
      return Math.random().toString(36).substring(2, 10);
    },
    
    sleep: (ms: number): Promise<void> => {
      return new Promise<void>(resolve => setTimeout(resolve, ms));
    }
  };

  fastify.decorate('utils', utils);

  
  fastify.log.info('Utils plugin registered');
});

export default utilsPlugin;
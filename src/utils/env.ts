import "dotenv/config";

class Env {
    static APP_NAME = process.env.APP_NAME || "Fastify.js";
    static JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
    static APP_PORT = process.env.PORT || 8000;
    static DATABASE_URL = process.env.DATABASE_URL || "";
}

export default Env;
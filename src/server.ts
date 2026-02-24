import app from "./app.js";

const start = async () => {
    await app.listen({ port: 8000})
    console.log("Server started at http://localhost:8000 .... ")
}
start()
const fastify = require("fastify");

const server = fastify();

server.listen({ port: 3333 }).then(() => {
	console.log("HTTP server running!");
});
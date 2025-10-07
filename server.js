const http = require("node:http");

const server = http.createServer((request, reply) => {
	reply.write("Hello World");
	reply.end();
});

server.listen(3333).on("listening", () => {
	console.log("HTTP server running!");
});

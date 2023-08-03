const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.default();
const port = process.env.PORT || 3001;

server.user(middlewares);
server.user(router);
server.listen(port);
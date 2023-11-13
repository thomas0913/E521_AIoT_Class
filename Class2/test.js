const http = require("http");

const host = "127.0.0.1";
const port = 8080;

let server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plane');
	res.end('Hello World my Node.js');
});

server.listen(port, host, () => {
	console.log(`Listening http://${host}:${port} ...`);
});

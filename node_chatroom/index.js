'use strict';

// Imports
const WebSocketServer = require('ws').Server;

// Constants
const IP_BIND = '0.0.0.0'
const WS_PORT = 8008;

// Servers
var wsServer = new WebSocketServer({
	host: IP_BIND,
	port: WS_PORT
});

// Connected clients to Websocket
let connectedClients = [];

// WebSocket server code
wsServer.on('connection', (ws, req) => {
	console.log('New connection: ' + req.connection.remoteAddress);
	connectedClients.push(ws);

	ws.on('message', (data) => {
		console.log(data);
		let _json = JSON.parse(data);
		connectedClients.forEach((ws, i) => {
			if (ws.readyState === ws.OPEN) {
				ws.send(JSON.stringify({
					user: _json.user,
					msg: _json.msg,
					ts: parseInt(new Date().getTime() / 1000)
				}));
			}
		});
	});

	ws.on('close', (code, message) => {
		console.log("Closed connection: " + req.connection.remoteAddress);
		connectedClients.forEach((ws, i) => {
			if (ws.readyState !== ws.OPEN) {
				connectedClients.splice(i, 1);
			}
		});
	});
});

console.log(`WS server is listening at ws://${IP_BIND}:${WS_PORT}`);
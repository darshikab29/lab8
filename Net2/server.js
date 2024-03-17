const WebSocket = require('ws');
const http = require('http');

const server = http.createServer(function (req, res) {
    // Handle HTTP requests (if needed)
});

const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', function (ws) {
    console.log('Client connected.');

    clients.add(ws);

    ws.on('message', function (message) {
        // Convert the received message to a string
        const receivedMessage = message.toString('utf8');
        console.log('Received message:', receivedMessage);

        // Broadcast the message to all clients
        clients.forEach(function (client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(receivedMessage);
            }
        });
    });

    ws.on('close', function () {
        console.log('Client disconnected.');
        clients.delete(ws);
    });
});

const PORT = process.env.PORT || 8080; // Use the specified port or default to 8080
const HOST = '0.0.0.0'; // Listen on all network interfaces

server.listen(PORT, HOST, function () {
    console.log(Server is listening on ${HOST}:${PORT});
});
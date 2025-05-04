import app from './src/app.js';
import http from 'http';
import { Server } from 'socket.io';
import setupSockets from './src/sockets/index.js';

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

setupSockets(io);

server.listen(5000, () => console.log('Backend running on port 5000'));


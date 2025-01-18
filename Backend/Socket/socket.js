const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const chatApp = express();

const server = http.createServer(chatApp);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT", "DELETE"],
    },
});

const userSocket = {};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId
    userSocket[userId] = socket.id;
    console.log("User Socket : ", userSocket);
    io.emit("getOnlineUsers", Object.keys(userSocket));

    socket.on('sendMessage', (messageData) => {
        const messageWithDetails = {
            ...messageData,
            createdAt: new Date().toISOString(),
        };
        io.emit('receiveMessage', messageWithDetails);
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
        delete userSocket[userId];
        io.emit("getOnlineUsers", Object.keys(userSocket));
        console.log("Updated online users:", Object.keys(userSocket));
    });
})


module.exports = {
    chatApp, server,
};

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173", // Vue 앱의 주소
        methods: ["GET", "POST"]
    }
});

let counts = {
    A: 0,
    B: 0
};

io.on('connection', (socket) => {
    console.log('A user connected');

    // 초기 카운트 전송
    socket.emit('counts', counts);

    socket.on('increment', (side) => {
        counts[side]++;
        io.emit('counts', counts);
    });

    socket.on('decrement', (side) => {
        if (counts[side] > 0) {
            counts[side]--;
            io.emit('counts', counts);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
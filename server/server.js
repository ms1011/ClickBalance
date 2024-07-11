const express = require('express');
const app = express();
const http = require('http').createServer(app);

// 명령줄 인수에서 Vue 앱 주소 가져오기
const args = process.argv.slice(2);
const vueAppAddress = args[0];

if (!vueAppAddress) {
    console.error('Vue 앱 주소를 입력해주세요.');
    process.exit(1);
}

const io = require('socket.io')(http, {
    cors: {
        origin: vueAppAddress, // 명령줄 인수로 받은 Vue 앱 주소
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
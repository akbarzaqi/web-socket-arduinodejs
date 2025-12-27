const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');
const {Server} = require('socket.io')
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = new Server(http);

app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('HTTP server listening on port 3000');
}); 

const port = new SerialPort({
    path: 'COM5',
    baudRate: 9600
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (props) => {
    console.log('Received data from serial port:', props);
    io.emit('data', { data: props });
});

app.post('/send', (req, res) => {
    const { command } = req.body;
    console.log('Sending command to serial port:', command);
    port.write(command + '\n', (err) => {
        if (err) {
            return res.status(500).send('Error on write: ' + err.message);
        }
        res.json({ status: `pesan kekirim boss => ${command}` });
    });
});
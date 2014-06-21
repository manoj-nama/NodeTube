var socket = io.connect('http://localhost', {
    transports: ["websocket", "xhr-polling", "jsonp-polling"]
});
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

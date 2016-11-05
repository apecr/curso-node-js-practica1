var net = require('net');

var client = new net.Socket();
client.connect(1702, '192.168.1.49', function() {
	console.log('Connected');
	client.write('hola\r\n');
	console.log('write (hola) to the server');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	if (data == 'mundo') {
		client.destroy(); // kill client after server's response
	}
});

client.on('close', function() {
	console.log('Connection closed');
});

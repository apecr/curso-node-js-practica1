var net = require('net');

var client = new net.Socket();
var clientDatabase = new net.Socket();
client.connect(1702, '192.168.1.49', function() {
	console.log('Connected');
	client.write('hola\r\n');
	client.write('set hola mundo\r\n');
	client.write('set curso node.js\r\n');
	client.write('set servidor el tuyo\r\n');
	client.write('set cliente el mio\r\n');
	client.write('get cliente el mio\r\n');
	client.write('get servidor\r\n');
	client.write('get hola\r\n');
	client.write('get adios\r\n');
	console.log('write (hola) to the server');
});

clientDatabase.connect(1702, '192.168.1.49', function() {
	console.log('Connected');
	client.write('hola\r\n');
	client.write('set hola mundo\r\n');
	client.write('set curso node.js\r\n');
	client.write('set servidor el tuyo\r\n');
	client.write('set cliente el mio\r\n');
	client.write('get cliente el mio\r\n');
	client.write('get servidor\r\n');
	client.write('get hola\r\n');
	client.write('get adios\r\n');
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

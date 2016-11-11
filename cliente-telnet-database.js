var net = require('net');

var clientDatabase = new net.Socket();
clientDatabase  = clientDatabase.setNoDelay(true);
clientDatabase.connect(11311, '192.168.1.49', handleConnection);

function handleConnection() {
	console.log('Connected');
	sendServer('set hola mundo\r\n');
	sendServer('set curso node.js\r\n');
	sendServer('set servidor el tuyo\r\n');
	sendServer('set cliente el mio\r\n');
	sendServer('get cliente\r\n');
	sendServer('get servidor\r\n');
	sendServer('get hola\r\n');
	sendServer('get curso\r\n');
	sendServer('get adios\r\n');
	sendServer('delete hola\r\n');
	sendServer('get hola\r\n');
	sendServer('quit\r\n');
}

function sendServer(command) {
	clientDatabase.write(command, function(){
		handleWrite(command);
	});
	console.log(`Comando  ${command}`);
}

function handleWrite( command ){
	console.log(`End write ${command}`);
}

clientDatabase.on('data', function(data) {
	console.log('Received: ' + data.toString());
	if (data == 'exit') {
		client.destroy(); // kill client after server's response
	}
});


clientDatabase.on('close', function() {
	console.log('Connection closed');
});



'use strict';

var testing = require('testing');

function getFiveAsync(callback) {
    setImmediate(function() {
        callback('He fallado', 5);
    });
}

function testGetFiveAsync(callback){
	getFiveAsync(function(error, result){
		testing.equals(result, 5, 'NO vale 5', callback);
		testing.check(error, 'There is an error', callback);
		testing.success(callback);
	})
}

//Opcion 1 llamamos directamente a la funcion de test
testing.run(testGetFiveAsync, testing.show);

//Opcion 2 exportamos los test al ejecutar node <nombre-fichero>
//exports.test = function(callback)
//{   
//    var tests = [
//    	testGetFiveAsync,
//    ];
//    testing.run(tests, callback);
//};  
//
//// run tests if invoked directly
//if (__filename == process.argv[1])
//{   
//    exports.test(testing.show);
//}
//

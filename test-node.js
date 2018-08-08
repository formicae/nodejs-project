// var http = require('http');
// http.createServer(function (req, res) {
// 	res.writeHead(200, {'Content-Type':'text/plain'});
// 	res.end('Hello World/n');
// }).listen(1234,'127.0.0.1')
// console.log('Server running at http://127.0.0.1:1234/');

// var PI = Math.PI;
// exports.area = function(r){
// 	return PI*r*r;
// };

// setInterval(function () {
// console.log(1);
// }, 1000);

var calc = {};

calc.add = function(a,b){
	return a+b;
}

calc.multiply = function(a,b){
	return a*b;
}

module.exports = calc;

// exports.add = function(a,b){
// 	return a+b;
// }

console.log(calc.add(5,10));
var should = require('should');
require("mocha-as-promised")();

var Q = require('q');
Q.longStackSupport = true;

function tantrumThrower() {
	console.log("I'm gonna throw a tantrum");
	throw "Fuck you, FUCK you and this shit, fuck it all I'm out BITCHES!";
}

describe('Q', function() {
	it('Should bubble up direct handler exceptions', function() {
		var test_q = Q.promise(function(resolve, reject, notify) {
			setTimeout(function() {
				resolve("Yay!");
			}, 100);
		});

		return test_q.then(function() {
			tantrumThrower();
		});
	});

	it('Should bubbble up indirect exceptions', function() {
		var test_q = Q.promise(function(resolve, reject, notify) {
			setTimeout(function() {
				resolve("Yay!");
			}, 100);
		});

		var then_test_q;
		
		var result_q = Q.promise(function(resolve, reject) {
			then_test_q = test_q.then(function(){
				console.log("test_q has resolved");
				tantrumThrower();
				resolve("passed");
			}, function(e) {
				console.log("test_q has errored");
				reject(e);
				console.log("Hello");
			});
		});

		return then_test_q;
	});
});

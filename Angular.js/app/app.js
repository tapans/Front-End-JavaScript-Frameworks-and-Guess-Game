var secret=Math.floor(Math.random()*10)+1;
var numTries = 1;

//create a module, 2nd parameter is for dependencies
var guessGameApp = angular.module('guessGameApp', ['ngRoute']);

//add routing and views. Application routes are declared via the $routeProvider which makes it easy to wire together controllers, view templates & current URL location in the browser
guessGameApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'Partials/default.html',
			controller: 'LogController'
		})
		.when('/gameOver', {
			templateUrl: 'Partials/gameOver.html',
			controller: 'LogController'
		})
		.otherwise({
			redirectTo: '/'
		});
	}
);

//create a factory: a reuse feature
//both views (restartGame and default) show the history of guesses. let's use a factory to store the history/log 
//now logFactory can be injected as parameter to controllers! see logController.js
guessGameApp.factory('logFactory', function(){
	var factory={};
	var log=[];
	factory.getLog = function(){
		return log;
	}
	factory.addToLog = function(entry){
		console.log(entry);
		log.push(entry);
	}
	factory.clear = function(){
		log = [];
	}
	return factory;
});
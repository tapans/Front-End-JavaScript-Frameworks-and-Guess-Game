//create a module, 2nd parameter is for dependencies
var guessGameApp = angular.module('guessGameApp', ['ngRoute']);

//add routing and views. Application routes are declared via the $routeProvider which makes it easy to wire together controllers, view templates & current URL location in the browser
guessGameApp.config(function($routeProvider){
	$routeProvider.when('/', {
			templateUrl: 'Partials/default.html',
			controller: 'LogController'
		}).when('/gameOver', {
			templateUrl: 'Partials/gameOver.html',
			controller: 'LogController'
		}).otherwise({
			redirectTo: '/'
		});
	}
);

//add LogController to the module
//scope is the glue that connects the view with model. so all the markup contained within body with LogController can access $scope objects
guessGameApp.controller('LogController', function($scope){
	$scope.log = [];
	$scope.submit = function(){				
		if ($scope.guess > secret){
			$scope.log.push({type:"high", text:"Your guess: " + $scope.guess + ", was too high!"});
			numTries++;
		}
		else if ($scope.guess < secret){
			$scope.log.push({type:"low", text:"Your guess: " + $scope.guess + ", was too low!"});
			numTries++;
		}

		else{
			$scope.log.push({type:"correct", text:"Correct! It took you " + numTries + " tries!"});	
			
		}
	};
});	
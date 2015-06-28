//add LogController to the module
//scope is the glue that connects the view with model. so all the markup contained within body with LogController can access $scope objects
guessGameApp.controller('LogController', function($scope, $location, logFactory){
	$scope.log = logFactory.getLog();
	$scope.submit = function(){				
		if ($scope.guess > secret){
			entry = {type:"high", text:"Your guess: " + $scope.guess + ", was too high!"};
			logFactory.addToLog(entry);			
			numTries++;
		}
		else if ($scope.guess < secret){
			entry = {type:"low", text:"Your guess: " + $scope.guess + ", was too low!"};
			logFactory.addToLog(entry);			
			numTries++;
		}

		else{
			entry = {type:"correct", text:"Correct! It took you " + numTries + " tries!"};	
			logFactory.addToLog(entry);
			$location.path("gameOver");
		}
	};
	$scope.reset = function(){
		$location.path("/");
		logFactory.clear();
		secret=Math.floor(Math.random()*10)+1;
		numTries = 1;
	};
});	
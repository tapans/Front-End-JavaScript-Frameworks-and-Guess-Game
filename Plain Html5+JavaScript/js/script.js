var secret=Math.floor(Math.random()*10)+1;
var numTries = 1;

(function(){
	document.getElementById("guess-form").onsubmit=function(){
		event.preventDefault();
		checkGuess();
	};
})();

function reset(){
	secret=Math.floor(Math.random()*10)+1;
	numTries = 1;
	document.getElementById("guessHistory").innerHTML="";
	document.getElementById("guess-submit").removeAttribute("disabled");
}

function checkGuess(){
	guess = Number.parseInt(document.getElementById("guess").value);
	guessHistoryDiv = document.getElementById("guessHistory");	
	if (guess > secret){
		feedback = "<span class='high'>Your guess: " + guess + " was too high!</span> <br/>";
		guessHistoryDiv.innerHTML+=feedback;
		numTries++;
	}
	else if (guess < secret){
		feedback = "<span class='low'>Your guess: " + guess + " was too low!</span> <br/>";
		guessHistoryDiv.innerHTML+=feedback;
		numTries++;
	}
	else{				
		feedback = "<span class='correct'>Correct! It took you " + numTries + " tries!</span><p><input value='Restart!' type='button' onclick='reset();'/></p>";				
		guessHistoryDiv.innerHTML+=feedback;
		document.getElementById("guess-submit").setAttribute("disabled","true");
	}
}
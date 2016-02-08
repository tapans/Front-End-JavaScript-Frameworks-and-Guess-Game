$(document).ready(function(){

	//Model to hold global application state - useful for interaction between WonView and GuessHistoryView for restart functionality
	var AppState = Backbone.Model.extend({
		defaults: {
			status: "guessing" //guessing|won
		}
	})
	var gameState = new AppState()

	var Guess = Backbone.Model.extend({
		//Guess model has type & guess attributes
		defaults: {
			type: "low", //low|high|correct,
			guess: 5,
			tries: 0
		}		
	})

	var GuessHistory = Backbone.Collection.extend({
		model: Guess
	});

	//Responsible for rendeing each individual Guess in Guess History section
	var GuessView = Backbone.View.extend({
		tagName: "li",

		render: function(){
			$(this.el).html('<span class='+this.model.get("type")+'>Your guess: '+this.model.get("guess")+' was too '+this.model.get("type")+'!</span>');
			return this;
		}
	})

	//Responsible for rendering restart button and stats when correct geuss is made
	var WonView = Backbone.View.extend({
		tagName: "li",
		events: {
			'click button#reset': 'gameWonState'
		},

		render: function(){
			$(this.el).html("<span class='correct'>" + this.model.get("guess") + " is Correct! It took you " + this.model.get('tries')+ " tries!</span><p><button id='reset'>Restart!</button></p>");
			return this;
		},

		gameWonState: function(){
			gameState.set("status", "won");
		}
	})

	var GuessHistoryView = Backbone.View.extend({
		el: $("body"),

		events: { 
			'click button#guessBtn': 'checkGuess',		
		},

		initialize: function(){
			_.bindAll(this, 'render', 'checkGuess', 'addGuess', 'reset'); // every function that uses 'this' as the current object should be in here			
			this.collection = new GuessHistory();
			this.collection.bind("add", this.addGuess);
			this.reset();
		},
		checkGuess: function(){
			this.numTries++;
			var currGuess = Number.parseInt($("#guess").val());
			var secret = Number.parseInt(this.secret);
			var guessItem = new Guess();
			if (currGuess > secret) guessType = "high";
			if (currGuess < secret) guessType = "low";
			if (currGuess === secret) guessType = "correct";						
			guessItem.set({
				type: guessType,
				guess: currGuess,
				tries: this.numTries
			});		
			this.collection.add(guessItem);	
		},

		addGuess: function(guessItem){
			console.log(guessItem.attributes.type);
			if (guessItem.attributes.type === "correct"){
				var wonView = new WonView({
					model: guessItem
				});
				$("ul", this.el).append(wonView.render().el);
			} else {				
				var guessView = new GuessView({
					model: guessItem
				});
				$("ul", this.el).append(guessView.render().el);
			}
		},

		reset: function(){
			console.log("reset called")
			this.secret = Math.floor(Math.random()*10)+1;
			console.log(this.secret);
			this.numTries = 0;
			this.collection.reset();
			$("#guessHistory").html("<ul></ul>");
			gameState.off('change:status', this.reset);
			gameState.set("status", "guessing");	
			gameState.on('change:status', this.reset);
		}
	})

	var GuessGame = new GuessHistoryView();

})

var lowerBound = 1;
var upperBound = 10;

// Create a main react component to encapsulate the application logic
var GuessGameApp = React.createClass({

  //Set default state before rendering. Components are basically state machines.
  getInitialState: function(){
    return { 
      guessHistory: [],
      restart: false      
     };
  },

  //this.state is used to manage dynamic data. 
  //**Re-rendering occurs when this.setState is called!
  //this.props is used to access parameters passed from the parent
  //refs allow access to DOM nodes via this.refs.refValue. Ex: since input has attribute ref with value "guess", we can access that input node via this.refs.guess.getDOMNode()
  checkGuess: function(e){
    e.preventDefault();    

    var history = this.state.guessHistory;
    var secret = this.props.secretNum;    
    var guess = parseInt(this.refs.guess.getDOMNode().value)
    var reset = false;
    if (guess > secret){
      history.push({type: "high", comment: "Your guess: " + guess + ", was too high!"});
      this.props.numTries++;
    }
    else if (guess < secret){
      history.push({type: "low", comment: "Your guess: " + guess + ", was too low!"}); 
      this.props.numTries++;
    }
    else{
      history.push({type: "correct", comment: guess + " is correct! Congrats! It took you: " + this.props.numTries + " tries!"});      
      reset = true;
      this.refs.guessBtn.getDOMNode().setAttribute("disabled", true);
    }
    
    this.setState({guessHistory: history, restart: reset});
  },

  reset: function(){
    this.props.secretNum = getSecretNumber(lowerBound, upperBound);
    this.props.numTries = 1; 
    this.setState({guessHistory: [], restart: false});
    this.refs.guessBtn.getDOMNode().removeAttribute("disabled");
  },

  //each component has a render function that renders the view everytime a state changes
  //components can be nested to separate concerns. Ex: GuessHistory component is nested in GuessGameApp component.
  render: function(){
    var restartButton;
    if (this.state.restart){
      var boundClick = this.reset.bind(this);
      restartButton = <RestartButton onClick={boundClick} />;            
    }
    else{
      restartButton = null;
    }
    return(
      <div>
        <form onSubmit={this.checkGuess}>
          <label>Pick a number between {lowerBound} and {upperBound}</label>
          <br />
          <input ref="guess" required autofocus type="number" min={lowerBound} max={upperBound}/>
          <input ref="guessBtn" type="submit" value="Guess!"/>
        </form>
        <GuessHistory history={this.state.guessHistory} />
        {restartButton}
      </div>
    );
  }
});

var GuessHistory = React.createClass({
  render: function(){
    var entries = this.props.history.map(function(entry){
      return <GuessHistoryEntry type={entry.type} comment={entry.comment} />
    })
    return (
      <div>
        <ul>{entries}</ul>
      </div>
    );
  }
});

var GuessHistoryEntry = React.createClass({
  render: function(){
    return(
      <div>
        <li><span className={this.props.type}>{this.props.comment}</span></li>
      </div>
    );
  }
})

var RestartButton = React.createClass({
  render: function(){
    return(      
      <div>
        <button onClick={this.props.onClick}>Restart!</button>
      </div>
    );
  }
})

React.render(
  <GuessGameApp secretNum={getSecretNumber(lowerBound, upperBound)} numTries={1} />,
  document.getElementById('container')
);

function getSecretNumber(lowerBound, upperBound){
  diff = upperBound - lowerBound;
  return Math.ceil(Math.random()*diff) + lowerBound;
}
/*
 *  ^\s*              # beginning of expression
 *  (\d+)?            # optional number of dice, 1 by default
 *  [dD]              # d for dice
 *  (\d+|%)           # die size or % for d100
 *  \s*               # space allowed
 *  (?:               # do not capture the whole group
 *    ([-+xX*\/bB])   # arithmatic or "b" for best of
 *    \s*             # space allowed
 *    (\d+)           # a number
 *  )?                # this group is optional
 *  \s*$              # end of expression
 */

var Dice = exports;

var DiceParsingError = function (message) {
  this.name = "DiceParsingError";
  this.message = (message || "");
};
DiceParsingError.prototype = Error.prototype;

Dice.dice = function (diceExpression) {  
  var diceRegex = /^(\d+)?[dD](\d+|%)\s*(?:([-+xX*\/bB])\s*(\d+))?$/;
  var parts = diceRegex.exec(diceExpression); 
  if (parts) {
    this.numDice = parts[1] || 1;
    this.dieSize = parts[2] === "%" ? 100 : parts[2];
    this.operator = (parts[3] && parts[3].toLowerCase());
    this.operand = parts[4];
    this.maxDice = (this.operator === 'b' && this.operand);
    this.roll = function () {
      var rolls = Dice.rollArray(this);
      var sum = 0;
      for (var roll in rolls) { sum += rolls[roll]; }

      switch(this.operator) {
        case '+': 
          sum += this.operand;
          break;
        case '-':
          sum -= this.operand;
          break;
        case '*':
          sum *= this.operand;
          break;
        case '/':
          sum /= this.operand;
          break;
        default:
          break;
      }

      return {sum: sum, rolls: rolls};
    }        
  } else {
    throw new DiceParsingError("Not a valid dice expression: " + diceExpression);
  }
}

Dice.rollArray = function (dice) {
  var rolls = [];
  for (var i = 0; i < dice.numDice; i++) {
    rolls.push(Math.ceil(Math.random() * dice.dieSize));
  }
  rolls.sort(function (a, b) { return b - a });
  
  if (dice.maxDice) {
    return rolls.slice(0, dice.maxDice);
  } else {
    return rolls;
  }
}

Dice.roll = function (diceExpression) {
  var dice = new Dice.dice(diceExpression);  
  return dice.roll().sum;
}


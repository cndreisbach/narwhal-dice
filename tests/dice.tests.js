var tests = exports;
var assert = require("assert");
var Dice = require("dice");

tests['test that we can roll dice and get an array'] = function () {
  var rolls = Dice.rollArray({numDice: 7, dieSize: 10});
  assert.equal(7, rolls.length);
  
  for (var roll in rolls) {
    assert.ok(rolls[roll] >= 1 && rolls[roll] <= 10);
  }
}

tests['test that we can create a new dice object'] = function () {
  var dice = new Dice.dice("3d6");
  
  assert.equal(3, dice.numDice);
  assert.equal(6, dice.dieSize);
  
  var sum = dice.roll().sum;
  assert.ok(sum >= 3 && sum <= 18);
}

tests['test that we can drop the lowest die'] = function () {
  var dice = new Dice.dice("4d6 b 2");
  
  assert.equal(2, dice.maxDice);  
  assert.equal(2, dice.roll().rolls.length);
}

if (require.main == module.id)
    require('test/runner').run(tests);
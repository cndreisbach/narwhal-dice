Dice for Narwhal
----------------

Dice is a library to roll RPG-style dice for the [Narwhal JS environment](http://narwhaljs.org).

    js> var Dice = require("dice");
    js> Dice.roll("3d6");
    4
    js> Dice.roll("3d6");
    14
    js> Dice.roll("6d12 / 2");     
    8.5
    js> Dice.roll("6d12 / 2");
    18.5
    js> Dice.roll("4d6 b 3"); // This will choose only the best 3 dice.
    14
    js> var dice = new Dice.dice("4d6 b 3");
    js> JSON.stringify(dice.roll())
    {"sum":8,"rolls":[4,3,1]}
    js> JSON.stringify(dice.roll())
    {"sum":12,"rolls":[5,4,3]}
    js> JSON.stringify(dice.roll())
    {"sum":10,"rolls":[4,4,2]}
    
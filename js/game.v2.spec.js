const Game = require('./game.v2');

describe("Rock Paper Scissors Game", function(){
  var game = new Game(5);

  it("returns 5", function(){
    expect(game.maxRounds).toBe(5);
  })
})

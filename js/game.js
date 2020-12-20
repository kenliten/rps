'use strict';

class RockPaperScissorsGame {
  availablePlays = ['rock', 'paper', 'scissors'];
  playerSelection = "";
  computerSelection = "";
  playedRounds = 0;
  won = 0;
  lose = 0;
  ties = 0;

  computerPlay() {
    this.computerSelection = this.availablePlays[Math.floor(Math.random() * 2)];
  }

  playRound() {
    let win = false;
    this.playedRounds += 1;
    console.log(`Round ${this.playedRounds}: `);
    if (this.playerSelection == this.computerSelection) {
      this.ties += 1;
      return "It's a tie! Both have choose " + this.playerSelection;
    } else {
      if (this.playerSelection == "rock"){
        if (this.computerSelection == "scissors") {
          win = true;
        }
      } else if (this.playerSelection == "scissors") {
        if (this.computerSelection == "paper") {
          win = true;
        }
      } else if (this.playerSelection == "paper") {
        if (this.computerSelection == "rock") {
          win == true;
        }
      }

      if (win) {
        this.won += 1;
        return `You won! ${this.playerSelection} beats ${this.computerSelection}`;
      } else {
        this.lose += 1;
        return `You lose! ${this.computerSelection} beats ${this.playerSelection}`;
      }
    }
  }

  play() {
    this.playerSelection = "";
    this.computerPlay();
    let goodMove = false;
    while (!goodMove){

      this.playerSelection = prompt("What's your move?");
      this.playerSelection.toLowerCase();

      if (this.playerSelection == this.availablePlays[0] ||
        this.playerSelection == this.availablePlays[1] ||
        this.playerSelection == this.availablePlays[2]) {
          goodMove = true;
        } else {
          console.log('Bad move!\nTry again.');
        }
    }

    console.log(this.playRound());
  }

  statistics() {
    if (this.won > this.lose) {
      console.log("Congratulations!");
    } else {
      console.log("So bad, dude!");
    }
    console.log(`You won ${this.won} out of ${this.playedRounds}, with ${this.ties} tie(s).`);
  }

  constructor(rounds) {
    for (let i = 0; i < rounds; i++) {
      this.play();
    }

    this.statistics();
  }
}

let game = new RockPaperScissorsGame(5);

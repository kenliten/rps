class Game{
  options = ['rock', 'paper', 'scissors'];

  stats = {
    player: {
      rounds: 0,
      won: 0,
      lose: 0
    },
    computer: {
      rounds: 0,
      won: 0,
      lose: 0
    },
    ties: 0
  };

  selections = {
    player: null,
    computer: null
  };

  rounds = {
    max: 0,
    left: 0
  };

  ui = {
    buttons: {
      rock: document.querySelector('#rock-button'),
      paper: document.querySelector('#paper-button'),
      scissors: document.querySelector('#scissors-button'),
      restart: document.querySelector('#restart-button')
    },
    panels: {
      restart: document.querySelector('#restart-button-panel'),
      controls: document.querySelector('#controls-panel'),
      result: document.querySelector('#result'),
      playerPoints: document.querySelector('#player-points'),
      computerPoints: document.querySelector('#computer-points'),
      info: document.querySelector('#info')
    }
  };

  status = 'stopped';

  computerSelect() {
    this.selections.computer = Math.floor(Math.random() * 2);
  }

  updateUi() {
    if (this.status == 'playing'){
      this.ui.panels.controls.style.display = "block";
      this.ui.panels.restart.style.display = "none";
    } else {
      this.ui.panels.controls.style.display = "none";
      this.ui.panels.restart.style.display = "block";
    }

    this.ui.panels.playerPoints.textContent = this.stats.player.won;
    this.ui.panels.computerPoints.textContent = this.stats.computer.won;

    if (this.rounds.left != 0) {
      this.ui.panels.result.textContent =
          `No result yet, waiting for ${this.rounds.left} to show the result.`;
      this.ui.panels.result.className = '';
    } else {
      let result = this.getResult();
      this.ui.panels.result.innerHTML = result.body;
      this.ui.panels.result.className = result.class;
    }
  }

  activateControls() {
    var self = this;
    this.ui.buttons.rock.addEventListener('click', function(){
      self.selections.player = 0;
      self.play();
    });
    this.ui.buttons.paper.addEventListener('click', function(){
      self.selections.player = 1;
      self.play();
    });
    this.ui.buttons.scissors.addEventListener('click', function(){
      self.selections.player = 2;
      self.play();
    });
    this.ui.buttons.restart.addEventListener('click', function(){
      self.restart();
    });
  }

  initialize(rounds) {
    this.status = 'playing';
    this.rounds.max = rounds;
    this.rounds.left = rounds;
    this.selections.player = null;
    this.selections.computer = null;
    this.stats.player.won = 0;
    this.stats.player.lose = 0;
    this.stats.computer.won = 0;
    this.stats.computer.lose = 0;
    this.stats.ties = 0;
  }

  getWinner(player, computer) {
    if (player == computer) {
      return -1;
    } else if (player == computer + 1 || player + 2 == computer) {
      return 0;
    } else {
      return 1;
    }
  }

  getResult() {
    if (this.stats.computer.won > this.stats.player.won) {
      this.stats.computer.rounds += 1;
      return {
        body: `The computer wins with ${this.stats.computer.won} out of ${this.rounds.max} victories and ${this.stats.ties} ties!<br/>The player have won ${this.stats.player.rounds} rounds, and the computer have won ${this.stats.computer.rounds}.`,
        class: 'white-color red'
      }
    } else if (this.stats.player.won > this.stats.computer.won) {
      this.stats.player.rounds += 1;
      return {
        body: `The Player wins with ${this.stats.player.won} out of ${this.rounds.max} victories and ${this.stats.ties} ties!<br/>The player have won ${this.stats.player.rounds} rounds, and the computer have won ${this.stats.computer.rounds}.`,
        class: 'white-color green'
      }
    } else {
      return {
        body: `This is a tie with ${this.stats.computer.won} victories each player!`,
        class: 'white-color amber'
      }
    }
  }

  report(msg, type) {
    this.ui.panels.info.className = "container padding-xxl white-text " + type;
    this.ui.panels.info.innerHTML = msg;
  }

  capitalize(str) {
    let upp = str.charAt(0);
    upp = upp.toUpperCase();
    return str.replace(str.charAt(0), upp);
  }

  play() {
    var self = this;
    this.computerSelect();
    var playerMove = this.capitalize(this.options[this.selections.player]);
    var computerMove = this.capitalize(this.options[this.selections.computer]);
    let winner = this.getWinner(this.selections.player,
          this.selections.computer);
    if (winner == -1) {
      self.stats.ties += 1;
      this.report(`Both have played <b><u>${computerMove}</u></b>, it's a tie!`, 'amber');
    } else if (winner == 0) {
      self.stats.player.won += 1;
      self.stats.computer.lose += 1;
      this.report( ` <b><u>${playerMove}</u></b> vs  <b><u>${computerMove}</u></b>. Player wins!`, 'green');
    } else {
      self.stats.computer.won += 1;
      self.stats.player.lose += 1;
      this.report(` <b><u>${playerMove}</u></b> vs  <b><u>${computerMove}</u></b>. Computer wins!`, 'red');
    }
    this.rounds.left -= 1;
    if (this.rounds.left == 0) {
      this.status = 'stopped';
    }
    this.updateUi();
  }

  restart() {
    this.initialize(this.rounds.max);
    this.report('', '');
    this.updateUi();
  }

  constructor(rounds = 5) {
    this.initialize(rounds);
    this.activateControls();
    this.updateUi();
  }
}

const game = new Game();

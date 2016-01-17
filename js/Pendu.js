/**
 * Modèle du jeu du pendu
 * @param id : l'id du div contenant le jeu
 */

Pendu = function (id) {
  this.vue = new PenduVue (id);
  this.maxError = 9;
  this.init.call(this);
  //Quand le dom est près on initialise la vue et ses actions sur le modèle
  $(document).ready(this.setVue.bind(this));
};

Pendu.prototype.setVue = function () {
  this.vue.init.call(this.vue);
  this.vue.dom.initBtn.click(this.initWord.bind(this));
  this.vue.dom.testLetterBtn.click(this.testLetter.bind(this));
  this.vue.dom.testSolutionBtn.click(this.testSolution.bind(this));
};

/**
 * Initialise les valeurs dynamiques du modèle
 */

Pendu.prototype.init = function () {
  this.errors = 0;
  this.answer = "";
  this.solution = "";
  this.letters = {};
  this.tries = [];
};

/**
 * Appelée lorsque le joueur valide le mot à trouver, 
 * la fonction met à jour le modèle en fonction du mot et lance la phase de jeu
 */

Pendu.prototype.initWord = function () {
  solution = this.vue.getSolution();
  if (solution.length > 0) {
    this.init.call(this);
    this.solution = solution;
    for (var i = 0; i < solution.length; i++) {
      var letter = solution[i];
      this.answer += "_";
      if (!this.letters[letter]) {
        this.letters[letter] = [i];
      } else {
        this.letters[letter].push(i);
      }
    }
    this.vue.startGame.call(this.vue, this.answer);
  }
};

/**
 * Appelée lorsque le joueur qui doit deviner le mot teste une lettre
 */

Pendu.prototype.testLetter = function () {
  letter = this.vue.getLetterInput.call(this.vue)
  if (!pendu.isLetter(letter)) {
    this.vue.notValidTry.call(this.vue, letter);
    return;
  }
  letter = pendu.getValidInput(letter);
  if (this.tries.indexOf(letter) !== -1) {
    this.vue.alreadyTried.call(this.vue, letter);
    return;
  }
  this.tries.push(letter);
  if (this.letters[letter]) {
    var positions = this.letters[letter];
    for (var i = 0; i < positions.length; i++) {
      var pos = positions[i];
      this.answer = this.answer.replaceAt(pos, letter);
    }
    this.vue.refresh.call(this.vue, this.answer, this.tries, this.errors);
  } else {
    this.errors++;
    this.vue.notIn.call(this.vue, letter, this.tries, this.errors);
  }
  this.checkState.call(this);
};

/**
 * Appelée lorsque le joueur qui doit deviner le mot test le mot en entier
 */

Pendu.prototype.testSolution = function () {
  test = this.vue.getTestSolution();
  if (test) {
    this.tries.push(test);
    if (test === this.solution) {
      this.answer = this.solution;
    } else {
      this.errors++;
      this.vue.notTheSolution.call(this.vue, test, this.tries, this.errors);
    }
    this.checkState.call(this);
  }
};

/**
 * Permet de passer en mode fin de manche si c'est nécessaire
 */

Pendu.prototype.checkState = function () {
  if (this.hasWin.call(this)) {
    this.vue.win.call(this.vue, this.solution);
  } else if (this.hasLost.call(this)) {
    this.vue.lose.call(this.vue, this.solution);
  }
};

/**
 * La manche est-elle perdue ?
 * @returns {Boolean}
 */

Pendu.prototype.hasLost = function () {
  return this.errors >= this.maxError && !this.hasWin.call(this);
};

/**
 * La manche est-elle gagnée ?
 * @returns {Boolean}
 */

Pendu.prototype.hasWin = function () {
  return this.answer === this.solution;
};


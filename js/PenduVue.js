/**
 * Vue du jeu du pendu
 * @param id : l'id du div contenant le jeu
 * @returns
 */
PenduVue = function (id) {
  this.id = id;
  //La liste des éléments du dom à aller chercher pour mettre à jour la vue dynamiquement
  this.domIds = {
    container : this.id,
    answer : "answer-" + this.id,
    deadContainer : "dead-" + this.id,
    inputTestLetter : "test-letter-" + this.id,
    inputTestSolution : "test-solution-" + this.id,
    testLetterBtn : "test-letter-btn-" + this.id,
    testSolutionBtn : "test-solution-btn-" + this.id,
    playSection : "play-section-" + this.id,
    initSection : "init-section-" + this.id,
    inputInit : "init-input-" + this.id,
    initBtn : "init-btn-" + this.id,
    tries : "tries-" + this.id
  };
  //Objet contenant les éléments du dom (initialisé quand le dom est près)
  this.dom = {};
  this.isInit = false;
};

/**
 * Initialise les éléments du dom et les évènements à écouter.
 */

PenduVue.prototype.init = function () {
  if (!this.isInit) {
    for (var id in this.domIds) {
      if (this.domIds.hasOwnProperty(id)) {
        this.dom[id] = $("#" + this.domIds[id]);
      }
    }
    this.dom.inputInit.keyup (this.checkInput.bind(this, this.dom.inputInit));
    this.dom.inputTestLetter.keyup (this.checkInput.bind(this, this.dom.inputTestLetter));
    this.dom.inputTestSolution.keyup (this.checkInput.bind(this, this.dom.inputTestSolution));
    this.isInit = true;
  }
};

/**
 * On s'assure que les valeurs saisies dans le input sont bien des lettres
 * @param input
 */

PenduVue.prototype.checkInput = function (input) {
  $(input).val(pendu.getValidInput($(input).val()));
};

/**
 * Renvoie la valeur de la solution saisie par le joueur
 * @returns
 */

PenduVue.prototype.getSolution = function () {
  return this.dom.inputInit.val();
};

/**
 * Renvoie la valeur de la lettre que le joueur veut tester
 * @returns
 */
PenduVue.prototype.getLetterInput = function () {
  return this.dom.inputTestLetter.val();
};

/**
 * Renvoie la valeur du mot que le joueur veut tester
 * @returns
 */

PenduVue.prototype.getTestSolution = function () {
  return this.dom.inputTestSolution.val();
};

/**
 * Commence la phase de jeu.
 * @param answer
 */

PenduVue.prototype.startGame = function (answer) {
  this.dom.initSection.hide();
  this.dom.playSection.show();
  this.refresh.call(this, answer, null, 0);
};

/**
 * Affiche un nouvel état du jeu
 * @param answer
 * @param tries
 * @param errors
 */

PenduVue.prototype.refresh = function (answer, tries, errors) {
  this.resetInputs.call(this);
  this.dom.answer.html(answer);
  this.refreshTries.call(this, tries);
  this.refreshError.call(this, errors);
};

/**
 * Affiche un nouvel état des essais
 * @param tries
 */

PenduVue.prototype.refreshTries = function (tries) {
  var triesHtml = "";
  if (tries && tries.length > 0) {
    for (var i = 0; i < tries.length; i++) {
      triesHtml += "<li class='tries'>" + tries[i] +"</li>";
    }
  }
  this.dom.tries.html(triesHtml);
};

/**
 * Affiche un nouvel état des erreurs
 * @param tries
 */

PenduVue.prototype.refreshError = function (errors) {
  if (errors && errors > 0) {
    for (var i = 0; i < errors; i++) {
      $("#" + this.domIds.deadContainer + " .dead-part.part-" + i).show(); 
    }
  }
};


/**
 * Vide les champs saisis
 */
PenduVue.prototype.resetInputs = function () {
  this.dom.inputTestLetter.val("");
  this.dom.inputTestSolution.val("");
};

/**
 * Feedback visuel lors d'une mauvaise saisie
 * @param letter
 */

PenduVue.prototype.notValidTry = function (letter) {
  this.resetInputs.call(this);
  //TODO : implement feedback
};

/**
 * Feedback visuel lors d'un test de lettre un fructueux
 * @param letter
 * @param tries
 * @param errors
 */

PenduVue.prototype.notIn = function (letter, tries, errors) {
  this.resetInputs.call(this);
  this.refreshTries.call(this, tries);
  this.refreshError.call(this, errors);
  //TODO : add animation when letter is not is the word
};

/**
 * Le joueur a gagné la manche, on lui montre!
 * @param solution
 */

PenduVue.prototype.win = function (solution) {
  this.resetInputs.call(this);
  this.dom.answer.html(solution);
  this.refreshError.call(this, errors);
  //TODO : add animation when user win
};

/**
 * Le joueur a perdu la manche, on lui montre!
 * @param solution
 */

PenduVue.prototype.lose = function (solution) {
  this.resetInputs.call(this);
  this.dom.answer.html(solution);
  this.refreshError.call(this, errors);
  //TODO : add animation when user lose
};

/**
 * Le joueur a sasie un mauvais mot, on lui montre!
 * @param test
 * @param tries
 * @param errors
 */

PenduVue.prototype.notTheSolution = function (test, tries, errors) {
  this.resetInputs.call(this);
  this.refreshTries.call(this, tries);
  this.refreshError.call(this, errors);
  //TODO : add animation when testing wrong word
};
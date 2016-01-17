/**
 * Quelques fonctions utiles...
 */

String.prototype.replaceAt = function(i, c) {
  return this.substr(0, i) + c + this.substr(i + c.length);
}

pendu = {
  //renvoie la string avec uniquement les lettres contenues dedans
  getValidInput : function (str) {
    return str.replace(/\s+/g, '').replace(/[^a-zA-Z-]/g, '').toLowerCase();
  },
  //La string est-elle une lettre
  isLetter : function (l) {
    l = pendu.getValidInput(l);
    return l.length === 1;
  }
};
  


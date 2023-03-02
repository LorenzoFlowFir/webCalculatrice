import { Automate } from "../modele/Automate";

export class Arbre {
  valeur: string | number;
  gauche: Arbre | null;
  droite: Arbre | null;

  constructor(valeur: string | number) {
    this.valeur = valeur;
    this.gauche = null;
    this.droite = null;
  }

  static trouverOperateur(expression: string, operateurs: string[]): number {
    let nbParentheses = 0;
    for (let i = expression.length - 1; i >= 0; i--) {
      const char = expression.charAt(i);
      if (char === ")") {
        nbParentheses++;
      } else if (char === "(") {
        nbParentheses--;
      }
      if (nbParentheses === 0 && operateurs.includes(char)) {
        return i;
      }
    }
    return -1;
  }

  arbreBinaire(expression: string): Arbre | null {
    const calul = new Automate(expression);
    if (calul.start() !== true) {
      console.log("La saisie du calcul est invalide !");
      return null;
    } else {
      return this.creeArbre(expression);
    }
  }

  creeArbre(expression: string): Arbre | null {
    expression = expression.replace("=", "");

    if (expression.startsWith("-")) {
      const noeud = new Arbre("-");
      noeud.gauche = null;
      noeud.droite = this.creeArbre(expression.substring(1));
      return noeud;
    }

    let i = Arbre.trouverOperateur(expression, ["+", "-"]);
    if (i !== -1) {
      const valeur = expression.charAt(i);
      const noeud = new Arbre(valeur);
      noeud.gauche = this.creeArbre(expression.substring(0, i));
      noeud.droite = this.creeArbre(expression.substring(i + 1));
      return noeud;
    }

    i = Arbre.trouverOperateur(expression, ["*", "/"]);
    if (i !== -1) {
      const valeur = expression.charAt(i);
      const noeud = new Arbre(valeur);
      noeud.gauche = this.creeArbre(expression.substring(0, i));
      noeud.droite = this.creeArbre(expression.substring(i + 1));
      return noeud;
    }

    if (expression.charAt(0) === "(" && expression.charAt(expression.length - 1) === ")") {
      return this.creeArbre(expression.substring(1, expression.length - 1));
    } else if (expression !== "") {
      return new Arbre(parseInt(expression));
    } else {
      return null;
    }
  }

  public toString(): string {
    let s = this.valeur.toString();
    if (this.gauche !== null) {
      s = "fg" + this.gauche.toString() + s;
    }
    if (this.droite !== null) {
      s += "fd" + this.droite.toString();
    }
    return s;
  }
}

/*
let expression = "(5+2*3)*(10*10+9*9)="; //expression vraie
//let expression = "1)+1=2"; //expression fausse

const arbre = new Arbre("");
const jonc = arbre.arbreBinaire(expression);
console.log(jonc);
console.log("\nGauche :", jonc?.gauche);
console.log("\nDroite :", jonc?.droite);
console.log(jonc?.toString());*/

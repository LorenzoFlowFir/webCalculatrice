export class Automate {
  public calcul: string;
  public index = -1;
  public parentheses = 0;

  constructor(calcul: string) {
    this.calcul = calcul;
  }

  public set Calcul(v: string) {
    this.calcul = v;
    this.index = -1;
  }

  public get Calcul(): string {
    return this.calcul;
  }

  static estUnChiffre(chiffre: string): boolean {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(chiffre);
  }

  public start(): true | [number, string] {
    this.index++;
    const char = this.calcul[this.index];

    if (Automate.estUnChiffre(char)) {
      return this.situationC();
    } else if (char === "-") {
      return this.situationB();
    } else if (char === ".") {
      return this.situationD();
    } else if (char === " ") {
      return this.start();
    } else if (char === "(") {
      this.parentheses++;
      return this.start();
    } else if (char === ")" && this.parentheses === 0) {
      return [this.index, "Parentheses ouvrante manquante"];
    }

    return [this.index, "Caractère numérique attendu"];
  }

  public situationB(): true | [number, string] {
    this.index++;
    const char = this.calcul[this.index];

    if (Automate.estUnChiffre(char)) {
      return this.situationC();
    } else if (char === ".") {
      return this.situationD();
    } else if (char === ")" && this.parentheses === 0) {
      return [this.index, "Parentheses ouvrante manquante"];
    }
    return [this.index, "Caractère numérique attendu"];
  }

  public situationC(): true | [number, string] {
    this.index++;
    const char = this.calcul[this.index];

    if (Automate.estUnChiffre(char)) {
      return this.situationC();
    } else if (char === "+" || char === "-" || char === "*" || char === "/") {
      return this.start();
    } else if (char === "=" && this.parentheses === 0) {
      return true;
    } else if (char === "=" && this.parentheses === 1) {
      return [this.index, "Parenthèse fermante manquante"];
    } else if (char === ".") {
      return this.situationE();
    } else if (char === " ") {
      return this.situationF();
    } else if (char === ")" && this.parentheses === 1) {
      this.parentheses--;
      return this.situationF();
    } else if (char === ")" && this.parentheses === 0) {
      return [this.index, "Parentheses ouvrante manquante"];
    }
    return [this.index, "Caractère numérique ou opérateur attendu"];
  }

  public situationD(): true | [number, string] {
    this.index++;
    if (Automate.estUnChiffre(this.calcul[this.index])) {
      return this.situationE();
    } else if (this.calcul[this.index] === ")" && this.parentheses === 0) {
      return [this.index, "Parentheses ouvrante manquante"];
    }
    return [this.index, "Caractère numérique attendu"];
  }

  public situationE(): true | [number, string] {
    this.index++;
    const char = this.calcul[this.index];

    if (Automate.estUnChiffre(char)) {
      return this.situationE();
    } else if (char === "+" || char === "-" || char === "*" || char === "/") {
      return this.start();
    } else if (char === "=" && this.parentheses === 0) {
      return true;
    } else if (char === "=" && this.parentheses === 1) {
      return [this.index, "Parenthèse fermante manquante"];
    } else if (char === " ") {
      return this.situationF();
    } else if (char === ")" && this.parentheses === 1) {
      this.parentheses--;
      return this.situationF();
    } else if (char === ")" && this.parentheses === 0) {
      return [this.index, "Parentheses ouvrante manquante"];
    }

    return [this.index, "Caractère numérique ou opérateur attendu"];
  }

  public situationF(): true | [number, string] {
    this.index++;
    const char = this.calcul[this.index];

    if (char === " " || (char === ")" && this.parentheses === 1)) {
      return this.situationF();
    } else if (char === "+" || char === "-" || char === "*" || char === "/") {
      return this.start();
    } else if (char === "=" && this.parentheses === 0) {
      return true;
    } else if (char === "=" && this.parentheses === 1) {
      return [this.index, "Parenthèse fermante manquante"];
    } else if (char === ")" && this.parentheses === 0) {
      return [this.index, "Parentheses ouvrante manquante"];
    }

    return [this.index, "Caractère numérique ou opérateur attendu"];
  }
}

/*
//errur de syntax
const calcul = new Automate("1+1)=2");
console.log(calcul.Calcul);
console.log(calcul.start());

/*
//syntax corrigé
calcul.Calcul = "1+1=2";
console.log(calcul.Calcul);
console.log(calcul.start());

//test du calcul de l'arbre
calcul.Calcul = "(5+2*3)*(10*10+9*9)=";
console.log(calcul.Calcul);
console.log(calcul.start());
*/

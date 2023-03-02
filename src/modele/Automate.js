export class Automate {
    constructor(calcul) {
        this.index = -1;
        this.parentheses = 0;
        this.calcul = calcul;
    }
    set Calcul(v) {
        this.calcul = v;
        this.index = -1;
    }
    get Calcul() {
        return this.calcul;
    }
    static estUnChiffre(chiffre) {
        return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(chiffre);
    }
    start() {
        this.index++;
        const char = this.calcul[this.index];
        if (Automate.estUnChiffre(char)) {
            return this.situationC();
        }
        else if (char === "-") {
            return this.situationB();
        }
        else if (char === ".") {
            return this.situationD();
        }
        else if (char === " ") {
            return this.start();
        }
        else if (char === "(") {
            this.parentheses++;
            return this.start();
        }
        else if (char === ")" && this.parentheses === 0) {
            return [this.index, "Parentheses ouvrante manquante"];
        }
        return [this.index, "Caractère numérique attendu"];
    }
    situationB() {
        this.index++;
        const char = this.calcul[this.index];
        if (Automate.estUnChiffre(char)) {
            return this.situationC();
        }
        else if (char === ".") {
            return this.situationD();
        }
        else if (char === ")" && this.parentheses === 0) {
            return [this.index, "Parentheses ouvrante manquante"];
        }
        return [this.index, "Caractère numérique attendu"];
    }
    situationC() {
        this.index++;
        const char = this.calcul[this.index];
        if (Automate.estUnChiffre(char)) {
            return this.situationC();
        }
        else if (char === "+" || char === "-" || char === "*" || char === "/") {
            return this.start();
        }
        else if (char === "=" && this.parentheses === 0) {
            return true;
        }
        else if (char === "=" && this.parentheses === 1) {
            return [this.index, "Parenthèse fermante manquante"];
        }
        else if (char === ".") {
            return this.situationE();
        }
        else if (char === " ") {
            return this.situationF();
        }
        else if (char === ")" && this.parentheses === 1) {
            this.parentheses--;
            return this.situationF();
        }
        else if (char === ")" && this.parentheses === 0) {
            return [this.index, "Parentheses ouvrante manquante"];
        }
        return [this.index, "Caractère numérique ou opérateur attendu"];
    }
    situationD() {
        this.index++;
        if (Automate.estUnChiffre(this.calcul[this.index])) {
            return this.situationE();
        }
        else if (this.calcul[this.index] === ")" && this.parentheses === 0) {
            return [this.index, "Parentheses ouvrante manquante"];
        }
        return [this.index, "Caractère numérique attendu"];
    }
    situationE() {
        this.index++;
        const char = this.calcul[this.index];
        if (Automate.estUnChiffre(char)) {
            return this.situationE();
        }
        else if (char === "+" || char === "-" || char === "*" || char === "/") {
            return this.start();
        }
        else if (char === "=" && this.parentheses === 0) {
            return true;
        }
        else if (char === "=" && this.parentheses === 1) {
            return [this.index, "Parenthèse fermante manquante"];
        }
        else if (char === " ") {
            return this.situationF();
        }
        else if (char === ")" && this.parentheses === 1) {
            this.parentheses--;
            return this.situationF();
        }
        else if (char === ")" && this.parentheses === 0) {
            return [this.index, "Parentheses ouvrante manquante"];
        }
        return [this.index, "Caractère numérique ou opérateur attendu"];
    }
    situationF() {
        this.index++;
        const char = this.calcul[this.index];
        if (char === " " || (char === ")" && this.parentheses === 1)) {
            return this.situationF();
        }
        else if (char === "+" || char === "-" || char === "*" || char === "/") {
            return this.start();
        }
        else if (char === "=" && this.parentheses === 0) {
            return true;
        }
        else if (char === "=" && this.parentheses === 1) {
            return [this.index, "Parenthèse fermante manquante"];
        }
        else if (char === ")" && this.parentheses === 0) {
            return [this.index, "Parentheses ouvrante manquante"];
        }
        return [this.index, "Caractère numérique ou opérateur attendu"];
    }

    toString() {
        return this.calcul
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

import { Automate } from "../metier/Automate";

//Test autre Methodes

test("Test du setter", () => {
  const testAutomate = new Automate("3+3=6");
  testAutomate.Calcul = "4+4=8";
  expect(testAutomate.Calcul).toEqual("4+4=8");
});

//Tout type d'opération de base

test("Adition 3+3=6", () => {
  const testAutomate = new Automate("3+3=6");
  expect(testAutomate.start()).toBe(true);
});

test("Soustraction 3-3=0", () => {
  const testAutomate = new Automate("3-3=0");
  expect(testAutomate.start()).toBe(true);
});

test("Multiplication 3*3=9", () => {
  const testAutomate = new Automate("3*3=9");
  expect(testAutomate.start()).toBe(true);
});

test("Division 3/3=1", () => {
  const testAutomate = new Automate("3/3=1");
  expect(testAutomate.start()).toBe(true);
});

//Tout type d'opération de base de décimal

test("Adition decimal .3+.3=.6", () => {
  const testAutomate = new Automate(".3+.3=.6");
  expect(testAutomate.start()).toBe(true);
});

test("Soustraction decimal .3-.3=0", () => {
  const testAutomate = new Automate(".3-.3=0");
  expect(testAutomate.start()).toBe(true);
});

test("Multiplication decimal .3*.3=.09", () => {
  const testAutomate = new Automate(".3*.3=.09");
  expect(testAutomate.start()).toBe(true);
});

test("Division decimal .3/.3=1", () => {
  const testAutomate = new Automate(".3/.3=1");
  expect(testAutomate.start()).toBe(true);
});

//Tout type d'opération négatif

test("Adition négatif -3+-3=-6", () => {
  const testAutomate = new Automate("-3+-3=-6");
  expect(testAutomate.start()).toBe(true);
});

test("Soustraction négatif -3--3=0", () => {
  const testAutomate = new Automate("-3--3=0");
  expect(testAutomate.start()).toBe(true);
});

test("Multiplication négatif -3*-3=9", () => {
  const testAutomate = new Automate("-3*-3=9");
  expect(testAutomate.start()).toBe(true);
});

test("Division négatif -3/-3=1", () => {
  const testAutomate = new Automate("-3/-3=1");
  expect(testAutomate.start()).toBe(true);
});

//Tout type d'opération décimal négatif

test("Adition decimal négatif -.3+-.3=-.6", () => {
  const testAutomate = new Automate("-.3+-.3=-.6");
  expect(testAutomate.start()).toBe(true);
});

test("Soustraction decimal négatif -.3--.3=0", () => {
  const testAutomate = new Automate("-.3--.3=0");
  expect(testAutomate.start()).toBe(true);
});

test("Multiplication decimal négatif -.3*-.3=-.09", () => {
  const testAutomate = new Automate("-.3*-.3=-.09");
  expect(testAutomate.start()).toBe(true);
});

test("Division decimal négatif -.3/-.3=1", () => {
  const testAutomate = new Automate("-.3/-.3=1");
  expect(testAutomate.start()).toBe(true);
});

//Tout type d'operation de base de nombre

test("Adition de nombre 30+30=60", () => {
  const testAutomate = new Automate("30+30=60");
  expect(testAutomate.start()).toBe(true);
});

test("Soustraction de nombre 30-30=0", () => {
  const testAutomate = new Automate("30-30=0");
  expect(testAutomate.start()).toBe(true);
});

test("Multiplication de nombre 30*30=90", () => {
  const testAutomate = new Automate("30*30=90");
  expect(testAutomate.start()).toBe(true);
});

test("Division de nombre 30/30=1", () => {
  const testAutomate = new Automate("30/30=1");
  expect(testAutomate.start()).toBe(true);
});

//Tout type d'operation de base de nombre decimal

test("Adition de nombre 30.30+30.30=60.60", () => {
  const testAutomate = new Automate("30.30+30.30=60.60");
  expect(testAutomate.start()).toBe(true);
});

test("Soustraction de nombre 30.30-30.30=0", () => {
  const testAutomate = new Automate("30.30-30.30=0");
  expect(testAutomate.start()).toBe(true);
});

test("Multiplication de nombre 30.30*30.30=918.09", () => {
  const testAutomate = new Automate("30.30*30.30=918.09");
  expect(testAutomate.start()).toBe(true);
});

test("Division de nombre 30.30/30.30=1", () => {
  const testAutomate = new Automate("30.30/30.30=1");
  expect(testAutomate.start()).toBe(true);
});

//Tout type d'operation contenant des erreurs

test("Erreur de format de chiffre 3a+7=10", () => {
  const testAutomate = new Automate("3a+7=10");
  expect(testAutomate.start()).toEqual([1, "Caractère numérique ou opérateur attendu"]);
});

/*J'ai mis en parametre du à l'ajout des espaces
test("Erreur d'operateur 3+7 10", ()=>{
  expect(testAutomate.start("3+7 10")).toEqual([3, "Caractère numérique ou opérateur attendu"]);
})*/

test("Erreur de format --1+1=1", () => {
  const testAutomate = new Automate("--1+1=1");
  expect(testAutomate.start()).toEqual([1, "Caractère numérique attendu"]);
});

test("Erreur de format 1111a", () => {
  const testAutomate = new Automate("1111a");
  expect(testAutomate.start()).toEqual([4, "Caractère numérique ou opérateur attendu"]);
});

test("Erreur de format .-", () => {
  const testAutomate = new Automate(".-");
  expect(testAutomate.start()).toEqual([1, "Caractère numérique attendu"]);
});

test("Erreur de format .1a", () => {
  const testAutomate = new Automate(".1a");
  expect(testAutomate.start()).toEqual([2, "Caractère numérique ou opérateur attendu"]);
});

test("Erreur de format a1+1=", () => {
  const testAutomate = new Automate("a1+1=");
  expect(testAutomate.start()).toEqual([0, "Caractère numérique attendu"]);
});

/*J'ai mis en parametre du à l'ajout des espaces
test("Erreur de format null", ()=>{
  expect(testAutomate.start(" ")).toEqual([0, "Caractère numérique attendu"]);
})*/

//test avec espaces

test("Adition _3+3=6", () => {
  const testAutomate = new Automate(" 3+3=6");
  expect(testAutomate.start()).toBe(true);
});

test("Soustraction 3_-3=0", () => {
  const testAutomate = new Automate("3 -3=0");
  expect(testAutomate.start()).toBe(true);
});

test("Multiplication 3._*3=9", () => {
  const testAutomate = new Automate("3. *3=9");
  expect(testAutomate.start()).toBe(true);
});

test("Division 3.__/3=1", () => {
  const testAutomate = new Automate("3.  /3=1");
  expect(testAutomate.start()).toBe(true);
});

test("3._=", () => {
  const testAutomate = new Automate("3. =");
  expect(testAutomate.start()).toBe(true);
});

test("Erreur de format 3._a", () => {
  const testAutomate = new Automate("3. a");
  expect(testAutomate.start()).toEqual([3, "Caractère numérique ou opérateur attendu"]);
});

//Test Parentheses

test("Adition (3+3)=6", () => {
  const testAutomate = new Automate("(3+3)=6");
  expect(testAutomate.start()).toBe(true);
});

test("Adition avec décimal (3+3.3)=6.3", () => {
  const testAutomate = new Automate("(3+3.3)=6.3");
  expect(testAutomate.start()).toBe(true);
});

test("Soustraction (3)-3=0", () => {
  const testAutomate = new Automate("(3)-3=0");
  expect(testAutomate.start()).toBe(true);
});

test("Multiplication 3*(3)=9", () => {
  const testAutomate = new Automate("3*(3)=9");
  expect(testAutomate.start()).toBe(true);
});

test("Division (3/3)=1", () => {
  const testAutomate = new Automate("(3/3)=1");
  expect(testAutomate.start()).toBe(true);
});

test("Format incorrect, parenthèse fermante manquante (3+3=6", () => {
  const testAutomate = new Automate("(3+3=6");
  expect(testAutomate.start()).toEqual([4, "Parenthèse fermante manquante"]);
});

test("Format incorrect en décimal, parenthèse fermante manquante (3+3.3=6.3", () => {
  const testAutomate = new Automate("(3+3.3=6.3");
  expect(testAutomate.start()).toEqual([6, "Parenthèse fermante manquante"]);
});

test("Adition (3+3 =6", () => {
  const testAutomate = new Automate("(3+3 =6");
  expect(testAutomate.start()).toEqual([5, "Parenthèse fermante manquante"]);
});

test("Format incorrect, parenthèse ouvrante manquante )3+3=6", () => {
  const testAutomate = new Automate(")3+3=6");
  expect(testAutomate.start()).toEqual([0, "Parentheses ouvrante manquante"]);
});

test("Format incorrect, parenthèse ouvrante manquante -)3-3=0", () => {
  const testAutomate = new Automate("-)3-3=0");
  expect(testAutomate.start()).toEqual([1, "Parentheses ouvrante manquante"]);
});

test("Format incorrect, parenthèse ouvrante manquante 3)*3=9", () => {
  const testAutomate = new Automate("3)*3=6");
  expect(testAutomate.start()).toEqual([1, "Parentheses ouvrante manquante"]);
});

test("Format incorrect, parenthèse ouvrante manquante .)3/3=1", () => {
  const testAutomate = new Automate(".)3/3=1");
  expect(testAutomate.start()).toEqual([1, "Parentheses ouvrante manquante"]);
});

test("Format incorrect, parenthèse ouvrante manquante 3.)+3=6", () => {
  const testAutomate = new Automate("3.)+3=6");
  expect(testAutomate.start()).toEqual([2, "Parentheses ouvrante manquante"]);
});

test("Format incorrect, parenthèse ouvrante manquante 3. )+3=6", () => {
  const testAutomate = new Automate("3. )+3=6");
  expect(testAutomate.start()).toEqual([3, "Parentheses ouvrante manquante"]);
});

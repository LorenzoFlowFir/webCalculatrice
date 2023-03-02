import { Arbre } from "../metier/Arbre";

describe("Arbre", () => {
  describe("creeArbre", () => {
    test("créer un arbre à partir d'une expression ", () => {
      const expression2 = "5+2*3=";
      const arbre2 = new Arbre("");
      const jonc2 = arbre2.arbreBinaire(expression2);
      expect(jonc2?.toString()).toEqual("fg5+fdfg2*fd3");
    });

    test("créer un arbre à partir d'une expression contenant un nombre négatif", () => {
      const expression = "-5+2*3=";
      const arbre = new Arbre("");
      const jonc = arbre.arbreBinaire(expression);
      expect(jonc?.toString()).toEqual("-fdfg5+fdfg2*fd3");
    });

    test("créer un arbre à partir d'une expression contenant des parenthèses et un nombre négatif", () => {
      const expression = "(-5+2)*(-3)=";
      const arbre = new Arbre("");
      const jonc = arbre.arbreBinaire(expression);
      expect(jonc?.toString()).toEqual("fg-fdfg5+fd2*fd-fd3");
    });

    test("Ne pas créer un arbre et renvoie null", () => {
      const expression2 = "()";
      const arbre2 = new Arbre("");
      const jonc2 = arbre2.arbreBinaire(expression2);
      expect(jonc2).toBeNull();
    });

    test("renvoie une erreur car la syntax est mauvaise (vérification grace à l'automate)", () => {
      const expression2 = "1)+1=2";
      const arbre2 = new Arbre("");
      const jonc2 = arbre2.arbreBinaire(expression2);
      expect(jonc2).toBeNull();
    });

    test("creeArbre retourne null pour une expression vide", () => {
      const arbre = new Arbre("");
      expect(arbre.creeArbre("")).toBeNull();
    });
  });
});

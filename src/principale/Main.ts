import { Automate } from "../modele/Automate";
import { Arbre } from "../modele/Arbre";

//const chaine = "5+-3/7*8=";
const a = new Automate("5+2*3=");
console.log(a.start());
let expression = "(5+2*3)*(10*10+9*9)="; //expression vraie
//let expression = "1)+1=2"; //expression fausse

const arbre = new Arbre("");
const jonc = arbre.arbreBinaire(expression);
console.log(jonc);
console.log("\nGauche :", jonc?.gauche);
console.log("\nDroite :", jonc?.droite);
console.log(jonc?.toString());



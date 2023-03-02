import { Automate } from "./modele/Automate.js";
import { Arbre } from "./modele/Arbre.js";

// Récupération de tous les boutons dans une liste
const buttons = document.querySelectorAll('.calcButton');
const calcul = document.getElementById('display');


// Ajout d'un listener à chaque bouton
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Code à exécuter lorsque le bouton est cliqué
    console.log(`Bouton ${button.dataset.value} cliqué !`);
    if (button.id === 'clear') {
        calcul.textContent = '0';
    }else if (button.id === 'evaluate') {
        const calcAutomate = new Automate(`${calcul.textContent}=`);
        console.log(`Le calcul ${calcul.textContent} est : ` + calcAutomate.start());
        if (calcAutomate.start()!==true) {
            const calcArbre = new Arbre("");
            const jonc = calcArbre.arbreBinaire(calcAutomate.toString());
            console.log("Voici son arbre : " + jonc);
    
            if (calcul.textContent.length > 5) {
                console.log("\nGauche :", calcArbre.arbreBinaire(calcAutomate.toString()).gauche);
                console.log("\Droite :", calcArbre.arbreBinaire(calcAutomate.toString()).droite);
            }
        }else{
            console.log("Impossible de faire un arbre");
        }
    }else if (button.id === 'mult') {
        calcul.textContent =`${calcul.textContent}${button.textContent}`;
    }else if (button.id === 'div') {
        calcul.textContent =`${calcul.textContent}${button.textContent}`;
    }else{
        if (calcul.textContent === '0') {
            calcul.textContent =button.dataset.value;
        }
        else {
            calcul.textContent =`${calcul.textContent}${button.dataset.value}`;
        }
    }
  });
});



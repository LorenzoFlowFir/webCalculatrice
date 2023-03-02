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
        console.log(calcul.textContent);
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
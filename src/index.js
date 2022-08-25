import ancientsData from "./data/ancients";
import difficulties from "./data/difficulties";
import * as cards from "./data/mythicCards/index";
import './styles.css'
import cardBackImg from "./assets/mythicCardBackground.jpg";

const deck = {}
let ancient = ancientsData[0],
    gameDifficulty = difficulties[0];

const cardBack = document.querySelector('.deck-card-back'),
      cardFace = document.querySelector('.deck-card-face')
//draw ancients
document.querySelectorAll('.ancient-card').forEach((card,index)=>{
    card.style.backgroundImage = `url("${ancientsData[index].cardFace}")`;
})
document.querySelector('.ancients').oninput = (e)=> {
    ancient = ancientsData[e.target.value]
}
//difficulty
document.querySelector('.difficulty').oninput = (e)=> {
    gameDifficulty = difficulties[e.target.value]
}
document.querySelector('.shuffle-button').onclick = ()=> {
cardBack.style.backgroundImage = `url("${cardBackImg}")`;
cardFace.style.backgroundImage = 'none';
//prepare stacks of each color
for (let cardColor in cards) {
    deck[cardColor] = [];
    for (let cardDifficulty of gameDifficulty.scheme) {
        deck[cardColor].push(...shuffleArray(cards[cardColor][cardDifficulty]))
    }
    if (gameDifficulty.shuffle) shuffleArray(deck[cardColor]);
    deck[cardColor].length = ancient[cardColor+'Total'];
    shuffleArray(deck[cardColor])
}
//prepare stages
['firstStage','secondStage','thirdStage'].forEach(stage=>{
    deck[stage] = [];
    for (let color in ancient[stage]) {
        const count = ancient[stage][color];
        for (let i=0; i < count; i++) {
            const elem = deck[color].pop();
            elem.stage = stage;
            deck[stage].push(elem)
        }
        const dot = document.querySelector(`.dot.${stage}.${color}`)
        dot.textContent = count
    }
    deck[stage] = shuffleArray(deck[stage])
})
deck.final = [...deck.thirdStage,...deck.secondStage,...deck.firstStage]
}

cardBack.onclick = () => {
    if (deck.final) {
      const currentCard  = deck.final.pop();
      console.log(currentCard);
      const dot = document.querySelector(`.dot.${currentCard.stage}.${currentCard.color}`)
      dot.textContent -= 1;
      cardFace.style.backgroundImage = `url("${currentCard.cardFace}")`
      if (deck.final.length === 0) {
        deck.final = null;
        cardBack.style.backgroundImage = 'none';
      }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
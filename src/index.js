import ancientsData from "./data/ancients";
import difficulties from "./data/difficulties";
import * as cards from "./data/mythicCards/index";

const deck = {}
const gameDifficulty = difficulties[1];
const ancient = ancientsData[1]
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
        deck[stage].push(...deck[color].splice(-count,count))
    }
    deck[stage] = shuffleArray(deck[stage])
})

console.log(deck)

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
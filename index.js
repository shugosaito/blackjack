'use strict';

let blackjackGame = {
  "you": { "scoreSpan": "#yourResult", "div": "#yourBox", "score": 0 },
  "dealer": { "scoreSpan": "#dealerResult", "div": "#dealerBox", "score": 0 },
  "cards": [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"],
}

const you = blackjackGame["you"];
const dealer = blackjackGame["dealer"];

const cards = blackjackGame.cards;

const hitSound = new Audio('sounds/swish.m4a');

document.getElementById('hit').addEventListener('click', blackjackHit);
document.getElementById('deal').addEventListener('click', blackjackDeal);


function blackjackHit() {
  let card = randomCards();
  showCard(card, you);
  // showScore(you);
}

function randomCards() {
  let imageIndex = Math.floor(Math.random() * 13); //0~12
  const imageElement = cards[imageIndex];
  // return [imageElement, imageIndex];
  return imageElement;
}

function showCard(card, activePlayer) {  //引数に指定することで関数内でrandomCards()を呼ばなくてよい

  let cardImage = new Image(); // document.createElement('img'); と出力内容は同じ
  cardImage.src = `images/${card}.png`;
  
  document.querySelector(activePlayer["div"]).appendChild(cardImage);
  hitSound.play();

}
// function showCard(activePlayer) {
//   const [randomElement, randomIndex] = randomCards();

//   const randomCard = randomElement;
  
//   let cardImage = new Image(); // document.createElement('img'); と出力内容は同じ
//   cardImage.src = `images/${randomCard}.png`;
//   // cardImage.src = "images/A.png";
  
//   document.querySelector(activePlayer["div"]).appendChild(cardImage);
//   hitSound.play();

//   const spanScore = document.querySelector(activePlayer["div"]).querySelector("span");

//   const initialScore = spanScore.innerText; //毎回その時のスコアを持ってくる
//   let score = parseInt(randomIndex + 2);
//   let totalScore = parseInt(initialScore) + score;
  
//   spanScore.innerText = totalScore;
// }

function blackjackDeal() {
  const yourImages = document.querySelector('#yourBox').querySelectorAll('img');
  const dealerImages = document.querySelector('#dealerBox').querySelectorAll('img');

  for (let yourImage of yourImages) {
    yourImage.remove();
  }
  for (let dealerImage of dealerImages) {
    dealerImage.remove();
  }
}





'use strict';

let blackjackGame = {
  "you": { "scoreSpan": "#yourResult", "div": "#yourBox", "score": 0 },
  "dealer": { "scoreSpan": "#dealerResult", "div": "#dealerBox", "score": 0 },
  "cards": [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"],
  "cardsMap": { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10, "A": [1, 11] },
  "wins": 0,
  "losses": 0,
  "draws": 0,
  "isStand": false,
  "turnsOver": false   // when it becomes true = can hit deal
}

const you = blackjackGame["you"];
const dealer = blackjackGame["dealer"];

const cards = blackjackGame.cards;

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lostSound = new Audio('sounds/aww.mp3')

document.getElementById('hit').addEventListener('click', blackjackHit);
document.getElementById('stand').addEventListener('click', blackjackStand);
document.getElementById('deal').addEventListener('click', blackjackDeal);


function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCards();
    showCard(card, you);
    updateScore(card, you);
    showScore(you);
  }
}

function blackjackStand() { //=dealerLogic

  blackjackGame["isStand"] = true;

  // if (blackjackGame["isStand"] === true && blackjackGame["turnsOver"] === false) {

    let card = randomCards();
    showCard(card, dealer);
    updateScore(card, dealer);
    showScore(dealer);
  
    if (dealer["score"] >= 17) {
      let winner = computeWinner();
      showResult(winner);
      blackjackGame["turnsOver"] = true;
    }
  // }

}

function randomCards() {
  let imageIndex = Math.floor(Math.random() * 13); //0~12
  const imageElement = cards[imageIndex];
  return imageElement;
}

function showCard(card, activePlayer) {  //引数に指定することで関数内でrandomCards()を呼ばなくてよい

  if (activePlayer["score"] <= 21) { //21以上の時に新しいカードを出さないため
    let cardImage = new Image(); // document.createElement('img'); と出力内容は同じ
    cardImage.src = `images/${card}.png`;
    
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {

  if (blackjackGame["turnsOver"] === true) {

    blackjackGame["isStand"] = false;

    const yourImages = document.querySelector('#yourBox').querySelectorAll('img');
    const dealerImages = document.querySelector('#dealerBox').querySelectorAll('img');
  
    for (let yourImage of yourImages) {
      yourImage.remove();
    }
    for (let dealerImage of dealerImages) {
      dealerImage.remove();
    }
  
    const yourScoreSpan = document.querySelector(you["scoreSpan"]);
    const dealerScoreSpan = document.querySelector(dealer["scoreSpan"]);
  
    you["score"] = 0;  //blackjackGameの中での初期化
    dealer["score"] = 0;
  
    yourScoreSpan.textContent = 0; //html上での初期化
    dealerScoreSpan.textContent = 0;
  
    yourScoreSpan.style.color = "#fff";
    dealerScoreSpan.style.color = "#fff";
  
    const result = document.getElementById('result');
    result.textContent = "Let's play!";
    result.style.color = "black";

    blackjackGame["turnsOver"] = false;
  }

}

function updateScore(card, activePlayer) {

  if (card === "A") {    
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }

  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }


}

function showScore(activePlayer) {
  const scoreText = document.querySelector(activePlayer["scoreSpan"]);
  if (activePlayer["score"] > 21) {
    scoreText.textContent = "BUST!"; 
    scoreText.style.color = "red";
  } else {
    scoreText.textContent = activePlayer["score"];
  }
}

function computeWinner() { //compute&return winner, update result table
  let winner;

  if (you["score"] <= 21) {
    //higher than dealer or dealer bust && you["score"] <=21(not bust) 
    if (you["score"] > dealer["score"] || dealer["score"] > 21) {
      blackjackGame["wins"]++;
      winner = you;

    } else if (you["score"] < dealer["score"]) {
      blackjackGame["losses"]++;
      winner = dealer;
      
    } else if (you["score"] === dealer["score"]) {
      blackjackGame["draws"]++;
    }

  } else if (you["score"] > 21 && dealer["score"] <= 21) { //自分だけbust
    blackjackGame["losses"]++;
    winner = dealer;

  } else if (you["score"] > 21 && dealer["score"] > 21) { //二人ともbust
    blackjackGame["draws"]++
  }

  return winner;
}

function showResult(winner) {
  let message, messageColor;

  // if (blackjackGame["turnsOver"] === true) { //こいつの必要性が謎

    const winResult = document.getElementById('wins');
    const lostResult = document.getElementById('losses');
    const drawResult = document.getElementById('draws');
    if (winner === you) {
      winResult.textContent = blackjackGame["wins"];
      message = "You won!";
      messageColor = "gold"; //fix later
      winSound.play();
    } else if (winner === dealer) {
      lostResult.textContent = blackjackGame["losses"];
      message = "You lost,,,";
      messageColor = "red";
      lostSound.play();
    } else {
      drawResult.textContent = blackjackGame["draws"];
      message = "You drew";
      messageColor = "black";
    }
    const result = document.getElementById('result');
    result.textContent = message;
    result.style.color = messageColor;
  // }
}






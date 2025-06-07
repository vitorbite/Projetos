const buttons = document.querySelectorAll("button");
const text = [
  "🐶",
  "📱",
  "👨🏻‍💻",
  "😎",
  "💾",
  "📁",
  "🗿",
  "📅",
  "🐶",
  "📱",
  "👨🏻‍💻",
  "😎",
  "💾",
  "📁",
  "🗿",
  "📅",
];
const cards = document.querySelectorAll(".card");
let pontuação = 0;
let tentativas = 0;
let flippedCards = [];
const endscreen = document.querySelector("#endGame");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card")) {
    if (
      e.target.classList.contains("flipped") ||
      flippedCards.includes(e.target)
    )
      return;
    tentativas += 1;
    
    if (flippedCards.length === 2) return;

    e.target.classList.add("flipped");
    flippedCards.push(e.target);

    if (flippedCards.length === 2) {
      // Descobre o índice de cada card clicado
      const idx1 = Array.from(cards).indexOf(flippedCards[0]);
      const idx2 = Array.from(cards).indexOf(flippedCards[1]);
      // Compara o texto dos botões correspondentes
      if (buttons[idx1].textContent === buttons[idx2].textContent) {
        // Mantém virados, limpa o array
        flippedCards = [];
        pontuação += 1;
        if (pontuação === 8) {
          setTimeout(() => {
            window.alert(
              `Você ganhou! Tentativas: ${tentativas}`
            );
            endscreen.classList.remove("hidden");
            endscreen.classList.add("restart");
          }, 500);
        }
      } else {
        // Desvira após 1 segundo
        setTimeout(() => {
          flippedCards[0].classList.remove("flipped");
          flippedCards[1].classList.remove("flipped");
          flippedCards = [];
        }, 1000);
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  buttons.forEach((button, i) => {
    let text2 = text.splice(Random(), 1);
    button.textContent = text2[0];
  });
});

function Random() {
  return Math.floor(Math.random() * text.length);
}

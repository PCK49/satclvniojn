document.addEventListener("DOMContentLoaded", () => {
  const vocabWords = Object.keys(vocab);
  const definitionEl = document.getElementById("game-definition");
  const optionsEl = document.getElementById("game-options");
  const scoreEl = document.getElementById("game-score");
  const nextBtn = document.getElementById("next-question");

  let currentAnswer = "";
  let score = 0;

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = getRandomInt(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function loadQuestion() {
    const correctWord = vocabWords[getRandomInt(vocabWords.length)];
    const correctDefinition = vocab[correctWord];
    currentAnswer = correctWord;

    const choices = [correctWord];
    while (choices.length < 4) {
      const rand = vocabWords[getRandomInt(vocabWords.length)];
      if (!choices.includes(rand)) {
        choices.push(rand);
      }
    }

    shuffle(choices);

    definitionEl.textContent = correctDefinition;
    optionsEl.innerHTML = "";

    choices.forEach(word => {
      const button = document.createElement("button");
      button.textContent = word;
      button.className = "option-btn";
      button.onclick = () => checkAnswer(word);
      optionsEl.appendChild(button);
    });
  }

  function checkAnswer(selected) {
    if (selected === currentAnswer) {
      score++;
      alert("✅ Correct!");
    } else {
      alert(`❌ Incorrect! The correct answer was "${currentAnswer}".`);
    }
    scoreEl.textContent = score;
    loadQuestion();
  }

  nextBtn.addEventListener("click", loadQuestion);

  loadQuestion();
});


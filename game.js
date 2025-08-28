document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    { emojis: "🐍", answer: "python" }, 
    { emojis: "☕", answer: "java" }, 
    { emojis: "🌐📄", answer: "html" }, 
    { emojis: "🎨🖌️", answer: "css" }, 
    { emojis: "⚡🧠", answer: "javascript" }, 
    { emojis: "📦🐳", answer: "docker" }, 
    { emojis: "🌍🐘", answer: "php" }, 
    { emojis: "🦊🌐", answer: "firefox" }, 
    { emojis: "🍃📘", answer: "mongodb" }, 
    { emojis: "🔥🛠️", answer: "firebase" }, 
    { emojis: "🔧🐧", answer: "linux" }, 
    { emojis: "💎🚂", answer: "ruby on rails" }, 
    { emojis: "📱🤖", answer: "android" }, 
  ];

  let currentIndex = 0;
  let score = 0;
  let timer;
  const TIME_LIMIT = 10;
  let timeLeft = TIME_LIMIT;

  const emojiEl = document.getElementById("emoji");
  const answerEl = document.getElementById("answer");
  const resultEl = document.getElementById("result");
  const scoreEl = document.getElementById("score");
  const submitBtn = document.getElementById("submitBtn");
  const congratsModal = new bootstrap.Modal(
    document.getElementById("congratsModal")
  );

  const timerEl = document.createElement("p");
  timerEl.className = "text-center text-danger fw-bold";
  document.querySelector(".card").insertBefore(timerEl, resultEl);

  function startTimer() {
    timeLeft = TIME_LIMIT;
    timerEl.textContent = `⏱️ Waktu: ${timeLeft} detik`;

    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `⏱️ Waktu: ${timeLeft} detik`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        resultEl.textContent = "⏱️ Waktu habis, soal di-skip!";
        currentIndex++;
        if (currentIndex < questions.length) {
          setTimeout(loadQuestion, 1000);
        } else {
          endGame();
        }
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function suffleQuestion(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function loadQuestion() {
    answerEl.value = "";
    resultEl.textContent = "";
    emojiEl.textContent = questions[currentIndex].emojis;
    answerEl.disabled = false;
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
    startTimer();
    answerEl.focus();
  }

  function resetGame() {
    currentIndex = 0;
    score = 0;
    suffleQuestion(questions);
    scoreEl.textContent = `Score antum: ${score}`;
    loadQuestion();
  }

  function endGame() {
    stopTimer();
    answerEl.disabled = true;
    submitBtn.textContent = "Main Lagi";
    resultEl.textContent = `Game beres euy, nilai u ${score}`;

    if (score === questions.length) {
      congratsModal.show();
    }
  }

  submitBtn.addEventListener("click", () => {
    if (submitBtn.textContent === "Main Lagi") {
      resetGame();
      return;
    }

    const userAnswer = answerEl.value.trim().toLowerCase();
    const correctAnswer = questions[currentIndex].answer;

    if (userAnswer === correctAnswer) {
      score++;
      resultEl.textContent = "Alahh siah ning betull";
      stopTimer();
      currentIndex++;
      if (currentIndex < questions.length) {
        setTimeout(loadQuestion, 1000);
      } else {
        endGame();
      }
    } else {
      resultEl.textContent = "Salah euy, coba dei atuh";
    }

    scoreEl.textContent = `Score antum: ${score}`;
  });

  answerEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !submitBtn.disabled) {
      submitBtn.click();
    }
  });

  suffleQuestion(questions);
  loadQuestion();
});

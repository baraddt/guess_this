document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    { emojis: "🐍", answer: "python" },
    { emojis: "☕", answer: "java" },
    { emojis: "⚡", answer: "javascript" },
    { emojis: "💎", answer: "ruby" },
    { emojis: "🐘", answer: "php" },
    { emojis: "🔣", answer: "code" },
    { emojis: "🔁", answer: "loop" },
    { emojis: "🧠", answer: "logic" },
    { emojis: "🪲", answer: "bug" },
    { emojis: "🔧", answer: "debug" },
    { emojis: "🧪", answer: "test" },
    { emojis: "📦", answer: "package" },
    { emojis: "📂", answer: "folder" },
    { emojis: "🧱", answer: "stack" },
    { emojis: "🚀", answer: "deploy" },
  ];

  let currentIndex = 0;
  let score = 0;
  let timer;
  const TIME_LIMIT = 10;
  let timeLeft = TIME_LIMIT;
  let userTries = [];

  const emojiEl = document.getElementById("emoji");
  const answerEl = document.getElementById("answer");
  const resultEl = document.getElementById("result");
  const scoreEl = document.getElementById("score");
  const submitBtn = document.getElementById("submitBtn");
  const congratsModal = new bootstrap.Modal(
    document.getElementById("congratsModal")
  );

  // Tambahkan elemen timer ke pojok kanan atas .card
  const timerEl = document.createElement("p");
  timerEl.id = "timer"; // styling-nya ditaruh di showcase.html
  document.querySelector(".card").appendChild(timerEl);

  function startTimer() {
    timeLeft = TIME_LIMIT;
    timerEl.textContent = `⏱️ ${timeLeft}s`;

    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `⏱️ ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        const correctAnswer = questions[currentIndex].answer;
        const tries = userTries.length ? userTries.join(", ") : "-";

        resultEl.innerHTML = `⏱️ Waktu habis! <br>
        Jawaban Soal: ${correctAnswer}<br>
        Jawaban Antum: ${tries}<br>
        ❌ <span class="text-danger">Tidak benar</span>
        `;

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
    userTries = [];
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
    resultEl.textContent = `Game beres euy, nilai antum ${score}`;

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

    if (!userAnswer) return;

    userTries.push(userAnswer);
    answerEl.value = "";

    if (userAnswer === correctAnswer) {
      score++;
      stopTimer();
      currentIndex++;

      resultEl.innerHTML = `
        Jawaban soal: ${correctAnswer}<br>
        Jawaban anda: ${userAnswer}<br>
        ✅ <span class='text-success'>Benar!</span>
      `;

      if (currentIndex < questions.length) {
        setTimeout(loadQuestion, 1500);
      } else {
        endGame();
      }
    } else {
      resultEl.innerHTML = `❌ Jawaban salah, coba lagi.`;
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

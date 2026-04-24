const quizData = [
    {
        question: "Which language is used for web structure?",
        options: ["CSS", "HTML", "Python", "Java"],
        correct: "HTML"
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["Django", "React", "Flask", "Laravel"],
        correct: "React"
    },
    {
        question: "Which language is commonly used for backend development?",
        options: ["Python", "HTML", "CSS", "Photoshop"],
        correct: "Python"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");
const quizDiv = document.getElementById("quiz");
const scoreText = document.getElementById("scoreText");
const performanceText = document.getElementById("performance");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
    selectedAnswer = null;
    nextBtn.disabled = true; // disable next until answer selected
    optionsEl.innerHTML = "";

    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;

        button.addEventListener("click", () => {
            selectAnswer(button, option);
        });

        optionsEl.appendChild(button);
    });
}

function selectAnswer(button, option) {
    if (selectedAnswer !== null) return; // prevent multiple clicks

    selectedAnswer = option;
    const correctAnswer = quizData[currentQuestionIndex].correct;

    const allButtons = optionsEl.querySelectorAll("button");

    allButtons.forEach(btn => {
        btn.disabled = true; // disable all after selection

        if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = "#bbf7d0"; // green correct
        }

        if (btn.textContent === option && option !== correctAnswer) {
            btn.style.backgroundColor = "#fecaca"; // red wrong
        }
    });

    if (option === correctAnswer) {
        score++;
    }

    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizDiv.classList.add("hidden");
    resultDiv.classList.remove("hidden");

    scoreText.textContent = `Your Score: ${score} / ${quizData.length}`;

    if (score === quizData.length) {
        performanceText.textContent = "Excellent Performance! 🎉";
    } else if (score >= 2) {
        performanceText.textContent = "Good Job! 👍";
    } else {
        performanceText.textContent = "Try Again! 💪";
    }
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultDiv.classList.add("hidden");
    quizDiv.classList.remove("hidden");
    loadQuestion();
});

loadQuestion();

const questions = [
    {
        question: "1. Which language creates the structure of a webpage?",
        answers: ["CSS", "HTML", "JavaScript", "Python"],
        correct: "HTML"
    },
    {
        question: "2. Which language is used to style a webpage?",
        answers: ["HTML", "Java", "CSS", "C"],
        correct: "CSS"
    },
    {
        question: "3. Which language adds interactivity to a webpage?",
        answers: ["JavaScript", "HTML", "CSS", "SQL"],
        correct: "JavaScript"
    },
    {
        question: "4. What does CSS stand for?",
        answers: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        correct: "Cascading Style Sheets"
    },
    {
        question: "5. Which HTML tag is used to create a link?",
        answers: ["<p>", "<img>", "<a>", "<h1>"],
        correct: "<a>"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function showQuestion() {
    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    answerButtons.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.hidden = true;
    scoreElement.textContent = "";

    q.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(button, answer));
        answerButtons.appendChild(button);
    });
}

function checkAnswer(selectedButton, answer) {
    const correctAnswer = questions[currentQuestion].correct;
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (answer === correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct answer!";
    } else {
        selectedButton.classList.add("wrong");
        feedbackElement.textContent =
            "Wrong answer! Correct answer: " + correctAnswer;
    }

    nextButton.hidden = false;
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionElement.textContent = "Quiz Completed!";
    answerButtons.innerHTML = "";
    feedbackElement.textContent = "Well done! You finished the quiz.";
    nextButton.hidden = true;
    scoreElement.textContent =
        "Your Score: " + score + " / " + questions.length;

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.className = "next-btn";
    restartButton.addEventListener("click", restartQuiz);
    answerButtons.appendChild(restartButton);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

showQuestion();

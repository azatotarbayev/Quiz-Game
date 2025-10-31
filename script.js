const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Banana", correct: true },
            { text: "JavaScript", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false }
        ]
    }
];

//QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length; // Question 1 of {5}
maxScoreSpan.textContent = quizQuestions.length; // You score 0 out of {5}

//event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz()
{
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0; // Score: 0

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion()
{
    answerDisabled = false;

    // установить вопрос
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    // установить прогресс
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    // получить вопрос из массива объектов (вопрос-ответ)
    questionText.textContent = currentQuestion.question;

    // очистить контейнер ответов (чтобы ответы не накладывались друг на друга)
    answersContainer.innerHTML = "";

    // пройтись по массиву ответов (добавить 4 ответа в блок)
    // [].foreach(func())
    currentQuestion.answers.forEach(answerObject => {
        // создать кнопку
        const button = document.createElement("button");
        button.textContent = answerObject.text; // вариант ответа
        button.classList.add("answer-btn");
        button.dataset.correct = answerObject.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event)
{
    if (answerDisabled)
        return;

    answerDisabled = true;

    // нажатая кнопка
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    // array.from - creates an array btw
    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true")
            button.classList.add("correct");
        else if (button === selectedButton)
            button.classList.add("incorrect");
    });

    // updating a user's score
    if (isCorrect)
    {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        // check if there are more questions
        // OR if the quiz is over
        if (currentQuestionIndex < quizQuestions.length)
            showQuestion();
        else
            showResults();
    }, 1000);
}

function showResults()
{
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    const percentage = (score/quizQuestions.length) * 100;

    if (percentage === 100)
        resultMessage.textContent = "Perfect! You're a genius!";
    else if (percentage >= 80)
        resultMessage.textContent = "Great job! You know your stuff!";
    else if (percentage >= 60)
        resultMessage.textContent = "Good effort! Keep learning!";
    else if (percentage >= 40)
        resultMessage.textContent = "Not bad! Try again to improve!";
    else
        resultMessage.textContent = "Keep studying! You'll get better!";
}

function restartQuiz()
{
    console.log("quiz restarted");

    resultScreen.classList.remove("active");

    startQuiz();
}
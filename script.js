let selectedCategory = null;
let selectedDiffLevel = null;
let questions = []
let currentQuestionIndex = 0;
let score = 0
let timeLeft = 30
let timerInterval = null;

const startScreen = document.getElementById('startScreen')
const quizScreen = document.getElementById('quizScreen')
const resultScreen = document.getElementById('resultScreen')

// category selection
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedCategory = card.dataset.category;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').textContent = 'Start Quiz';

    });
});

// difficulty selection
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedDiffLevel = btn.dataset.difficulty;
    });
});

// start quiz
document.getElementById('startBtn').addEventListener('click', async () => {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    quizScreen.innerHTML = '<div class="loading"><div class="loading-spinner"></div><p class="loading-text">Loading questions...</p></div>';
    await fetchQuestions();
    resetQuizScreen();
    displayQuestion();
});

function resetQuizScreen() {
    quizScreen.innerHTML = `
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progressBar" style="width: 0%"></div>
                </div>
                <div class="quiz-header">
                    <div class="question-counter" id="questionCounter">Question 1 of 10</div>
                    <div class="timer-display" id="timerDisplay">
                        <span>⏱</span>
                        <span id="timeLeft">30</span>
                    </div>
                </div>
                <div class="question-box">
                    <div class="question-category-tag" id="questionCategory">Category</div>
                    <div class="question-text" id="questionText">Loading question...</div>
                </div>
                <div class="options-list" id="optionsList"></div>
                <button class="next-btn" id="nextBtn" disabled>Next Question</button>
            `;
}

async function fetchQuestions() {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDiffLevel}&type=multiple`);
        const data = await response.json();
        questions = data.results.map(q => ({
            question: decodeHTML(q.question),
            correct: decodeHTML(q.correct_answer),
            options: shuffleArray([...q.incorrect_answers.map(a => decodeHTML(a)), decodeHTML(q.correct_answer)]),
            category: decodeHTML(q.category)    
        }));

    } catch (error) {
        alert('Failed to load questions. Please try again.');
        location.reload();
    }

}

function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('questionCounter').textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById('questionCategory').textContent = question.category;
    document.getElementById('questionText').textContent = question.question;
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    question.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectOption(optionDiv, option));
        optionsList.appendChild(optionDiv);
    });
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);

    startTimer();

}

function selectOption(element, answer) {
    if (element.classList.contains('disabled')) return;
    clearInterval(timerInterval);
    document.querySelectorAll('.option-item').forEach(opt => opt.classList.add('disabled'));

    const question = questions[currentQuestionIndex];
    const isCorrect = answer === question.correct;

    if (isCorrect) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('incorrect');
        document.querySelectorAll('.option-item').forEach(opt => {
            if (opt.textContent === question.correct) {
                opt.classList.add('correct');
            }
        });
    }

    document.getElementById('nextBtn').disabled = false;
}

function startTimer() {
    timeLeft = 30;
    const timerElement = document.getElementById('timeLeft');
    const timerDisplay = document.getElementById('timerDisplay');
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 10) {
            timerDisplay.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.querySelectorAll('.option-item').forEach(opt => opt.classList.add('disabled'));
            document.getElementById('nextBtn').disabled = false;
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(timerInterval);
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        document.getElementById('timerDisplay').classList.remove('warning');
        displayQuestion();
    }
    else {
        showResults();
    }
}

function showResults() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById('resultScore').textContent = `${score}/${questions.length}`;
    document.getElementById('correctStat').textContent = score;
    document.getElementById('incorrectStat').textContent = questions.length - score;
    document.getElementById('accuracyStat').textContent = percentage + '%';

    if (percentage >= 80) {
        document.getElementById('resultTitle').textContent = 'Outstanding Performance!';
        document.getElementById('resultSubtitle').textContent = 'You have mastered this subject';
    } else if (percentage >= 60) {
        document.getElementById('resultTitle').textContent = 'Great Job!';
        document.getElementById('resultSubtitle').textContent = 'You have a solid understanding';
    } else if (percentage >= 40) {
        document.getElementById('resultTitle').textContent = 'Good Effort!';
        document.getElementById('resultSubtitle').textContent = 'Keep practicing to improve';
    } else {
        document.getElementById('resultTitle').textContent = 'Keep Learning!';
        document.getElementById('resultSubtitle').textContent = 'Practice makes perfect';
    }


}

document.getElementById('retryBtn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    quizScreen.innerHTML = '<div class="loading"><div class="loading-spinner"></div><p class="loading-text">Loading questions...</p></div>';
    fetchQuestions().then(() => {
        resetQuizScreen();
        displayQuestion();
    });
});

document.getElementById('homeBtn').addEventListener('click', () => {
    location.reload();
});

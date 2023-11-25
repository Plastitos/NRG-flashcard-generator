function generateFlashcard() {
    const flashcardInput = document.getElementById('flashcardInput').value;

    if (flashcardInput.trim() !== '') {
        // Split input into question:answer pairs and randomize order
        const flashcardPairs = flashcardInput.split('\n').map(pair => pair.trim()).filter(pair => pair !== '');
        const shuffledPairs = shuffleArray(flashcardPairs);

        // Clear existing flashcards
        document.getElementById('flashcardContainer').innerHTML = '';

        // Create flashcards dynamically
        shuffledPairs.forEach((pair, index) => {
            const [answer, question] = pair.split(':'); // Flipping question and answer
            const card = createFlashcard(index + 1, question, answer);
            document.getElementById('flashcardContainer').appendChild(card);
        });

        // Scroll to the bottom
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        alert('Please enter flashcard content');
    }
}

function createFlashcard(index, question, answer) {
    const card = document.createElement('div');
    card.className = 'flashcard';
    card.innerHTML = `
        <div class="question" onclick="flipFlashcard(this)"><span class="label">Question ${index}:</span> ${question}</div>
        <div class="answer" style="display: none;"><span class="label">Answer:</span> ${answer}</div>
    `;

    // Automatically close the flashcard after 4 seconds
    const timer = setTimeout(() => {
        const answerElement = card.querySelector('.answer');
        answerElement.style.display = 'none';
    }, 4000);

    // Store the timer in a data attribute for later use
    card.dataset.timer = timer;

    return card;
}

function flipFlashcard(element) {
    const card = element.parentElement;
    const answer = card.querySelector('.answer');
    answer.style.display = answer.style.display === 'none' ? 'block' : 'none';

    // Reset the timer when the user manually flips the flashcard
    clearTimeout(card.dataset.timer);

    // Set a new timer to automatically close the flashcard after 4 seconds
    card.dataset.timer = setTimeout(() => {
        answer.style.display = 'none';
    }, 4000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let timerInterval;
let timerVisible = true;
let timerPaused = false;
let seconds = 0;
let minutes = 0;

function startOrResumeTimer() {
    if (timerPaused) {
        timerInterval = setInterval(updateTimer, 1000);
        timerPaused = false;
    } else {
        startTimer();
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerPaused = true;
}

function toggleTimerVisibility() {
    const timer = document.getElementById('timer');
    timerVisible = !timerVisible;
    timer.style.display = timerVisible ? 'block' : 'none';
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
}

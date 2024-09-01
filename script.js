document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        {
            question: "Which of the following is used to make a decision in Java?",
            options: ["switch", "is-else", "both a and b", "none of the above"],
            answer: "both a and b"
        },
        {
            question: "Who is the father of Computer?",
            options: ["Charles Dickens", "Charles Babbage", "Mark Twain", "Leo Tolstoy"],
            answer: "Charles Babbage"
        },
        {
            question: "What is the role of the break statement inside a switch?",
            options: ["To start the next case", "To exit the switch statement", "To skip to the default case", "None of the above"],
            answer: "To exit the switch statement"
        },
        {
            question: "How many times does a do-while lop guarantee to run its block of code?",
            options: ["Never", "Once", "Twice", "until the condition brcomes false"],
            answer: "once"
        },
        {
            question: "Which control statement can be used to selectively execute a block of code?",
            options: ["Switch", "if-else", "for", "break"],
            answer: "if-else"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    const userAnswers = [];

    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const submitButton = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result');

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(optionElement));
            optionsContainer.appendChild(optionElement);
        });
    }

    function selectOption(optionElement) {
        const options = optionsContainer.querySelectorAll('.option');
        options.forEach(option => option.classList.remove('selected'));
        optionElement.classList.add('selected');
    }

    function checkAnswer() {
        const selectedOption = optionsContainer.querySelector('.selected');
        if (selectedOption) {
            const userAnswer = selectedOption.textContent;
            userAnswers.push({
                question: questions[currentQuestionIndex].question,
                userAnswer: userAnswer,
                correctAnswer: questions[currentQuestionIndex].answer
            });

            if (userAnswer === questions[currentQuestionIndex].answer) {
                score++;
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        } else {
            alert('Please select an answer!');
        }
    }

    function showResult() {
        questionContainer.style.display = 'none';
        optionsContainer.style.display = 'none';
        submitButton.style.display = 'none';
        
        let resultHTML = `<h2>Your score: ${score} out of ${questions.length}</h2>`;
        resultHTML += '<h3>Correct Answers:</h3><ul>';
        
        userAnswers.forEach(answer => {
            resultHTML += `<li><strong>Q:</strong> ${answer.question}<br><strong>Your answer:</strong> ${answer.userAnswer}<br><strong>Correct answer:</strong> ${answer.correctAnswer}</li><br>`;
        });

        resultHTML += '</ul>';
        resultContainer.innerHTML = resultHTML;
    }

    submitButton.addEventListener('click', checkAnswer);

    loadQuestion();
});


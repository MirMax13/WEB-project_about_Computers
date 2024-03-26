const testData = {
    "testName": "Тест з комп'ютерних знань",
    "questions": [
        {
            "question": "Які з перелічених параметрів характеризують процесор?",
            "answers": [
                {
                    "answer": "Частота",
                    "isCorrect": true
                },
                {
                    "answer": "Кількість ядер",
                    "isCorrect": true
                },
                {
                    "answer": "Швидкість читання",
                    "isCorrect": false
                },
                {
                    "answer": "Кеш-пам'ять",
                    "isCorrect": true
                },
                {
                    "answer": "Швидкість запису",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Що таке апаратне забезпечення?",
            "answers": [
                {
                    "answer": "Будь-яка частина комп’ютера, яка має фізичну структуру",
                    "isCorrect": true
                },
                {
                    "answer": "Будь-який набір програм, який використовується для вирішення певних завдань",
                    "isCorrect": false
                },
                {
                    "answer": "Система управління пам'яттю",
                    "isCorrect": false
                },
                {
                    "answer": "Висока швидкість передачі даних",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Які приклади апаратного забезпечення?",
            "answers": [
                {
                    "answer": "Процесор",
                    "isCorrect": true
                },
                {
                    "answer": "Операційна система",
                    "isCorrect": false
                },
                {
                    "answer": "Монітор",
                    "isCorrect": true
                },
                {
                    "answer": "Текстовий редактор",
                    "isCorrect": false
                },
                {
                    "answer": "Клавіатура",
                    "isCorrect": true
                },
                {
                    "answer": "Відеокарта",
                    "isCorrect": true
                }
            ]
        },
        {
            "question": "Якими були перші комп'ютери?",
            "answers": [
                {
                    "answer": "Великими та незручними",
                    "isCorrect": true
                },
                {
                    "answer": "Маленькими та зручними",
                    "isCorrect": false
                },
                {
                    "answer": "Швидкими та потужними",
                    "isCorrect": false
                },
                {
                    "answer": "Дешевими та доступними",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Коли був створений перший комп'ютер?",
            "answers": [
                {
                    "answer": "1940 рік",
                    "isCorrect": false
                },
                {
                    "answer": "1950 рік",
                    "isCorrect": false
                },
                {
                    "answer": "1946 рік",
                    "isCorrect": true
                },
                {
                    "answer": "1945 рік",
                    "isCorrect": false
                }
            ]
        }
    ]
};

const quizContainer = document.getElementById('quiz');

function buildQuiz() {
    const output = [];

    testData.questions.forEach((question, questionIndex) => {
        const answers = [];
        for (let i = 0; i < question.answers.length; i++) {
            const inputType = (questionIndex === 0 || questionIndex === 2) ? 'checkbox' : 'radio';
            answers.push(
                `<label>
                    <input type="${inputType}" name="question${questionIndex}" value="${i}">
                    ${question.answers[i].answer}
                </label>`
            );
        }
        output.push(
            `<div class="question">
                <h3>${question.question}</h3>
                <div class="answers">${answers.join('')}</div>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let totalScore = 0;
    let maxPossibleScore = 0;

    testData.questions.forEach((question, questionIndex) => {
        const answerContainer = answerContainers[questionIndex];
        const selectors = `input[name=question${questionIndex}]:checked`;
        const userAnswers = Array.from(answerContainer.querySelectorAll(selectors)).map(input => parseInt(input.value));

        let correctCount = 0;
        let incorrectCount = 0;
        let isQuestionCorrect = true; // Додана змінна для визначення правильності відповіді на питання
        let correctAnswers = []; // Змінна для зберігання правильних відповідей
        question.answers.forEach((answer, answerIndex) => {
            if (answer.isCorrect) {
                maxPossibleScore += 1; // Increment maximum possible score for this question
                correctAnswers.push(answer.answer); // Додаємо правильну відповідь до масиву
                if (userAnswers.includes(answerIndex)) {
                    correctCount++;
                } else {
                    isQuestionCorrect = false; // Якщо користувач не обрав правильну відповідь, встановлюємо значення відповідної змінної в false
                }
            } else {
                if (userAnswers.includes(answerIndex)) {
                    incorrectCount++;
                }
            }
        });

        let questionScore = 0;
        if (correctCount === question.answers.filter(ans => ans.isCorrect).length && incorrectCount === 0) {
            // All correct answers selected
            questionScore = 1;
        } else if (correctCount > 0 || incorrectCount > 0) {
            // Partially correct answers selected
            questionScore = (correctCount - (incorrectCount * 0.9)) / maxPossibleScore;
        } else {
            // No correct answers selected or only incorrect answers selected
            questionScore = 0;
        }

        totalScore += questionScore;

        // **Виправлення:** Оновлення контейнера з результатами
        const feedbackContainer = answerContainer.querySelector('.feedback');
        if (feedbackContainer) {
        feedbackContainer.remove();
        }
        const newFeedbackContainer = document.createElement('div');
        newFeedbackContainer.classList.add('feedback');
        const specificFeedback = document.createElement('div');
        specificFeedback.classList.add('specificfeedback');
        specificFeedback.textContent = isQuestionCorrect && incorrectCount === 0 ? 'Ваша відповідь правильна.' : (correctCount > 0 ? 'Ваша відповідь частково правильна.' : 'Ваша відповідь неправильна.');
        newFeedbackContainer.appendChild(specificFeedback);
        
        // Додавання правильних відповідей, якщо їх більше однієї
        if (correctAnswers.length > 1) {
            const numPartsCorrect = document.createElement('div');
            numPartsCorrect.classList.add('numpartscorrect');
            numPartsCorrect.textContent = `У вас правильних відповідей: ${correctCount}.`;
            newFeedbackContainer.appendChild(numPartsCorrect);
            const rightAnswer = document.createElement('div');
            rightAnswer.classList.add('rightanswer');
            rightAnswer.textContent = 'Правильні відповіді:';
            correctAnswers.forEach(correctAnswer => {
                const p = document.createElement('p');
                p.textContent = correctAnswer;
                rightAnswer.appendChild(p);
            });
            newFeedbackContainer.appendChild(rightAnswer);
        }

        // Додавання контейнера з результатами до відповідного контейнера з питанням
        answerContainer.appendChild(newFeedbackContainer);
    });

    // Display score
    if (totalScore < 0) {
        totalScore = 0;
    }
    alert(`Ваша оцінка: ${totalScore.toFixed(2)} з ${testData.questions.length}`);
}


buildQuiz();

// Button to show results
const submitButton = document.createElement('button');
submitButton.id = 'submit';
submitButton.textContent = 'Завершити тест';
submitButton.classList.add('button'); // Додаємо клас "button"
submitButton.addEventListener('click', showResults);
quizContainer.appendChild(submitButton);


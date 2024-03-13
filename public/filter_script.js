function updateRatingValue(value) {
    document.getElementById("rating-output").textContent = value;
  }
// Функція для отримання даних з localStorage
function getSurveyResultsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('surveyResults')) || [];
}

// Функція фільтрує результати опитувань за віком
function filterByAge(age) {
    const surveyResults = getSurveyResultsFromLocalStorage();
    return surveyResults.filter(result => result.age === age);
}

// Функція фільтрує результати опитувань за задоволеністю сайтом
function filterBySatisfaction(satisfaction) {
    const surveyResults = getSurveyResultsFromLocalStorage();
    return surveyResults.filter(result => result.satisfaction === satisfaction);
}

// Функція фільтрує результати опитувань за оцінкою сайту
function filterByRating(rating) {
    const surveyResults = getSurveyResultsFromLocalStorage();
    return surveyResults.filter(result => result.rating === rating);
}
// Додайте аналогічний код для фільтрації за задоволеністю сайтом та оцінкою.

// Додаємо обробник подій для кнопки фільтрації за віком
document.getElementById('age-filter-button').addEventListener('click', function() {
    const selectedAge = document.getElementById('age-filter').value;
    const filteredResults = filterByAge(selectedAge);
    displayResults(filteredResults);
});
// Додаємо обробник подій для кнопки фільтрації за задоволеністю сайтом
document.getElementById('satisfaction-filter-button').addEventListener('click', function() {
    const satisfiedRadioButton = document.getElementById('satisfied-filter');
    const notSatisfiedRadioButton = document.getElementById('not-satisfied-filter');
    
    let selectedSatisfaction;
    if (satisfiedRadioButton.checked) {
        selectedSatisfaction = satisfiedRadioButton.value;
    } else if (notSatisfiedRadioButton.checked) {
        selectedSatisfaction = notSatisfiedRadioButton.value;
    } else {
        console.error('Please select satisfaction option');
        return;
    }
    
    const filteredResults = filterBySatisfaction(selectedSatisfaction);
    displayResults(filteredResults);
});


// Додаємо обробник подій для кнопки фільтрації за оцінкою сайту
document.getElementById('rating-filter-button').addEventListener('click', function() {
    const ratingValue = document.getElementById('rating-output').value;
    const filteredResults = filterByRating(ratingValue);
    displayResults(filteredResults);
});

// Функція відображає результати фільтрації
function displayResults(results) {
    const surveyResultsElement = document.getElementById('survey-results');
    surveyResultsElement.innerHTML = '';

    if (results.length === 0) {
        surveyResultsElement.textContent = 'Немає результатів, які відповідають вибраним критеріям.';
        return;
    }

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.textContent = JSON.stringify(result);
        surveyResultsElement.appendChild(resultElement);
    });
}

// Відображення результатів опитувань при завантаженні сторінки
const initialResults = getSurveyResultsFromLocalStorage();
displayResults(initialResults);

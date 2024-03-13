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

// Функція фільтрує результати опитувань за оцінкою сайту
function filterByRating(rating) {
    const surveyResults = getSurveyResultsFromLocalStorage();
    return surveyResults.filter(result => result.rating === rating);
}

// Функція фільтрує результати опитувань за потребами
function filterByServices(services) {
    const surveyResults = getSurveyResultsFromLocalStorage();
    return surveyResults.filter(result => {
        return services.every(service => result.services.includes(service));
    });
}

// Додаємо обробник подій для кнопки фільтрації за віком
document.getElementById('age-filter-button').addEventListener('click', function() {
    const selectedAge = document.getElementById('age-filter').value;
    const filteredResults = filterByAge(selectedAge);
    displayResults(filteredResults);
});

// Додаємо обробник подій для кнопки фільтрації за оцінкою сайту
document.getElementById('rating-filter-button').addEventListener('click', function() {
    const ratingValue = document.getElementById('rating-output').value;
    const filteredResults = filterByRating(ratingValue);
    displayResults(filteredResults);
});

// Додаємо обробник подій для кнопки фільтрації за потребами
document.getElementById('services-filter-button').addEventListener('click', function() {
    const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(service => service.value);
    const filteredResults = filterByServices(selectedServices);
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

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Ім'я</th>
                <th>Вік</th>
                <th>Мета звернення</th>
                <th>Оцінка</th>
                <th>Коментар</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector('tbody');
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.name}</td>
            <td>${result.age}</td>
            <td>${result.services}</td>
            <td>${result.rating}</td>
            <td>${result.comments}</td>
            
        `;
        tbody.appendChild(row);
    });

    surveyResultsElement.appendChild(table);
}

// Відображення результатів опитувань при завантаженні сторінки
const initialResults = getSurveyResultsFromLocalStorage();
displayResults(initialResults);

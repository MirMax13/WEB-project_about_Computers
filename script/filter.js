function updateRatingValue(value) {
    document.getElementById("rating-output").textContent = value;
}
function getSurveyResultsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('surveyResults')) || [];
}
function filterByAge(age) {
    const surveyResults = getSurveyResultsFromLocalStorage();
    return surveyResults.filter(result => result.age === age);
}
function filterByRating(rating) {
    const surveyResults = getSurveyResultsFromLocalStorage();
    return surveyResults.filter(result => result.rating === rating);
}

function filterByServices(services) {
    const surveyResults = getSurveyResultsFromLocalStorage();
    return surveyResults.filter(result => {
        return services.every(service => result.services.includes(service));
    });
}

document.getElementById('age-filter-button').addEventListener('click', function() {
    const selectedAge = document.getElementById('age-filter').value;
    const filteredResults = filterByAge(selectedAge);
    displayResults(filteredResults);
});

document.getElementById('rating-filter-button').addEventListener('click', function() {
    const ratingValue = document.getElementById('rating-output').value;
    const filteredResults = filterByRating(ratingValue);
    displayResults(filteredResults);
});

document.getElementById('services-filter-button').addEventListener('click', function() {
    const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(service => service.value);
    const filteredResults = filterByServices(selectedServices);
    displayResults(filteredResults);
});

function displayResults(results) {
    const surveyResultsElement = document.getElementById('survey-results');
    surveyResultsElement.innerHTML = '';

    if (results.length === 0) {
        surveyResultsElement.textContent = 'Немає результатів, які відповідають вибраним критеріям.';
        return;
    }

    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = 'Результат фільтрації';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Ім\'я', 'Вік', 'Мета звернення', 'Оцінка', 'Коментар'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td data-label="Ім'я">${result.name}</td>
        <td data-label="Вік">${result.age}</td>
        <td data-label="Мета звернення">${result.services}</td>
        <td data-label="Оцінка">${result.rating}</td>
        <td data-label="Коментар">${result.comments}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    surveyResultsElement.appendChild(table);
}

const initialResults = getSurveyResultsFromLocalStorage();
displayResults(initialResults);

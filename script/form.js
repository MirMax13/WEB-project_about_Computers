function updateRatingValue(value) {
    document.getElementById("rating-output").textContent = value;
  }

// Функція, яка викликається при натисканні на кнопку "Надіслати"
function submitForm(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  // Отримуємо дані з форми
  const formData = {
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      dob: document.getElementById('dob').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      satisfaction: document.querySelector('input[name="satisfaction"]:checked').value,
      rating: document.getElementById('rating').value,
      services: Array.from(document.querySelectorAll('input[name="services[]"]:checked')).map(service => service.value),
      comments: document.getElementById('comments').value,
      resume: document.getElementById('resume').value
  };

  // Отримуємо збережені дані з LocalStorage або створюємо новий масив
  let surveyResults = JSON.parse(localStorage.getItem('surveyResults')) || [];

  // Додаємо новий результат опитування до масиву
  surveyResults.push(formData);

  // Зберігаємо оновлений масив у LocalStorage
  localStorage.setItem('surveyResults', JSON.stringify(surveyResults));

  // Очищаємо дані форми
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.querySelector('input[name="satisfaction"]:checked').checked = false;
  document.getElementById('rating').value = '5';
  document.querySelectorAll('input[name="services[]"]:checked').forEach(service => service.checked = false);
  document.getElementById('comments').value = '';
  document.getElementById('resume').value = '';

  // Повідомлення про успішне надсилання форми
  alert('Ваша заявка надіслана');
}

// Додаємо обробник подій для форми
document.querySelector('.survey-form').addEventListener('submit', submitForm);
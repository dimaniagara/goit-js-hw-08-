import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

const formEl = document.querySelector('.feedback-form');
// const inputEl = document.querySelector("input[name = 'email']");
// const texareaEl = document.querySelector("textarea[name = 'message']");
// const btnEl = document.querySelector('button[type = "submit"]');

formEl.addEventListener('input', throttle(onTyping, 500));
formEl.addEventListener('submit', onSubmit);
dataRecovery();

function onTyping(event) {
  // const data = { email: inputEl.value, message: texareaEl.value };
  data[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function dataRecovery() {
  const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parsedData) {
    // inputEl.value = parsedData.email;
    // texareaEl.value = parsedData.message;
    const [email, message] = formEl.elements;
    email.value = parsedData.email || '';
    message.value = parsedData.message || '';
  }
}

function onSubmit(e) {
  e.preventDefault();
  console.log(data);
  e.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}

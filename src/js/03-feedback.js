import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('textarea');
const inputEL = document.querySelector('input');
const LOCAL_KEY = 'feedback-form-state';
let formData = {};

formEl.addEventListener('submit', throttle(onFormSubmit, 500));
formEl.addEventListener('input', savedOnFormData);

savedTextOnField();

function onFormSubmit(event) {
  event.preventDefault();
  const consoleMassage = JSON.parse(localStorage.getItem(LOCAL_KEY));

  console.log(consoleMassage);

  localStorage.removeItem(LOCAL_KEY);

  event.currentTarget.reset();
}

function savedTextOnField() {
  const savedMassage = localStorage.getItem(LOCAL_KEY);
  const savedMassageJSON = JSON.parse(savedMassage);

  if (savedMassage) {
    textareaEl.value = savedMassageJSON.message;
    inputEL.value = savedMassageJSON.email;
  }
}

function savedOnFormData(event) {
  if (localStorage.getItem(LOCAL_KEY)) {
    formData = JSON.parse(localStorage.getItem(LOCAL_KEY));
  }

  formData[event.target.name] = event.target.value;

  const formDataJSON = JSON.stringify(formData);

  localStorage.setItem(LOCAL_KEY, formDataJSON);
}

/* 

---------------------Первый вариант--------------------

import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('textarea');
const LOCAL_KEY = 'feedback-form-state';
const formData = {};

formEl.addEventListener('submit', throttle(onFormSubmit, 500));
formEl.addEventListener('input', savedOnFormData);
textareaEl.addEventListener('input', onTextareaInput);

textareaText();

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();

  localStorage.removeItem(LOCAL_KEY);

  console.log(formData);
}

function onTextareaInput(event) {
  const localStorageValue = event.target.value;

  localStorage.setItem(LOCAL_KEY, localStorageValue);
}

function textareaText() {
  const savedMassage = localStorage.getItem(LOCAL_KEY);

  if (savedMassage) {
    textareaEl.value = savedMassage;
  }
}

function savedOnFormData(event) {
  formData[event.target.name] = event.target.value;
}
 */

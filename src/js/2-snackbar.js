import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.js-form');
const submit = document.querySelector('.js-button');

form.addEventListener('submit', e => {
  e.preventDefault();
  const state = form.elements.state.value;
  const delay = Number(form.elements.delay.value);

  createPromise(state, delay)
    .then(value => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
        closeOnEscape: true,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
        closeOnEscape: true,
        position: 'topRight',
      });
    });
});

function createPromise(state, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(delay)
      } else { rej(delay) };
    }, delay);
  });
}

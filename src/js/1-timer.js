import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('.js-start-button');
startButton.setAttribute('disabled', true);

const data = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      iziToast.error({
        message: 'Please choose a date in the future',
        closeOnEscape: true,
        position: 'topRight'
      });
    }
    else {
      userSelectedDate = selectedDates[0].getTime();

      startButton.removeAttribute('disabled');
    }
  },
};

flatpickr(datePicker, options);

startButton.addEventListener('click', handleTimerStart);

function handleTimerStart() {
  const timeRemaining = Object.values(
    convertMs(userSelectedDate - Date.now())
  );

  data.days.textContent = timeRemaining[0];
  data.hours.textContent = timeRemaining[1];
  data.minutes.textContent = timeRemaining[2];
  data.seconds.textContent = timeRemaining[3];

  
  setInterval(() => {
    const timeRemaining = Object.values(
      convertMs(userSelectedDate - Date.now())
    );

    data.days.textContent = timeRemaining[0];
    data.hours.textContent = timeRemaining[1];
    data.minutes.textContent = timeRemaining[2];
    data.seconds.textContent = timeRemaining[3];
  }, 1000)

  startButton.setAttribute('disabled', true);
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, '0');

  return { days, hours, minutes, seconds };
}





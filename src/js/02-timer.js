import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "notiflix/dist/notiflix-3.2.6.min.css";
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
const datetimePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    }
    const startButton = document.querySelector('[data-start]');
    startButton.disabled = false;
  },
});
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;
function startCountdown() {
  const selectedDate = datetimePicker.selectedDates[0];
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;
  if (timeDifference <= 0) {
    Notiflix.Notify.failure("Please choose a date in the future");
    return;
  }
  startButton.disabled = true;
  countdownInterval = setInterval(() => {
    const timeRemaining = selectedDate - new Date();
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success("Countdown finished!");
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }, 1000);
}

startButton.addEventListener('click', startCountdown);

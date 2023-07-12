import { Notify } from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const delayInput = this.elements.delay;
  const stepInput = this.elements.step;
  const amountInput = this.elements.amount;
  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  createPromises(delay, step, amount)
    .then((results) => {
      Notify.success('All promises resolved');
      console.log('All promises resolved:', results);
    })
    .catch((error) => {
      Notify.failure('Error occurred');
      console.log('Error occurred:', error);
    });
});

  function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
async function createPromises(initialDelay, step, amount) {
  const promises = [];
  for (let i = 0; i < amount; i++) {
    const delay = initialDelay + step * i;
    const promise = createPromise(i + 1, delay);
    promises.push(promise);
  }
  return Promise.allSettled(promises);
}

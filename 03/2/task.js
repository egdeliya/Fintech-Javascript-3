/**
 * Сделать функцию, которая reject'ит возвращаемый промис, передавая в качестве ошибки строку 'timeout_error',
 * если он не resolve'ится за указанный timeout, или ведет себя эквивалентно исходному.
 * В учебных целях для этой задачи просьба не использовать Promise.race.
 *
 * @param {Promise} promise исходный промис
 * @param {Number} timeoutInMilliseconds время для timeout в миллисекундах
 * @return {Promise} промис с нужным поведением
 */

function rejectOnTimeout(promise, timeoutInMilliseconds) {
  let resolveValue = null;
  let rejectValue = null;

  promise.then(
    value => resolveValue = value,
    err => rejectValue = err
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (resolveValue !== null) {
        resolve(resolveValue);
      } else if (rejectValue !== null) {
        reject(rejectValue);
      } else {
        reject('timeout_error');
      }
    }, timeoutInMilliseconds);
  });
}

module.exports = rejectOnTimeout;


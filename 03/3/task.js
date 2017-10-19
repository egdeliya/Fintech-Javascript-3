/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */

function promiseAll(promises) {
  let resolvedValues = [];
  let counter = 0;

  return new Promise(function(resolve, reject) {
    promises.forEach((prom, index) => {
      prom.then(value => {
        resolvedValues[index] = value;
        counter++;
      }, reject)
        .then(() => {
          if (counter === promises.length) {
            resolve(resolvedValues);
          }
        }, err => err);
    });
  });
}

module.exports = promiseAll;

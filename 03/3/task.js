/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
function promiseAll(promises) {
  let results = [];
  let allRes = promises.reduce((acc, prom) => {
    acc.then(() => prom).then(res => results.push(res));
  }, Promise.resolve(null));
  return allRes.then(() => results);
}

module.exports = promiseAll;

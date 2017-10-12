/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
function promiseAll(promises) {
  return new Promise( function (resolve, reject) {
    promises.reduce(function (values, prom) {
      // console.log("hello");
      console.log(values);
      Promise.resolve(prom.then(value => (value)));
      return values.concat(prom.then(resolve, reject));
    }, []);
  });
}
// noinspection JSAnnotator
// const p = Promise.resolve(Promise.reject('error'));
// p.catch(error => console.log(error));

console.log([].concat([1, 2]));
promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(
  values => {
    console.log(":hello")
    console.log(values);
  },
  errValue => console.log(`Rejection with ${errValue}`)
);
module.exports = promiseAll;

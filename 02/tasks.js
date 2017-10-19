/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function timer(logger = console.log) {
  for (var i = 0; i < 10; i++) {
    setTimeout(logger.bind(this, i), 100);
  }
}

/*= ============================================ */

/**
 * Создайте собственную реализацию функции bind
 * @param {Function} func передаваемая функция
 * @param {any} context контекст
 * @param {Array<any>} args массив аргументов
 * @return {Function} функция с нужным контекстом
 */
function customBind(func, context, ...args) {
  function myBind(...newArguments) {
    func.apply(context, args.concat(newArguments));
  }
  return myBind;
}

/*= ============================================ */

/**
 * Напишите функцию sum, вычисляющую суммы подобным образом:
 * sum(1)(2)( ) // 3
 * sum(1)(2)(3)( ) // 6
 * sum :: Number -> sum
 * sum :: void -> Number
 */
function sum(x) {
  if (x === undefined) {
    return 0;
  }
  let localSum = x;

  function getSum(value) {
    if (value === undefined) {
      return localSum;
    }
    localSum += value;
    return getSum;
  }
  return getSum;
}

/*= ============================================ */

/**
 * Определите, являются ли строчки анаграммами (например, “просветитель” — “терпеливость”).
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
function anagram(first, second) {
  if (first.length !== second.length) {
    return false;
  }
  let dict = {};

  first.split('')
    .forEach(function(ch) {
      if (dict[ch] !== undefined) {
        ++dict[ch];
      } else {
        dict[ch] = 1;
      }
    });

  return second.split('')
    .every(ch => dict[ch] !== undefined && --dict[ch] >= 0);
}
/*= ============================================ */

/**
 * Сократите массив до набора уникальных значений
 * [1,1, 2, 6, 3, 6, 2] → [1, 2, 3, 6]
 * @param {Array<number>} исходный массив
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getUnique(arr) {
  let isUnique = {};

  return arr.filter(item => {
    if (isUnique[item] === undefined) {
      isUnique[item] = true;
      return true;
    }
    return false;
  }).sort(function(left, right) {
    return (left - right);
  });
}

/**
 * Найдите пересечение двух массивов
 * [1, 3, 5, 7, 9] и [1, 2, 3, 4] → [1, 3]
 * @param {Array<number>, Array<number>} first, second исходные массивы
 * @return {Array<number>} массив значений, отсортированный по возрастанию
 */
function getIntersection(first, second) {
  let inFirst = {};

  first.forEach(function(item) {
    if (inFirst[item] !== undefined) {
      ++inFirst[item];
    } else {
      inFirst[item] = 1;
    }
  });

  return second.filter(item => {
    if (inFirst[item] === undefined) {
      return false;
    }
    return --inFirst[item] >= 0;
  }).sort(function(left, right) {
    return (left - right);
  });
}

/* ============================================= */

/**
 * Две строки называются изоморфными, когда в строке A можно заменить
 * конкретный символ на любой другой для получения строки B. (Расстояние Левенштейна, при возможных мутациях
 * ограничивающихся заменой символа - отличается на 1).
 * Отдельно стоит отметить что строка изоморфна самой себе.
 * Порядок символов должен остаться неизменным. Каждый
 * последовательный символ в строке A сравнивается с
 * каждым последовательным символов в строке B.
 *
 * @param  {string} left
 * @param  {string} right
 * @return {boolean}
 */
function isIsomorphic(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  let flag = true;

  for (let i = 0; i < left.length; ++i) {
    if (left[i] !== right[i]) {
      if (!flag) {
        return false;
      }
      flag = false;
    }
  }

  return true;
}

module.exports = {
  timer,
  customBind,
  sum,
  anagram,
  getUnique,
  getIntersection,
  isIsomorphic
};


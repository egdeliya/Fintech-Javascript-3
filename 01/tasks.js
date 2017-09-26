/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
  let min = Infinity;
  let max = -Infinity;
  let tokens = string.split(' ');

  for (let i = 0; i < tokens.length; i++) {
    let token = parseFloat(tokens[i]);

    if (isNaN(token)) {
      continue;
    }
    if (min > token) {
      min = token;
    }
    if (max < token) {
      max = token;
    }
  }
  return { min, max };
}

/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciSimple(x) {
  if (x === 1 || x === 0) {
    return x;
  }
  return fibonacciSimple(x - 1) + fibonacciSimple(x - 2);
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciWithCache(x) {
  let cache = { 0: 0, 1: 1 };

  function fib(x) {
    if (!(x in cache)) {
      cache[x] = fib(x - 1) + fib(x - 2);
    }
    return cache[x];
  }
  return fib(x);
}

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */
function printNumbers(max, cols) {
  let step = Math.ceil((max + 1) / cols), strNum = step;
  let result = '';

  for (let i = 0; i < strNum; i++) {
    for (let j = i; j <= max; j += step) {
      if (j.toString().length < 2) {
        result += ' ' + j;
      } else {
        result += j;
      }
      if (j + step <= max) {
        result += ' ';
      }
    }
    if (i !== step - 1) {
      result += '\n';
    }
  }
  return result;
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
function rle(input) {
  let result = '', i = 1, counter = 0;

  while (i < input.length) {
    if (input.charAt(i) === input.charAt(i - 1)) {
      counter++;
    } else {
      if (counter === 0) {
        result += input.charAt(i - 1);
      } else {
        result += input.charAt(i - 1) + (counter + 1);
      }
      counter = 0;
    }
    i++;
  }
  if (input.charAt(i - 1) === input.charAt(i - 2)) {
    result += input.charAt(i - 1) + (counter + 1);
  } else {
    result += input.charAt(i - 1);
  }
  return result;
}

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};


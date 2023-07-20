'use strict';
// link: https://ru.hexlet.io/courses/introduction_to_programming/lessons/recursion/theory_unit
// <==|| Вычисление площади поверхности сферы ||==>
/* const surfaceAreaCalculator = (radius) => {
  return 4 * 3.14 * radius * radius;
};

console.log(surfaceAreaCalculator(5)); */

const square = (num) => {
  return num * num;
};
const surfaceAreaCalculator = (radius) => {
  return 4 * 3.14 * square(radius);
};

const surfaceOfMars = surfaceAreaCalculator(3390);
console.log(surfaceOfMars);

// Находим факториал
const factorial = (n) => {
  if (n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

const answer = factorial(3);

console.log(answer);

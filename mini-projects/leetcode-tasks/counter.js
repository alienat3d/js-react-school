'use strict';

var createCounter = function (n) {
  return function () {
    let number = n;
    n += 1;
    return number;
  };
};

const counter = createCounter(10);
counter();
counter();
counter();

console.log(counter());

/**
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */

'use strict';

// * Given a positive integer millis, write an asynchronous function that sleeps for millis milliseconds. It can resolve any value.

/* Example 1:

Input: millis = 100
Output: 100
Explanation: It should return a promise that resolves after 100ms.
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});

Example 2:

Input: millis = 200
Output: 200
Explanation: It should return a promise that resolves after 200ms.

Constraints:

  1 <= millis <= 1000
 */

/*
Explanation:

  1) The sleep function takes a positive integer millis as input.
  2) It then creates a Promise that resolves after millis milliseconds using the setTimeout function.
  3) The Promise is then awaited using the await keyword, which allows the function to pause execution until the Promise is resolved.

If you are not familiar with 'await' then you may use 'return' instead like this:
return new Promise(resolve => setTimeout(resolve, millis)); */

// Using async/await
/* async function exampleAsync() {
  console.log('Start');
  await sleep(1000);
  console.log('End');
} */

// Using plain promises
/* function examplePromise() {
  console.log('Start');
  return sleep(1000).then(function () {
    console.log('End');
  });
} */

// Helper function used by both exampleAsync and examplePromise
/* function sleep(millis) {
  return new Promise(function (resolve) {
    setTimeout(resolve, millis);
  });
} */

// The helper function can also be written like OP's
async function sleep(millis) {
  await new Promise((resolve) => setTimeout(resolve, millis));
}

let t = Date.now();

sleep(200).then(() => console.log(Date.now() - t));
/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */

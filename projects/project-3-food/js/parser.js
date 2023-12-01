'use strict';
const body = document.querySelector('body');
let textNodes = [];

function recursion(element) {
  element.childNodes.forEach(node => {
    if (node.nodeName.match(/^H\d/)) {
      const object = {
        header: node.nodeName,
        content: node.textContent.trim()
      };
      textNodes.push(object);
    } else {
      recursion(node);
    }
  });
}

recursion(body);

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(textNodes)
})
  .then(response => response.json())
  .then(json => console.log(json));
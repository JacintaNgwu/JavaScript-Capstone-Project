const { JSDOM } = require('jsdom');
const { default: commentCounter } = require('./commentCounter.js');

const dom = new JSDOM();
global.document = dom.window.document;

describe('Counter tests', () => {
  test('Counts loaded comments in list', () => {
    const arr = ['apple', 'banana', 'pears'];
    document.body.innerHTML = `
    <ul id="list">
    </ul>
    `;
    const list = document.getElementById('list');
    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i];
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    }
    const count = commentCounter(list);
    expect(count).toBe(3);
  });
  test('Counts loaded comments in list and returns 0 if list.lenght empty', () => {
    const arr = [];
    document.body.innerHTML = `
    <ul id="list">
    </ul>
    `;
    const list = document.getElementById('list');
    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i];
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    }
    const count = commentCounter(list);
    expect(count).toBe(0);
  });
});
const { JSDOM } = require('jsdom');
const { default: itemCounter } = require('./itemCounter.js');

const dom = new JSDOM();
global.document = dom.window.document;

describe('Test count fucn', () => {
  test('Counts the number of dom child element if present', () => {
    const count = [1, 2, 3];
    const h3 = document.createElement('h3');
    itemCounter(h3, count);
    expect(h3.innerHTML).toBe('TVSHOWS <span class="item-counter">3</span>');
  });

  test('Show No TVSHOWS if dom child element not present', () => {
    const count = [];
    const h3 = document.createElement('h3');
    itemCounter(h3, count);
    expect(h3.innerHTML).toBe('No tvshows added');
  });
});

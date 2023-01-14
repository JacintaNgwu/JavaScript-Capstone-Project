const itemCounter = (h3, count) => {
  if (count.length !== 0) {
    h3.innerHTML = `TVSHOWS <span class="item-counter">${count.length}</span>`;
  } else {
    h3.innerHTML = 'No tvshows added';
  }
};

export default itemCounter;

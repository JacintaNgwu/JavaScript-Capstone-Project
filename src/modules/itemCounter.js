/* eslint-disable import/no-cycle */
import getShows from '../index.js';

const itemCounter = async () => {
  const itemCount = document.querySelector('.item-counter');
  const shows = await getShows();
  const showsList = shows[0];
  itemCount.innerHTML = `(${showsList.length})`;
};

export default itemCounter;

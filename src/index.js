import './styles.css';

import { BASE_URL, MOVIE_API } from './modules/api.js';

const showItems = document.querySelector('.show-container');

export async function getShows() {
  const response = await fetch(`${MOVIE_API}`);
  const shows = await response.json();
  return shows;
}

export async function getLikes(showId) {
  const response = await fetch(`${BASE_URL}/likes?item_id=${showId}`);
  const likes = await response.json();
  return likes;
}

export async function updateShowList() {
  const shows = await getShows();

  showItems.innerHTML = '';

  for (const show of shows) {
    const showElement = document.createElement('div');
    showElement.classList.add('show-item');
    showElement.innerHTML = `
    <img class="show-image" src="${show.image.medium}" alt="${show.name}" />
    <div class="details">
    <span class="show-title
    ">${show.name}</span>
    <button class="like-button">
        <svg viewBox="0 0 24 24">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </svg>  
    </button>
    </div>
    <div>
    <button type="submit" class="comment-button">Comment</button>
    </div>`;
    showItems.appendChild(showElement);
  }
}

updateShowList();

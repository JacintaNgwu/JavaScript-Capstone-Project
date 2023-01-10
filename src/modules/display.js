import { BASE_URL, MOVIE_API } from './api.js';

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
    const likes = await getLikes(show.id);
    const showElement = document.createElement('div');
    showElement.classList.add('show-item');
    showElement.innerHTML = `
    <img class="show-image" src="${show.image.medium}" alt="${show.name}" />
    <span class="show-title">${show.name}</span>
    <button class="like-button">
      <svg viewBox="0 0 24 24">
        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
      </svg>
      <span class="like-count">${likes.count}</span>
    </button>
  `;
    showItems.appendChild(showElement);

    const likeButton = showElement.querySelector('.like-button');
    likeButton.addEventListener('click', async () => {
      likes.count += 1;
      likeButton.querySelector('.like-count').textContent = likes.count;
      likeButton.classList.add('liked');
      await fetch(`${BASE_URL}/likes?item_id=${show.id}`, {
        method: 'POST',
        body: JSON.stringify({
          count: likes.count,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  }
}
updateShowList();

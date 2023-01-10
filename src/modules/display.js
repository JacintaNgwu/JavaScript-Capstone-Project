import { BASE_URL, MOVIE_API } from './api.js';

// create new like
export const createLike = async (id) => {
  const response = await fetch(`${BASE_URL}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
  return response;
};

// get likes

export const getLikes = async () => {
  const response = await fetch(`${BASE_URL}/likes`);
  return response.json();
};

// render items

export const renderItems = async () => {
  const response = await fetch(`${MOVIE_API}`);
  const data = await response.json();
  const likes = await getLikes();
  const items = data.map((item) => {
    const like = likes.find((like) => like.item_id === item.id);
    return {
      ...item,
      likes: like ? like.likes : 0,
    };
  });

  const itemsContainer = document.querySelector('.items-container');
  itemsContainer.innerHTML = '';
  items.forEach((item) => {
    itemsContainer.innerHTML += `
        <div class="item">
            <img src="${item.image.medium}" alt="${item.name}" class="item-image
            ">
            <div class="item-info">
                <h2 class="item-title
                ">${item.name}</h2>
                <p class="item-description
                ">${item.summary}</p>
                <div class="item-likes
                ">
                    <button class="like-button" data-id="${item.id}">Like</button>
                    <span class="like-count">${item.likes}</span>
                </div>
            </div>
        </div>
        `;
  });
};

// add event listener to like button

const likeButton = document.querySelector('.like-button');
likeButton.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  await createLike(id);
  renderItems();
});

// initialize

const init = async () => {
  await renderItems();
};

init();

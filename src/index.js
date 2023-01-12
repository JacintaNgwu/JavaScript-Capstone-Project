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

export async function addLike(showId) {
  const response = await fetch(`${BASE_URL}/likes`, {
    method: 'POST',
    body: JSON.stringify({ item_id: showId }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const likes = await response.json();
  return likes;
}

export async function getComments(showId) {
  const response = await fetch(`${BASE_URL}/comments?item_id=${showId}`);
  const comments = await response.json();
  return comments;
}

export async function addComment(showId, name, comment) {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify({ item_id: showId, username: name, comment }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const comments = await response.json();
  return comments;
}

export async function updateShowList() {
  const shows = await getShows();
  showItems.innerHTML = '';
  shows.forEach(async (show) => {
    const showElement = document.createElement('div');
    showElement.classList.add('show-item');
    // get the like count
    const likes = await getLikes(show.id) || { likes: 0 };
    const likeCount = likes.length > 0 ? likes[0].likes : 0;
    showElement.innerHTML = `
    <img class="show-image" src="${show.image.medium}" alt="${show.name}" />
    <div class="details">
    <span class="show-title">${show.name}</span>
    <button class="like-button" data-show-id=${show.id}>
        <svg viewBox="0 0 24 24" fill="white">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </svg>
    </button>
    <span class="like-count">${likeCount}</span>
    </div>
    <div>
    <button  class="comment-button">Comment</button>
    </div>
    `;
    showItems.appendChild(showElement);
    const commentBtn = showElement.querySelector('.comment-button');
    commentBtn.addEventListener('click', () => {
    // comment button
      const tvshow = document.querySelector('.popup');
      const title = document.querySelector('.tv-title');
      title.style.display = 'none';
      showItems.style.display = 'none';
      tvshow.innerHTML = `
       <div class="comment-popup">
       <img class="show-image" src="${show.image.medium}" alt="${show.name}" />
       <button class="close-icon">X</button>
       </div>
        <div class="details">
        <span class="show-title">Title: ${show.name}</span>
        <div class="show-description"><span>DESCRIPTION:</span> ${show.summary}</div>
       <div class="list">
       <ul class="show-genres">
       <li class="rating">Rating: ${show.rating.average}</li>
       <li class="duration">Duration: ${show.runtime} minutes</li>
       <li class="season">Season: ${show.season}</li>
       </ul>
       </div>
        <div class="container"> 
        <div class="comments">
        <h2>Comments</h2>
        <ul class="comment-list">
        <li class="comment-item">
        </ul>
        </div>
        <div class="comment-form">
        <h2 class="add">Add a comment</h2>
        <form>
        <input type="text" id="name" name="name" placeholder="Your name" required>
        <textarea id="comment" name="comment" placeholder="Your comment" required></textarea>
        <button class="comment-btn" type="submit">comment</button>
        </form>
        </div>
        `;
      tvshow.style.display = 'block';
      const closebtn = document.querySelector('.close-icon');
      if (closebtn) {
        closebtn.addEventListener('click', (event) => {
          event.preventDefault();
          title.style.display = 'block';
          tvshow.style.display = 'none';
          showItems.style.display = 'grid';
        });
      }
      const commentbtn = document.querySelectorAll('.comment-btn');
      if (commentbtn) {
        commentbtn.forEach((btn) => {
          btn.addEventListener('click', (event) => {
            event.preventDefault();
            const name = document.querySelector('#name');
            const comment = document.querySelector('#comment');
            const commentlist = document.querySelector('.comment-list');
            const nowDate = new Date();
            const date = `${nowDate.getFullYear()}/${nowDate.getMonth() + 1}/${nowDate.getDate()}`;
            commentlist.innerHTML = `
            <li class="comment-item">
            <span class="creation-date">${date}</span>
            <span class="comment-username">${name.value}:</span>
            <span class="comment-text">${comment.value}</span>
            </li>
            `;
            addComment(show.id, name.value, comment.value);
            getComments(show.id);
            name.value = '';
            comment.value = '';
          });
        });
      }
    });
  });
}
updateShowList();

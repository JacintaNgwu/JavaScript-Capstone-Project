import './styles.css';

import { BASE_URL, MOVIE_API } from './modules/api.js';

const showItems = document.querySelector('.show-container');
const itemCount = document.querySelector('.item-counter');

export async function getLikes(showId) {
  const response = await fetch(
    `${BASE_URL}/likes?item_id=${showId}`,
  );
  const likes = await response.json();
  // console.log(likes);
  return likes;
}

export async function getShows() {
  const response = await fetch(MOVIE_API);
  const items = await response.json();
  // console.log(items);
  const faverite = await getLikes();
  const moviesAndlikes = [items, faverite];
  return moviesAndlikes;
  // eslint-disable-next-line no-use-before-define
  // const likesPromises = items.map((item) => getLikes(item.id));
  // const likes = await Promise.all(likesPromises);
  // return items.map((item, index) => ({ ...item, likes: likes[index].likes }));
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

// getComments
export async function getComments(showId) {
  const response = await fetch(
    `${BASE_URL}/comments?item_id=${showId}`,
  );
  const comments = await response.json();
  return comments;
}

export async function addComment(showId, name, comment) {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify({ item_id: showId, username: name, comment }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return {};
  // const comments = await response.json();
  // return comments;
}

export async function updateShowList() {
  const shows = await getShows();
  const showsList = shows[0];
  const likeList = shows[1];
  itemCount.innerHTML = `(${showsList.length})`;
  showItems.innerHTML = '';
  showsList.forEach(async (show) => {
    const showElement = document.createElement('div');
    showElement.classList.add('show-item');
    // get the like count
    // const likes = await getLikes(show.id) || { likes: 0 };
    // const likeCount = likes.length > 0 ? likes[0].likes : 0;
    // console.log(likeCount);
    showElement.innerHTML = `
    <img class="show-image" src="${show.image.medium}" alt="${show.name}" />
    <div class="details">
    <span class="show-title">${show.name}</span>
    <button class="like-button" data-show-id=${show.id}>
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
      </svg>
    </button>
    ${likeList.find((like) => like.item_id === show.id) ? `<span class="like-count">${likeList.find((like) => like.item_id === show.id).likes}</span>` : ''}
  </div>
  
    <div>
    <button  class="comment-button">Comment</button>
    </div>
    `;
    showItems.appendChild(showElement);
    const likeBtn = showElement.querySelector('.like-button');
    likeBtn.addEventListener('click', async () => {
      // like button
      const { showId } = likeBtn.dataset;
      await addLike(showId);
      const likes = await getLikes(showId);
      let likeCount = likes.length > 0 ? likes[0].likes : 0;
      const likeCountElement = showElement.querySelector('.like-count');
      likeCount += 1;
      likeCountElement.innerHTML = likeCount;
    });

    const commentBtn = showElement.querySelector('.comment-button');
    commentBtn.addEventListener('click', async () => {
      const comments = await getComments(show.id);
      // comment button
      // const commentCount = document.querySelector('.comment-count');
      // eslint-disable-next-line no-use-before-define
      // if (commentCount) {
      //   const comments = await getComments(show.id);
      //   console.log(comments.length);
      //   if (comments) {
      //     commentCount.innerHTML = comments.length;
      //   }
      // }
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
       <li class="season">Status: ${show.status}</li>
       </ul>
       </div>
        <div class="container"> 
        <div class="comments">
        <h2>Comments <span class="comment-count">${comments.length}</span></h2>
        <ul class="comment-list">
        ${comments.map((comment) => `<li class="lists">${comment.creation_date} ${comment.username}: ${comment.comment}</li>`).join('')}
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

      // make the add comment form...
      const commentbtn = document.querySelectorAll('.comment-btn');
      commentbtn.forEach((btn) => {
        btn.addEventListener('click', async (event) => {
          event.preventDefault();
          const name = document.querySelector('#name').value;
          const comment = document.querySelector('#comment').value;
          await addComment(show.id, name, comment);
          const comments = await getComments(show.id);
          const commentCount = document.querySelector('.comment-count');
          commentCount.innerHTML = comments.length;
          const commentList = document.querySelector('.comment-list');
          commentList.innerHTML = '';
          comments.forEach((comment) => {
            const commentItem = document.createElement('li');
            commentItem.classList.add('comment-item');
            const nowDate = new Date();
            const date = `${nowDate.getFullYear()}/${nowDate.getMonth() + 1}/${nowDate.getDate()}`;
            commentItem.innerHTML = `
            <div class="comment">
            <p class="comment-date">${date}</p>
            <p class="comment-name">${comment.username}:</p>
            <p class="comment-text">${comment.comment}</p>
            </div>
            `;
            commentList.appendChild(commentItem);
          });
          document.querySelector('#name').value = ''; document.querySelector('#comment').value = '';
        });
      });
    });
  });
}
updateShowList();

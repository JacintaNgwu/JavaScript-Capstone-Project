/* eslint-disable indent */
import './styles.css';
import { getLikes, addLike } from './modules/likes.js';
import getComments from './modules/comment/getcomment.js';
import addComment from './modules/comment/addcomment.js';
import itemCounter from './modules/itemCounter.js';
// import commentCounter from './modules/comment/commentCounter.js';

const showItems = document.querySelector('.show-container');
// const itemCount = document.querySelector('.item-counter');
const MOVIE_API = 'https://api.tvmaze.com/shows';

getLikes();
addLike();
getComments();
addComment();

const getShows = async () => {
  const response = await fetch(MOVIE_API);
  const items = await response.json();

  const faverite = await getLikes();
  const moviesAndlikes = [items, faverite];
  return moviesAndlikes;
};

export default getShows;

const updateShowList = async () => {
  const shows = await getShows();
  // itemCounter();

  const showsList = shows[0];
  const likeList = shows[1];
  showItems.innerHTML = '';
  showsList.forEach(async (show) => {
    const showElement = document.createElement('div');
    showElement.classList.add('show-item');

    showElement.innerHTML = `
    <img class="show-image" src="${show.image.medium}" alt="${show.name}" />
    <div class="details">
    <span class="show-title">${show.name}</span>
    <button class="like-button" data-show-id=${show.id}>
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
      </svg>
    </button>
    ${
      likeList.find((like) => like.item_id === show.id)
        ? `<span class="like-count">${
            likeList.find((like) => like.item_id === show.id).likes
          }</span>`
        : ''
    }
  </div>

    <div>
    <button  class="comment-button">Comment</button>
    </div>
    `;
    const h3 = document.querySelector('.tv-title');
    showItems.appendChild(showElement);
    const count = document.querySelectorAll('.show-item');
    itemCounter(h3, count);
    const likeBtn = showElement.querySelector('.like-button');
    likeBtn.addEventListener('click', async () => {
      likeBtn.classList.toggle('liked');
      await addLike(show.id);
      updateShowList();
    });

    const commentBtn = showElement.querySelector('.comment-button');
    commentBtn.addEventListener('click', async () => {
      const comments = await getComments(show.id);

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
        <div class="show-description"><span>DESCRIPTION:</span> ${
          show.summary
        }</div>
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
        ${comments
          .map(
            (comment) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              `<li class="lists">${comment.creation_date} ${comment.username}: ${comment.comment}</li>`,
          )
          .join('')}
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

          const commentList = document.querySelector('.comment-list');

          commentList.innerHTML = '';
          comments.forEach((comment) => {
            const commentItem = document.createElement('li');
            commentItem.classList.add('comment-item');
            const nowDate = new Date();
            const date = `${nowDate.getFullYear()}/${
              nowDate.getMonth() + 1
            }/${nowDate.getDate()}`;
            commentItem.innerHTML = `
            <div class="comment">
            <p class="comment-date">${date}</p>
            <p class="comment-name">${comment.username}:</p>
            <p class="comment-text">${comment.comment}</p>
            </div>
            `;
            commentList.appendChild(commentItem);
          });
          // const noOfComments = commentCounter(commentList);
          // commentCount.innerHTML = noOfComments;
          document.querySelector('#name').value = '';
          document.querySelector('#comment').value = '';
        });
      });
    });
  });
};
updateShowList();

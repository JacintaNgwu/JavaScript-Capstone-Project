import './styles.css';
import { createLike, getLikes, renderItems } from './modules/display.js';

const likeButtons = document.querySelectorAll('.like-button');
const likeCount = document.querySelectorAll('.like-count');

const like = async (e) => {
  const id = e.target.dataset.id;
  await createLike(id);
  renderItems();
};

likeButtons.forEach((button) => {
  button.addEventListener('click', like);
});

renderItems();

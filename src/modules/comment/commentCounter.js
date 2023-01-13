import getComments from './addcomment.js';
import commentCount from './selector.js';

const commentCounter = async () => {
  const comments = await getComments();
  commentCount.innerHTML = comments.length;
};

export default commentCounter;

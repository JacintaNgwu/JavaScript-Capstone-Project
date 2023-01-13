/* eslint-disable operator-linebreak */
const BASE_URL =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Y1Ocl2k5LoJdVEhHia5O';

// export const getComments = async (showId) => {
//   const response = await fetch(`${BASE_URL}/comments?item_id=${showId}`);
//   const comments = await response.json();
//   return comments;
// };

const addComment = async (showId, name, comment) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify({ item_id: showId, username: name, comment }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return {};
};

export default addComment;

const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Y1Ocl2k5LoJdVEhHia5O';

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

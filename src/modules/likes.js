/* eslint-disable operator-linebreak */
const BASE_URL =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Y1Ocl2k5LoJdVEhHia5O';

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
  if (response.status === 201) {
    return true;
  }
  throw new Error(
    `Error adding like: ${response.status} ${response.statusText}`,
  );
}
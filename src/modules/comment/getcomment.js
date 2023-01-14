const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Y1Ocl2k5LoJdVEhHia5O';
const getComments = async (showId) => {
  const response = await fetch(`${BASE_URL}/comments?item_id=${showId}`);
  const comments = await response.json();
  return comments;
};

export default getComments;

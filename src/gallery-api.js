import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';
const ACCESS_KEY = 'TAQ-NB8-tmqfm3N8IbiGFLQ1ZCAtpI898kXC2jB4hMY';
export async function fetchImages(query, page) {
  try {
    const response = await axios.get('/search/photos', {
      params: {
        query: query,
        page: page,
        per_page: 12,
        client_id: `${ACCESS_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

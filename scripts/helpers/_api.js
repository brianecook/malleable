import axios from 'axios';

export async function getData(path, params = null) {
  try {
    const response = await axios.get(path, params);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function postData(path, payload) {
  try {
    const response = await axios.post(path, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

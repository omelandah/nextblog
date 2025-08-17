import { AxiosInstance } from 'axios';

export interface FormBlog {
  title: string;
  body: string;
}

export async function getAllPosts(axios: AxiosInstance) {
  try {
    const res = await axios.get('/post');

    return res.data.data || [];
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getPostById(axios: AxiosInstance, id: string) {
  try {
    const res = await axios.get(`/post/${id}`);

    return res.data.data || {};
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function createPost(axios: AxiosInstance, values: FormBlog) {
  try {
    const res = await axios.post(`/post`, {
      ...values,
    });

    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function updatePost(
  axios: AxiosInstance,
  id: string,
  values: FormBlog
) {
  try {
    const res = await axios.put(`/post/${id}`, {
      ...values,
    });

    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function deletePost(axios: AxiosInstance, id: string) {
  try {
    const res = await axios.delete(`/post/${id}`);

    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
}

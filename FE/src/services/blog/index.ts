import axiosInstance from '@/utils/axiosInstance';

export interface FormBlog {
  title: string;
  body: string;
}

export async function getAllPosts() {
  const res = await axiosInstance.get('/post');

  return res.data || [];
}

export async function getPostById(id: string) {
  const res = await axiosInstance.get(`/post/${id}`);

  return res.data || {};
}

export async function createPost(values: FormBlog) {
  const res = await axiosInstance.post(`/post`, {
    ...values,
  });

  return res;
}

export async function updatePost(id: string, values: FormBlog) {
  const res = await axiosInstance.put(`/post/${id}`, {
    ...values,
  });

  return res;
}

export async function deletePost(id: string) {
  const res = await axiosInstance.delete(`/post/${id}`);

  return res;
}

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://quangtienmemories.herokuapp.com/',
});

API.interceptors.request.use((req) => {
  const profile = JSON.parse(localStorage.getItem('profile'));

  // console.log(profile);
  if (profile) {
    // console.log(profile.result);
    // console.log(profile.token);
    req.headers.authorization = `Bearer ${profile.token}`;
    // console.log(req);
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`
  );

export const createPost = (newPost) => API.post('/posts', newPost);

// Update a post by id
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

// Delete a post by id
export const deletePostById = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (id, comment) =>
  API.post(`/posts/${id}/commentPost`, { comment });

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

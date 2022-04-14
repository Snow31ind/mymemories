import * as api from '../api';
import {
  COMMENT_POST,
  CREATE_POST,
  DELETE_POST,
  END_LOADING,
  ERROR,
  FETCH_FORM,
  FETCH_POST,
  FETCH_POSTS,
  FETCH_POSTS_BY_SEARCH,
  LIKE_POST,
  START_LOADING,
  UPDATE_POST,
} from '../constants/actionTypes';

// Action Creators = actions that return functions

export const fetchPosts = (page) => async (dispatch) => {
  // dispatch({ type: FETCH_REQUEST });
  dispatch({ type: START_LOADING });

  try {
    // const { data } = response
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_POSTS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    const errMsg = error.message;
    dispatch({ type: ERROR, errMsg });

    console.log(error.message);
  }
};

export const fetchPost = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    // const { data } = response
    const { data } = await api.fetchPost(id);
    console.log(data);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    const errMsg = error.message;
    dispatch({ type: ERROR, errMsg });
    console.log(error.message);
  }
};

export const fetchForm = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });

  try {
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_FORM, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
    console.log(error);
  }
};

export const fetchPostsBySearch = (searchQuery) => async (dispatch) => {
  // console.log(searchQuery);
  const { search, tags } = searchQuery;
  console.log(search, tags);

  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);
    // console.log(data);

    dispatch({ type: FETCH_POSTS_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    const errMsg = error.message;
    dispatch({ type: ERROR, errMsg });
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  dispatch({ type: START_LOADING });

  try {
    const { data } = await api.createPost(post);
    console.log(`New post: ${data}`);

    dispatch({ type: CREATE_POST, payload: data });

    dispatch({ type: END_LOADING });

    navigate(`/posts/${data._id}`);
  } catch (error) {
    const errMsg = error.message;
    dispatch({ type: ERROR, payload: errMsg });

    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });

  try {
    await api.deletePostById(id);

    dispatch({ type: DELETE_POST, payload: id });
    dispatch({ type: END_LOADING });
  } catch (error) {
    const errMsg = error.message;
    dispatch({ type: ERROR, payload: errMsg });
    console.log(error);
  }
};

export const updatePost = (id, updatedPost, navigate) => async (dispatch) => {
  dispatch({ type: START_LOADING });

  try {
    const { data } = await api.updatePost(id, updatedPost);

    dispatch({ type: UPDATE_POST, payload: data });
    dispatch({ type: END_LOADING });

    navigate(`/posts/${data._id}`);
  } catch (error) {
    const errMsg = error.message;
    dispatch({ type: ERROR, payload: errMsg });

    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  // dispatch({ type: START_LOADING });

  try {
    const updatedPost = await api.likePost(id);

    dispatch({ type: LIKE_POST, payload: updatedPost });
    // dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
    console.log(error);
  }
};

export const commentPost = (id, comment) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(id, comment);

    dispatch({ type: COMMENT_POST, payload: data });

    return data.comments;
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
    console.log(error);
  }
};

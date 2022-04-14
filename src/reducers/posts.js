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

const initialState = {
  loading: false,
  post: null,
  form: null,
  posts: [],
  refreshCount: 0,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING: {
      return { ...state, loading: true };
    }
    case END_LOADING: {
      return { ...state, loading: false };
    }
    case ERROR: {
      const error = action.payload;

      return { ...state, error };
    }
    case FETCH_POSTS: {
      const { posts, currentPage, numberOfPages } = action.payload;

      return { ...state, posts, currentPage, numberOfPages };
    }
    case FETCH_POST: {
      const post = action.payload;

      return { ...state, post };
    }
    case FETCH_FORM: {
      const form = action.payload;

      return { ...state, form };
    }
    case CREATE_POST: {
      const createdPost = action.payload;
      const posts = [...state.posts, createdPost];
      return {
        ...state,
        posts,
      };
    }
    case DELETE_POST: {
      const postId = action.payload;
      const posts = state.posts.filter((post) => post._id !== postId);

      return { ...state, posts };
    }
    case UPDATE_POST: {
      const updatedPost = action.payload;
      const posts = state.posts.map((post) =>
        post._id !== updatedPost ? post : updatedPost
      );

      return { ...state, posts, form: null };
    }
    case FETCH_POSTS_BY_SEARCH: {
      const posts = action.payload;

      return { ...state, loading: false, posts };
    }
    case LIKE_POST: {
      const updatedPost = action.payload;
      const posts = state.posts.map((post) =>
        post._id !== updatedPost._id ? post : updatedPost
      );
      return { ...state, posts, refreshCount: state.refreshCount + 1 };
    }
    case COMMENT_POST: {
      const updatedPost = action.payload;

      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id !== updatedPost._id ? post : updatedPost
        ),
      };
    }
    default:
      return state;
  }
};

export default reducer;

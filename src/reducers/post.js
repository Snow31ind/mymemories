import {
  FETCH_BY_ID_FAIL,
  FETCH_BY_ID_REQUEST,
  FETCH_BY_ID_SUCCESS,
  UPDATE_BY_ID_FAIL,
  UPDATE_BY_ID_REQUEST,
  UPDATE_BY_ID_SUCCESS,
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  post: null,
  error: '',
  refreshCount: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BY_ID_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_BY_ID_SUCCESS: {
      const fetchedPost = action.payload;

      return { ...state, post: fetchedPost, loading: false };
    }
    case FETCH_BY_ID_FAIL: {
      const errMsg = action.payload;

      return { ...initialState, error: errMsg };
    }
    case UPDATE_BY_ID_REQUEST: {
      return { ...state, loading: true };
    }
    case UPDATE_BY_ID_SUCCESS: {
      return { ...initialState, refreshCount: state.refreshCount + 1 };
    }
    case UPDATE_BY_ID_FAIL: {
      const errMsg = action.payload;

      return { ...initialState, error: errMsg };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

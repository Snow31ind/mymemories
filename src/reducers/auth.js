import { AUTH, LOGOUT } from '../constants/actionTypes';

const initialState = {
  authData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH: {
      const data = action.payload;
      if (data) {
        localStorage.setItem('profile', JSON.stringify({ ...data }));
      }
      // console.log(data);
      return { ...state, authData: data };
    }
    case LOGOUT: {
      localStorage.removeItem('profile');
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;

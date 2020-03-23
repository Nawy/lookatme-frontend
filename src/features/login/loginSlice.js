import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const TOKEN_AUTH_NAME = 'AUTH_TOKEN';

export const slice = createSlice({
  name: 'user',
  initialState: {
    authToken: null,
    isLoading: false,
    isFailed: false,
    errorMessage: ""
  },
  reducers: {
    startedLogin: state => {
      state.authToken = null;
      state.isLoading = true;
      state.isFailed = false;
      state.errorMessage = ""
    },
    failedLogin: state => {
      state.authToken = null;
      state.isLoading = false;
      state.isFailed = true;
      state.errorMessage = "Invalid credentials!"
    },
    receivedLogin: (state, action) => {
      state.authToken = action.payload;
      state.isLoading = false;
      state.isFailed = false;
      state.errorMessage = ""
    },
    logoutReceived: (state, action) => {
      state.authToken = null;
      state.isLoading = false;
      state.isFailed = false;
      state.errorMessage = ""
    },
  },
});

export const { startedLogin, failedLogin, receivedLogin, logoutReceived } = slice.actions;

const cookies = new Cookies();

export const loginAsync = (login, password) => dispatch => {
    fetch('http://localhost:3000/api/login', { 
            method: 'POST', 
            body: JSON.stringify({login, password})
      })
      .then(res => res.json())
      .then(response => {
        cookies.set(TOKEN_AUTH_NAME, response.authToken, { path: '/'});
        dispatch(receivedLogin(response.authToken));
      })
      .catch((reason) => dispatch(failedLogin()));
};

export const logoutAsync = (authToken) => dispatch => {
  fetch('http://localhost:3000/api/logout', { 
    method: 'POST', 
    headers: {
      "auth-token": authToken
    }
  })
  .then(res=> {
    cookies.remove(TOKEN_AUTH_NAME, { path: '/'});
    dispatch(logoutReceived());
  })
  .catch((reason) => dispatch(failedLogin()));
}

export const loadTokenAuthCookies = () => dispatch => {
  if (cookies.get(TOKEN_AUTH_NAME) != null) {
    dispatch(receivedLogin(cookies.get(TOKEN_AUTH_NAME)))
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser= state => state.user;

export default slice.reducer;
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    sessionId: null,
    isLoading: false,
    isFailed: false,
    errorMessage: ""
  },
  reducers: {
    startedLogin: state => {
        state.sessionId = null;
        state.isLoading = true;
        state.isFailed = false;
        state.errorMessage = ""
    },
    failedLogin: state => {
        state.sessionId = null;
        state.isLoading = false;
        state.isFailed = true;
        state.errorMessage = "Invalid credentials!"
    },
    receivedLogin: (state, action) => {
      state.sessionId = action.payload;
      state.isLoading = false;
      state.isFailed = false;
      state.errorMessage = ""
    },
  },
});

export const { startedLogin, failedLogin, receivedLogin } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loginAsync = (login, password) => dispatch => {
    fetch('http://localhost:3000/api/login', { 
            method: 'POST', 
            body: JSON.stringify({login, password})
      })
      .then(res => res.json())
      .then(response => {
        dispatch(receivedLogin(response.sessionId))
      })
      .catch((reason) => dispatch(failedLogin()));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser= state => state.user;

export default slice.reducer;
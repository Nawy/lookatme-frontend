import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'articles',
  initialState: {
    list: [],
    isLoading: false,
    isFailed: false,
    errorMessage: ""
  },
  reducers: {
    startedLoadArticles: state => {
        state.isLoading = true;
        state.isFailed = false;
        state.errorMessage = ""
    },
    failedLoadArticles: state => {
        state.isLoading = false;
        state.isFailed = true;
        state.errorMessage = "Connection problem... Can't load articles!"
    },
    receivedArticles: (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
      state.isFailed = false;
      state.errorMessage = ""
    },
  },
});

export const { startedLoadArticles, failedLoadArticles, receivedArticles } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const listArticlesAsync = () => dispatch => {
    fetch('http://localhost:3000/api/article', { method: 'GET' })
      .then(res => res.json())
      .then(response => {
        dispatch(receivedArticles(response))
      })
      .catch((reason) => dispatch(failedLoadArticles()));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectArticles = state => state.articles;

export default slice.reducer;
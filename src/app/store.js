import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import articlesReducer from '../features/articleslist/articlesListSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    articles: articlesReducer
  },
});

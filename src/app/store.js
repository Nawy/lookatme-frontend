import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import articlesReducer from '../features/articles-list/articlesListSlice';
import loginReducer from '../features/login/loginSlice';
import articleEditorReducer from '../features/article-editor/articleEditorSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    articles: articlesReducer,
    user: loginReducer,
    articleEditor: articleEditorReducer
  },
});

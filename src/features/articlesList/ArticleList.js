import React, { useState, useEffect } from 'react';
import Article from '../articles/Article'
import style from './ArticleList.module.css'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectArticles, listArticlesAsync
} from './articlesListSlice';
import commonStyles from '../../Common.module.css';

export function ArticleList() {
  const articles = useSelector(selectArticles);
  const dispatch = useDispatch();

  const listArticles = articles.list.map((article)=>
    <Article title={article.title} content={article.content} key={article.id}></Article>
  );

  useEffect(() => { dispatch(listArticlesAsync()) }, []);

  return (
    <div className={style.articleList}>
        {articles.isFailed && <p className={commonStyles.errorBlock}>{articles.errorMessage}</p>}
        {listArticles}
    </div>
  );
}

export default ArticleList;

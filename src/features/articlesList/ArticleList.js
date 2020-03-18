import React, { useState, useEffect } from 'react';
import Article from '../articles/Article'
import style from './ArticleList.module.css'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectArticles, listArticlesAsync
} from './articlesListSlice';

const text = `
The United States began a new week on Sunday in a profoundly different place than it was seven days ago. русский

Because of the coronavirus pandemic, there would be no Sunday worship in many churches. No “Selection Sunday” for college basketball tournaments. No trips to the library in Los Angeles, or Broadway shows in New York, or visiting Grandma at a Florida nursing home.

`

const title1 = `
In the U.S., the virus has profoundly changed daily life.
`;
export function ArticleList() {
  const articles = useSelector(selectArticles);
  const dispatch = useDispatch();

  const listArticles = articles.list.map((article)=>
    <Article title={article.title} content={article.content} key={article.id}></Article>
  );

  useEffect(() => { dispatch(listArticlesAsync()) }, []);

  return (
    <div className={style.articleList}>
        {listArticles}
        <Article title={title1} content={text}></Article>
        <Article title={title1} content={text}></Article>
        <Article title={title1} content={text}></Article>
    </div>
  );
}

export default ArticleList;

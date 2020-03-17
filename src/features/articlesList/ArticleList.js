import React, { useState } from 'react';
import Article from '../articles/Article'
import style from './ArticleList.module.css'

const text = `
The United States began a new week on Sunday in a profoundly different place than it was seven days ago. русский

Because of the coronavirus pandemic, there would be no Sunday worship in many churches. No “Selection Sunday” for college basketball tournaments. No trips to the library in Los Angeles, or Broadway shows in New York, or visiting Grandma at a Florida nursing home.

`

const title1 = `
In the U.S., the virus has profoundly changed daily life.
`;
export function ArticleList() {


  return (
    <div className={style.articleList}>
        <Article title={title1} content={text}></Article>
        <Article title={title1} content={text}></Article>
        <Article title={title1} content={text}></Article>
    </div>
  );
}

export default ArticleList;

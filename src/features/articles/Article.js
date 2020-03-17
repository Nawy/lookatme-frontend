import React from 'react';
import styles from './Article.module.css';

function Article({title, content}) {
  return (
    <div className={styles.article}>
        <h2>{title}</h2>
        <div>
            <p>{content}</p>
            <p>{content}</p>
            <div className={styles.imgContainer}>
                <img src="https://cdn.britannica.com/02/210202-050-D644C84B/Horyu-ji-Temple-Ikaruga-Nara-Japan-Buddhism.jpg"></img>
                <span className={styles.imgDescription}>Description of this beautiful japanese building</span>
            </div>
            <p>{content}</p>
            <div className={styles.imgContainer + " " + styles.imgLeft}>
                <img src="https://i.pinimg.com/474x/e1/9c/ac/e19cac5d4dbb36f8a0cca1fe2d7e4829.jpg"></img>
                <span className={styles.imgDescription}>LEFT Description of this beautiful japanese building</span>
            </div>
            <p>{content}<b>dsfsf</b></p>
            <div className={styles.imgContainer + " " + styles.imgRight}>
                <img src="https://i.pinimg.com/474x/e1/9c/ac/e19cac5d4dbb36f8a0cca1fe2d7e4829.jpg"></img>
                <span className={styles.imgDescription}>Description of this beautiful japanese building</span>
            </div>
            <div className={styles.imgContainer + " " + styles.imgCenter}>
                <img src="https://i.pinimg.com/474x/e1/9c/ac/e19cac5d4dbb36f8a0cca1fe2d7e4829.jpg"></img>
                <span className={styles.imgDescription}>Description of this beautiful japanese building</span>
            </div>
            <p>{content}</p>
            <p className={styles.barCode}>123456</p>
        </div>
    </div>
  );
}

export default Article;

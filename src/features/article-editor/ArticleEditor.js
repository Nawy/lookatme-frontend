import React, {useState} from 'react';
import style from './ArticleEditor.module.css'

function ArticleEditor(props) {

  const [header, setHeader] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [paragraphsList, setParagraphList] = useState([]);

  const paragraphs = [];

  function handlePress(event) {
      if (event.key == 'Enter' && event.ctrlKey == true) {
        setParagraphList([...paragraphsList, paragraph])
        setParagraph("");
      }
  }

  function handlerHeaderChange(event) {
    setHeader(event.target.value)
  }
  function handlerParagraphChange(event) {
    setParagraph(event.target.value)
  }


  const paragraphsView = paragraphsList.map((value)=>
    <p>{value}</p>
  );

  return (
    <div className={style.articleEditor}>
        <textarea 
            className={style.articleHeaderTextarea} 
            value={header} 
            placeholder="Article's Title" 
            onChange={handlerHeaderChange}></textarea>
        {paragraphsView}
        <textarea 
            className={style.articleContentTextarea} 
            value={paragraph}
            onChange={handlerParagraphChange}
            onKeyPress={handlePress}
            placeholder="Type something..."></textarea>
        <button className={style.loginButton}>Publish</button>
    </div>
  );
}

export default ArticleEditor;

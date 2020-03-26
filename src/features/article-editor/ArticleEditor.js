import React, {useState} from 'react';
import style from './ArticleEditor.module.css'
import FlexTextarea from '../flex-textarea/FlexTextarea';
import map from 'lodash/map';
import { selectUser } from './../login/loginSlice';
import { useSelector, useDispatch } from 'react-redux';
import { publishArticleAsync } from './articleEditorSlice';

import {paragraphsToText, TEXT_TYPE, HEADER_TYPE, IMAGE_TYPE} from '../../utils/paragraphUtils';
import {createNewParagraph} from '../../utils/paragraphEditorUtils';

function ArticleEditor(props) {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [paragraphCount, setParagraphCount] = useState(0);
  const [selectedParagraph, setSelectedParagraph] = useState(0);
  const [paragraphsList, setParagraphList] = useState([
    {
      id: selectedParagraph,
      paragraph: paragraph,
      editor: true,
      type: TEXT_TYPE
    }
  ]);

  function createNewEmptyParagraph(newId, values) {
    return [...values, createNewParagraph(newId, "", true, TEXT_TYPE)];
  }

  function updateParagraph(values, newValue) {
      return map(
          [...values], (currentParagraph) => {
          if (currentParagraph.id === selectedParagraph) {
              return createNewParagraph(currentParagraph.id, newValue, false, TEXT_TYPE)
          } else {
              return currentParagraph;
          }
      });
  }

  function switchEditorTo(editorId, values) {
      return map([...values], 
          (currentParagraph) => {
          if (currentParagraph.id === editorId){
              setParagraph(currentParagraph.paragraph);
              return createNewParagraph(currentParagraph.id, currentParagraph.paragraph, true, TEXT_TYPE);
          } else {
              return createNewParagraph(currentParagraph.id, currentParagraph.paragraph, false, TEXT_TYPE);
          }
      });
  }

  function handlePress(event) {
      if (event.key === 'Enter' && event.ctrlKey === true) {
        // not last
        if (selectedParagraph !== paragraphCount) {
          let selectNextId = selectedParagraph + 1;
          let resultValues = updateParagraph(paragraphsList, event.target.value);
          resultValues = switchEditorTo(selectNextId, resultValues);
          
          setParagraphList(resultValues);
          setSelectedParagraph(selectNextId);
        } else {
          let newId = paragraphCount+1;
          let resultValues = updateParagraph(paragraphsList, event.target.value);
          resultValues = createNewEmptyParagraph(newId, resultValues);
          resultValues = switchEditorTo(newId, resultValues);
          
          setParagraphCount(newId);
          setParagraphList(resultValues);
          setSelectedParagraph(newId);
        }
      }
  }

  function handleClick(value) {
    let resultValues = updateParagraph(paragraphsList, paragraph);
    resultValues = switchEditorTo(value.id, resultValues);
    
    setParagraphList(resultValues);
    setSelectedParagraph(value.id);
  }

  function handlerPostArticle() {
    let resultValues = updateParagraph(paragraphsList);
    setParagraphList(resultValues);

    let content = paragraphsToText(resultValues);
    console.info(title + " - " + content);
    dispatch(publishArticleAsync(user.authToken, title, content));
  }

  const paragraphsView = paragraphsList.map(
    (value) => value.editor ? createEditor(value) : createParagraph(value)
  );

  function createParagraph(value) {
    return (
      <p key={value.id} onClick={() => handleClick(value)}>{value.paragraph}</p>
    )
  }

  function createEditor(value) {

    return (
      <FlexTextarea 
        key={value.id}
        value={value.paragraph}
        style={style.articleContentTextarea}
        onChangeText={(value, e) => setParagraph(value)}
        onKeyPressEvent={handlePress}></FlexTextarea>
  )}

  return (
    <div className={style.articleEditor}>
        <FlexTextarea
          style={style.articleHeaderTextarea}
          onChangeText={(titleValue, e) => setTitle(titleValue)}
          value={title}
          focused="true"
          placeholder="Article's Title"></FlexTextarea>
        {paragraphsView}
        <button className={style.loginButton} onClick={handlerPostArticle}>POST</button>
    </div>
  );
}

export default ArticleEditor;

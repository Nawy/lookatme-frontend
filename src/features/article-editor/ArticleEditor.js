import React, {useState} from 'react';
import style from './ArticleEditor.module.css'
import findIndex from 'lodash/findIndex'
import map from 'lodash/map'

function ArticleEditor(props) {

  const [header, setHeader] = useState("");
  const [paragraphCount, setParagraphCount] = useState(0);
  const [selectedParagraph, setSelectedParagraph] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const [paragraphsList, setParagraphList] = useState([
    {
      id: selectedParagraph,
      paragraph: paragraph,
      editor: true
    }
  ]);

  function updateParagraph(values) {
    return map(
      [...values], (currentParagraph) => {
        if (currentParagraph.id == selectedParagraph) {
          return createNewParagraph(currentParagraph.id, paragraph, false)
        } else {
          return currentParagraph;
        }
      });
  }
  function switchEditorTo(editorId, values) {
    return map([...values], 
      (currentParagraph) => {
        if (currentParagraph.id == editorId){
          setParagraph(currentParagraph.paragraph);
          return createNewParagraph(currentParagraph.id, currentParagraph.paragraph, true);
        } else {
          return createNewParagraph(currentParagraph.id, currentParagraph.paragraph, false);
        }
      });
  }

  function createNewEmptyParagraph(newId, values) {
    return [...values, createNewParagraph(newId, "", true)]
  }
  function handlePress(event) {
      if (event.key == 'Enter' && event.ctrlKey == true) {
        // not last
        if (selectedParagraph != paragraphCount) {
          let selectNextId = selectedParagraph + 1;
          let resultValues = updateParagraph(paragraphsList);
          resultValues = switchEditorTo(selectNextId, resultValues);
          
          setParagraphList(resultValues);
          setParagraph(resultValues[findIndex(resultValues, {id: selectNextId})].paragraph);
          setSelectedParagraph(selectNextId);
        } else {
          let newId = paragraphCount+1;
          let resultValues = updateParagraph(paragraphsList);
          resultValues = createNewEmptyParagraph(newId, resultValues);
          resultValues = switchEditorTo(newId, resultValues);
          
          setParagraphCount(newId);
          setParagraphList(resultValues);
          setSelectedParagraph(newId);
        }
      }
  }

  function handlerHeaderChange(event) {
    let text = event.target;
    calculateTextareaSize(text);
    setHeader(event.target.value)
  }

  function calculateTextareaSize(text) {
    if ( !text )
      return;
    let maxHeight = 1000;

    var adjustedHeight = text.clientHeight;
    if ( !maxHeight || maxHeight > adjustedHeight )
    {
        adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
        if ( maxHeight )
          adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if ( adjustedHeight > text.clientHeight )
          text.style.height = adjustedHeight + "px";
        console.info(adjustedHeight);
    }
  }

  function handlerParagraphChange(event) {
    calculateTextareaSize(event.target);
    setParagraph(event.target.value)
  }

  function handleClick(value) {
    let resultValues = updateParagraph(paragraphsList);
    resultValues = switchEditorTo(value.id, resultValues);
    
    setParagraphList(resultValues);
    setParagraph(value.paragraph);
    setSelectedParagraph(value.id);
  }

  function createNewParagraph(id, text, editor) {
    return {
      id: id,
      paragraph: text,
      editor: editor
    }
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
      <textarea
        key={value.id}
        className={style.articleContentTextarea} 
        value={paragraph}
        onFocus={(event) => calculateTextareaSize(event.target)}
        onChange={handlerParagraphChange}
        onKeyPress={(event) => handlePress(event, value.id)}
        autoFocus
        rows="1"
        placeholder="Type something..."></textarea>
  )}

  return (
    <div className={style.articleEditor}>
        <textarea 
            className={style.articleHeaderTextarea} 
            value={header} 
            placeholder="Article's Title" 
            wrap="hard"
            rows="1"
            onChange={handlerHeaderChange}></textarea>
        {paragraphsView}
        <button className={style.loginButton}>Publish</button>
    </div>
  );
}

export default ArticleEditor;

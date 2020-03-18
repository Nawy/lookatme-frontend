import React from 'react';
import ArticleList from './features/articleslist/ArticleList';
import Login from './features/login/Login';
import Navbar from './features/navbar/Navbar';
import ArticleEditor from './features/article-editor/ArticleEditor';
import { Route, Switch } from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Switch>
        <Route path="/" exact component={ArticleList}/>
        <Route path="/login" component={Login} />
        <Route path="/editor" component={ArticleEditor} />
      </Switch>
    </div>
  );
}

export default App;

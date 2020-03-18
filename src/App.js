import React from 'react';
import ArticleList from './features/articleslist/ArticleList';
import Login from './features/login/Login';
import Navbar from './features/navbar/Navbar';
import { Route } from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Route path="/" exact component={ArticleList}/>
      <Route path="/login" exact component={Login} />
    </div>
  );
}

export default App;

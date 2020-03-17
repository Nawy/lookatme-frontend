import React from 'react';
import ArticleList from './features/articlesList/ArticleList';
import Navbar from './features/navbar/Navbar';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <ArticleList></ArticleList>
    </div>
  );
}

export default App;

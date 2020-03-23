import React, {useEffect} from 'react';
import ArticleList from './features/articles-list/ArticleList';
import Login from './features/login/Login';
import Navbar from './features/navbar/Navbar';
import Dashboard from './features/dashboard/Dashboard';
import ArticleEditor from './features/article-editor/ArticleEditor';
import { loadTokenAuthCookies } from './features/login/loginSlice';
import { useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(loadTokenAuthCookies()) }, []);

  return (
    <div className="app">
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={ArticleList}/>
          <Route path="/login" component={Login} />
          <Route path="/editor" component={ArticleEditor} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

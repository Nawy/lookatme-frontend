import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import style from './Login.module.css'
import { selectUser, loginAsync  } from './loginSlice';

export function Login() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    dispatch(loginAsync(login, password));
  }

  function createWindow() {
    if (user.authToken != null) {
      return <Redirect to="/dashboard" />
    }
    return formRender();
  }

  function formRender() {
    return (
      <div className={style.loginBlock}>
        <h1>Login</h1>
        <input type="text" className={style.loginField} placeholder="Who are you?" value={login} onChange={(e) => setLogin(e.target.value)}></input>
        <input type="password" className={style.loginField} placeholder="Secret word..." value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button className={style.loginButton} onClick={handleLogin}>Come in</button>
      </div>
    );
  }

  return createWindow();
}

export default Login;

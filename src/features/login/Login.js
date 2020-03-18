import React, { useState } from 'react';
import style from './Login.module.css'

export function Login() {

  return (
    <div className={style.loginBlock}>
        <h1>Login</h1>
        <input type="text" className={style.loginField} placeholder="Who are you?"></input>
        <input type="password" className={style.loginField} placeholder="Secret word..."></input>
        <button className={style.loginButton}>Come in</button>
    </div>
  );
}

export default Login;

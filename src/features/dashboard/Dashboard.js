import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import style from './Dashboard.module.css'
import { selectUser, logoutAsync } from './../login/loginSlice';


export function Login() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logoutAsync(user.authToken));
    }
    function createDashboard() {
        if (user.authToken === null) {
            return <Redirect to="/login" />
        }
        return normalDashboard();
    }

    function normalDashboard() {
        return (
            <div className={style.loginBlock}>
                <h1>Dashboard</h1>
                <h3>{user.authToken}</h3>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )
    }

    return createDashboard();
}

export default Login;

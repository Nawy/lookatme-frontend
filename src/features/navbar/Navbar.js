import React from 'react';
import { useSelector } from 'react-redux';
import style from './Navbar.module.css'
import { Link } from "react-router-dom";
import { selectUser } from './../login/loginSlice';

const titleName = "TITLE"

function Navbar({context}) {

  const user = useSelector(selectUser);
  
  return (
    <div>
      <div className={style.navbar}>
          <span>
            <Link to="/" className={style.indexLink}>
              <h1 className={style.navbarTitle}>{titleName}</h1>
            </Link>
          </span>
      </div>
      <div className={style.navbarLeftMenu}>
        <span className={style.navbarBackToTop} onClick={() => window.scrollTo(0, 0)}>
          back to top
          </span>
      </div>
      <div className={style.navbarRightMenu}>
        <Link to="/editor" className={style.leftMenuLink}>+ New</Link>
        {user.authToken != null ?
          <Link to="/dashboard" className={style.leftMenuLink}>Stuur</Link>
          :
          <Link to="/login" className={style.leftMenuLink}>Login</Link>
        }
        
      </div>
    </div>
  );
}

export default Navbar;

import React from 'react';
import style from './Navbar.module.css'
import { Link } from "react-router-dom";

const titleName = "TITLE"

function Navbar({context}) {
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
        Test Text
      </div>
    </div>
  );
}

export default Navbar;

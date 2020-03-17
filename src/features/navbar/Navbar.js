import React from 'react';
import style from './Navbar.module.css'

const titleName = "TITLE"

function Navbar() {
  return (
    <div>
      <div className={style.navbar}>
          <span>
            <h1 className={style.navbarTitle}>{titleName}</h1>
          </span>
      </div>
      <div className={style.navbarLeftMenu}>
        back to top
      </div>
      <div className={style.navbarRightMenu}>
        Test Text
      </div>
    </div>
  );
}

export default Navbar;

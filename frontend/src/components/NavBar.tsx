import { useState } from "react";
import styles from "./NavBar.module.css"
import {Link} from "react-router-dom";

function NavBar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.header_content}>
                <a href="#" className={styles.Logo}> HOCKEY RADAR</a>
                <nav className={`${styles.nav} ${isOpen ? styles["nav--open"] : ""}`}>
                    <ul className={styles.nav_list}>
                        <li className={styles.nav_item}>
                            <Link className={styles.nav_link}to="/">HOME</Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link className={styles.nav_link}to="/search">SEARCH</Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link className={styles.nav_link}to="/about">ABOUT</Link>
                        </li>
                    </ul>
                </nav>

                 <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;

import { useState } from "react";
import styles from "./NavBar.module.css"
import {Link} from "react-router-dom";

function NavBar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.header_content}>
                <Link  className={styles.Logo} to="/"> HOCKEY RADAR</Link>
                <nav className={`${styles.nav} ${isOpen ? styles["nav--open"] : ""}`}>
                    <ul className={styles.nav_list}>
                        <li className={styles.nav_item}>
                            <Link className={styles.nav_link}to="/" onClick={() => setIsOpen(!isOpen)}>HOME</Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link className={styles.nav_link}to="/search" onClick={() => setIsOpen(!isOpen)}>SEARCH</Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link className={styles.nav_link}to="/about" onClick={() => setIsOpen(!isOpen)}>ABOUT</Link>
                        </li>
                    </ul>
                </nav>

                 <div className={`${styles.hamburger} ${isOpen ? styles["hamburger--open"] : ""}`} onClick={() => setIsOpen(!isOpen)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;

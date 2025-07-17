import styles from "./NavBar.module.css"
import {Link} from "react-router-dom";

function NavBar() {

    return (
        <header class={styles.header}>
            <div class={styles.header_content}>
                <a href="#" class={styles.Logo}> HOCKEY RADAR</a>
                <nav className={styles.nav}>
                    <ul class={styles.nav_list}>
                        <li class={styles.nav_item}>
                            <Link class={styles.nav_link}to="/">HOME</Link>
                        </li>
                        <li class={styles.nav_item}>
                            <Link class={styles.nav_link}to="/search">SEARCH</Link>
                        </li>
                        <li class={styles.nav_item}>
                            <Link class={styles.nav_link}to="/about">ABOUT</Link>
                        </li>
                    </ul>
                </nav>

                <div class={styles.hamburger}>
                    <div class={styles.bar}></div>
                    <div class={styles.bar}></div>
                    <div class={styles.bar}></div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;

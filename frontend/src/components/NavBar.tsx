import styles from "./NavBar.module.css"
import {Link} from "react-router-dom";

function NavBar() {

    return (
        <nav className={styles.nav}>
            <ul>
                <li><Link to="/">Hockey Radar</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;

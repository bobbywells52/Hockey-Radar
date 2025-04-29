import { Link } from "react-router-dom";
import styles from './NavBar.module.css';

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}><Link to="/">NHL Radar</Link></div>
            <ul className={styles.navLinks}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/players">Players</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
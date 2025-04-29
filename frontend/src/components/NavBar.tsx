import styles from './NavBar.module.css';

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>NHL Radar</div>
            <ul className={styles.navLinks}>
                <li>Home</li>
                <li>Players</li>
                <li>About</li>
            </ul>
        </nav>
    );
}

export default NavBar;

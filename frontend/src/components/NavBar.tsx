import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    // Close mobile menu if window is resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/" onClick={() => setMenuOpen(false)}>🏒🥅</Link>
            </div>

            <div className={styles.hamburger} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <ul className={`${styles.navLinks} ${menuOpen ? styles.show : ""}`}>
                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/search" onClick={() => setMenuOpen(false)}>Search</Link></li>
                <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;

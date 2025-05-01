import styles from "./NavBar.module.css"
import {Link} from "react-router-dom";

function NavBar() {

    return (
        <nav className={styles.nav}>
            {/*<ul className={styles.sidebar}>*/}
            {/*    <li><Link to="/">🏒🥅</Link></li>*/}
            {/*    <li><Link to="/">Home</Link></li>*/}
            {/*    <li><Link to="/search">Search</Link></li>*/}
            {/*    <li><Link to="/about">About</Link></li>*/}
            {/*    <li>Close</li>*/}
            {/*</ul>*/}
            <ul>
                <li><Link to="/">🏒🥅</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;

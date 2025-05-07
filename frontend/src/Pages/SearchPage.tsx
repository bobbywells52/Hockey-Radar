import styles from "./SearchPage.module.css";
import PlayerSearch from "../components/PlayerSearch.tsx";

function SearchPage() {
    return (
        <div className={styles.searchPage}>
            <PlayerSearch/>
        </div>
    )
}

export default SearchPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PlayerSearch.module.css";
import Players from "../../../Players.json";

function PlayerSearch() {
	const [filteredData, setFilteredData] = useState([]);

	const handleFilter = (event) => {
		const searchWord = event.target.value;
		const newFilter = Players.filter((value) =>
			value.playerName.toLowerCase().includes(searchWord.toLowerCase())
		);

		if (searchWord === "") {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};

	return (
		<div className={styles.searchContainer}>
			<div className={styles.contentWrapper}>
				<div className={styles.searchForm}>
					<h1 className={styles.title}>Search for an active NHL player</h1>

					<div className={styles.searchInputs}>
						<input
							className={styles.input}
							type="text"
							placeholder="Enter Player Name"
							onChange={handleFilter}
						/>

						<div
							className={`${styles.searchResult} ${
								filteredData.length !== 0 ? styles.searchResultVisible : ""
							}`}
						>
							{filteredData.slice(0, 15).map((value) => (
								<Link
									key={value.playerId}
									className={styles.searchItem}
									to={`/player/${value.playerId}`}
								>
									{value.playerName}
								</Link>
							))}
						</div>

						<button type="submit" className={styles.button}>
							SEARCH
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PlayerSearch;

import styles from "./  PlayerCard.module.css";
import {Player} from "../Types.tsx";

interface backCardProps {
    player: Player | null;
    showFront: boolean;
    setShowFront: Function;
}

function BackCard(props: backCardProps) {
    const handleClick = () => {
        props.setShowFront(!props.showFront)
    }
    return (
        <>
            {props.player ? (
                    <div className={styles.cardBack}>
                        <h3>Career Stats</h3>
                        <ul>
                            <li><span className="stat-label">Position:</span> <span
                                className="stat-value">{props.player.position}</span></li>
                            <li><span className="stat-label">Games:</span> <span
                                className="stat-value">{props.player.careerTotals.regularSeason.gamesPlayed}</span></li>
                            <li><span className="stat-label">Goals:</span> <span
                                className="stat-value">{props.player.careerTotals.regularSeason.goals}</span></li>
                            <li><span className="stat-label">Assists:</span> <span
                                className="stat-value">{props.player.careerTotals.regularSeason.assists}</span></li>
                            <li><span className="stat-label">Points:</span> <span
                                className="stat-value">{props.player.careerTotals.regularSeason.points}</span></li>
                        </ul>
                        {props.player.awards.some((award) => award.trophy.default === 'Stanley Cup') && (
                            <span className={styles.cupIcon}>🏆</span>
                        )}

                        <button className={styles.flipButton} onClick={handleClick}>Flip Card</button>

                    </div>) :
                (<p> Loading player</p>
                )} </>

    )
};

export default BackCard;
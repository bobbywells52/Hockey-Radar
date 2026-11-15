import styles from "./  PlayerCard.module.css";
import {Player} from "../Types.tsx";

interface backCardProps {
    player: Player | null;
    showFront: boolean;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    setShowFront: Function;
}

function BackCard(props: backCardProps) {
    const handleClick = () => {
        props.setShowFront(!props.showFront)
    }

    const seasonStats = props.player?.featuredStats?.regularSeason?.subSeason;

    const season = props.player?.featuredStats?.season;

    const seasonLabel = season
	? `${String(season).slice(0, 4)}–${String(season).slice(6)}`
	: null;

    return (
        <div style={{display: 'flex', justifyContent: 'center', padding: '1rem'}}>
            {props.player && seasonStats ? (
                    <div className={styles.cardBack}>
                        <h3>{seasonLabel} Stats</h3>
                        <ul>
                            <li><span className="stat-label">Position:</span> <span
                                className="stat-value">{props.player.position}</span></li>
                            <li><span className="stat-label">Games:</span> <span
                                className="stat-value">{seasonStats.gamesPlayed}</span></li>
                            <li><span className="stat-label">Goals:</span> <span
                                className="stat-value">{seasonStats.goals}</span></li>
                            <li><span className="stat-label">Assists:</span> <span
                                className="stat-value">{seasonStats.assists}</span></li>
                            <li><span className="stat-label">Points:</span> <span
                                className="stat-value">{seasonStats.points}</span></li>
                        </ul>
                        {props.player.awards && props.player.awards.some((award) => award.trophy.default === 'Stanley Cup') && (
                            <span className={styles.cupIcon}>🏆</span>
                        )}

                        <button className={styles.flipButton} onClick={handleClick}>Flip Card</button>

                    </div>) :
                (<p> Loading player</p>
                )} </div>

    )
};

export default BackCard;
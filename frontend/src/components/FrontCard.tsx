import {Player} from "../Types.tsx";
import styles from "./  PlayerCard.module.css"


interface FrontCardProps {
    player: Player | null;
    showFront: boolean;
    setShowFront: Function;
}

function FrontCard(props: FrontCardProps) {

    const handleClick = () => {
        props.setShowFront(!props.showFront)
    }
    return (
        <div style={{display: 'flex', justifyContent: 'center', padding: '1rem'}}>
            {props.player ? (
                    <div className={styles.card}>
                        {/*<Link to={`/player/${props.player.playerId}`} style={{ textDecoration: 'none', color: 'inherit' }}/>*/}
                        <img
                            src={props.player.headshot}
                            alt={`${props.player.firstName.default} ${props.player.lastName.default} headshot`}
                            className={styles.headshot}
                        />
                        <h2 className={styles.name}>
                            {props.player.firstName.default} {props.player.lastName.default}
                        </h2>
                        {props.player.isActive ? (
                            <div>
                                <img
                                    src={props.player.teamLogo}
                                    alt={`${props.player.teamCommonName.default}`}
                                    className={styles.logo}
                                />
                                <h3 className={styles.team}>{props.player.teamPlaceNameWithPreposition.default} {props.player.teamCommonName.default}</h3>
                            </div>) : (<div>
                            <img
                                src={"https://assets.nhle.com/logos/nhl/svg/NHL_light.svg"}
                                alt={"NHL"}
                                className={styles.logo}
                            />
                            <h3 className={styles.team}>Free Agent</h3>
                        </div>)}
                        {<><p className={styles.number}>#{props.player.sweaterNumber}</p>
                            <button className={styles.flipButton} onClick={handleClick}>Flip Card</button>
                        </>}
                    </div>)
                : (
                    <p> Player loading... </p>
                )}
        </div>
    );
}

export default FrontCard;
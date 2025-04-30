import styles from './About.module.css';

function About() {
    return (
        <section className={styles.aboutPage}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>About This App</h1>
                <p className={styles.paragraph}>
                    This NHL Player Stats App lets you explore detailed information about players, including their stats,
                    career highlights, awards, and more. You can search by player name, browse their profiles, and stay up to date
                    with accurate data pulled from NHL APIs.
                </p>
                <p className={styles.paragraph}>
                    Built with React and FastAPI, this app demonstrates full-stack development with live API integration, modern
                    styling, and responsive design. Whether you're a developer, a hockey fan, or both — we hope you find it useful!
                </p>
            </div>
        </section>
    );
}

export default About;

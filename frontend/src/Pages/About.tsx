import styles from './About.module.css';

function About() {
    return (
        <section className={styles.aboutPage}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>About This App</h1>
                <p className={styles.paragraph}>
                   I put on skates at age 4, memorized my multiplication tables using hockey card stats by 10, captained a state championship team by 18,
                    and earned a computer science degree from Tufts University by 22. Now a professional software engineer, this site is the culmination
                    of a lifelong passion for both hockey and statistics.
                </p>
                <p className={styles.paragraph}>
                    Built with React and FastAPI, this app demonstrates full-stack development with live API integration, modern
                    styling, and responsive design. Whether you're a developer, a hockey fan, or both — I hope that you enjoy it!
                </p>
            </div>
        </section>
    );
}

export default About;

// About.jsx
import styles from './About.module.css';

function About() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>About Hockey Radar</h1>
            </header>
            <section className={styles.section}>
                <div className={styles.imageCol}>
                    <img
                        className={styles.aboutImage}
                        src="/aboutPagePicture.jpg"
                        alt="ABOUT HOCKEY RADAR"
                    />
                </div>
                <div className={styles.textCol}>
                    <div className={styles.content}>
                        <h3>A Life Lived Between the Ice and Statistics</h3>
                        <p>
                          My dad put me on skates at age 4, and I never looked back. Obsessed with the game both on and
                          off the ice, by age 10 I was memorizing multiplication tables using stats from the backs of my
                          favorite hockey cards. Before school, I’d pore over numbers on the NHL website—completely hooked
                          on the patterns and stories behind the game.
                        </p>
                        <p>
                            By 22, I graduated from Tufts University with a degree in computer science and mathematics.
                            A lifelong hockey lover and stat-head, Hockey Radar is the product of my athletic, academic,
                            and professional journey. It’s an intuitive, easy-to-use tool for exploring the game through
                            data—and I hope it brings you the same joy and curiosity it would have sparked in my 10-year-old self.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;

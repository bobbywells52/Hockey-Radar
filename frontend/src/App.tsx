import './App.css';
import styles from './App.module.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Home from "./pages/Home.tsx";
import Players from "./pages/Players.tsx";
import About from "./pages/About.tsx";
import PlayerPage from "./pages/PlayerPage";

function App() {
    return (
        <Router>
            <div className={styles.pageContainer}>
                <NavBar />
                <main className={styles.mainContent}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/players" element={<Players />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/player/:id" element={<PlayerPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

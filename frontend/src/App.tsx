import './App.css';
import styles from './App.module.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import PlayerPage from "./pages/PlayerPage";
import PlayerSearch from "./Pages/PlayerSearch.tsx";

function App() {
    return (
        <Router>
            <div className={styles.pageContainer}>
                <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<PlayerSearch />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/player/:id" element={<PlayerPage />} />
                    </Routes>
            </div>
        </Router>
    );
}

export default App;

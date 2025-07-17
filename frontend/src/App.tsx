import './App.css';
import styles from './App.module.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Home from "./Pages/Home.tsx";
import About from "./Pages/About.tsx";
import PlayerPage from "./Pages/PlayerPage";
import SearchPage from "./Pages/SearchPage.tsx";

function App() {
    return (
        <Router>

                <NavBar/>
                <div className={styles.pageContainer}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/player/:id" element={<PlayerPage />} />
                    </Routes>
            </div>
        </Router>
    );
}

export default App;

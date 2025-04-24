import './App.css'
import {useState} from "react";
import PlayerCard from "./components/PlayerCard.tsx";
function App() {

 const [id, setId] = useState(0);

  return (
    <>
        <div>
            <input
                type={'number'}
                value={id}
                onChange={(e) => setId(Number(e.target.value))}
            />
            <PlayerCard playerId={id}></PlayerCard>
        </div>
    </>
  )
}

export default App

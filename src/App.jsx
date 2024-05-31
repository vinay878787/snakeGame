import { useState } from "react";
import GameBoard from "./components/gameBoard/GameBoard";
import Rules from "./components/rules/Rules"
import "./index.css";
function App() {
  const [isRulesVisible , setIsRulesVisible] = useState(false)
  return (
    <>
    <div className="gameContainer">
      <GameBoard />
    </div>
    <button className="rulesBtn" onClick={()=>setIsRulesVisible(true)}>Rules</button>
    {isRulesVisible && <Rules setIsRulesVisible={setIsRulesVisible}/>}
    </>
  );
}

export default App;

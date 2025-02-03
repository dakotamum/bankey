import React,{ useState } from 'react'
import '../App.css'

function StartingPage( {navigateTo, currentPlayerName, changePlayerName} ){

  const [currentInputName, setCurrentInputName] = useState(currentPlayerName);

  const updateInputName = (name) => {
    setCurrentInputName(name)
  }

  return (
    <>
      <div className="page">
        <div className="dialog">
          <div className="prompt">
            What is your name?
          </div>
          <input type="text" id="nameinput" defaultValue={currentPlayerName} onChange={(event) => updateInputName(event.target.value)}></input>
          <button onClick={()=>changePlayerName(currentInputName)}>Join</button>
        </div>
      </div>
    </>
  );
}

export default StartingPage

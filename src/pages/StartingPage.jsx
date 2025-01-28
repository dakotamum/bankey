import React,{ useState } from 'react'
import '../App.css'

function StartingPage( {navigateTo, currentPlayerName, changePlayerName} ){

  const [currentInputName, setCurrentInputName] = useState(currentPlayerName);

  const updateInputName = (name) => {
    setCurrentInputName(name)
  }

  return (
    <>
      <div>
        <div>
          What is your name?
        </div>
        <input type="text" id="nameinput" defaultValue={currentPlayerName} onChange={(event) => updateInputName(event.target.value)}></input>
        <button onClick={()=>changePlayerName(currentInputName)}>submit</button>
      </div>
    </>
  );
}

export default StartingPage

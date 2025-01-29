// import { useState } from 'react'
import '../App.css'

function HomePage( {navigateTo, currentPlayerName, currentOtherPlayers} ){

  return (
    <>
      <div>
        <div>
        Hello {currentPlayerName}!
        </div>
        <div>
          <button onClick={()=> navigateTo("newgamepage")}>
            Start New Game
          </button>
          <button onClick={()=> navigateTo("aboutpage")}>
            About 
          </button>
        </div>
        <div>
          {currentOtherPlayers.map((item, index) => (
            <span key={index}>{item} </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePage

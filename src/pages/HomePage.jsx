// import { useState } from 'react'
import '../App.css'

function HomePage( {navigateTo, currentPlayerName} ){

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
      </div>
    </>
  )
}

export default HomePage

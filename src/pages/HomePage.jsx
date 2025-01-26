// import { useState } from 'react'
import '../App.css'

function HomePage( {navigateTo} ){

  return (
    <>
      <div>
        <div>
          BANKY
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

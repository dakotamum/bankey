// import { useState } from 'react'
import '../App.css'

function NewGamePage( {navigateTo} ){

  return (
    <>
      <div>
        <div>
          Setup New Game
        </div>
        <button onClick={()=> navigateTo("homepage")}>home</button>
      </div>
    </>
  )
}

export default NewGamePage

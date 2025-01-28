import { useState } from 'react'
import HomePage  from './pages/HomePage'
import AboutPage  from './pages/AboutPage'
import NewGamePage  from './pages/NewGamePage'
import StartingPage  from './pages/StartingPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("startingpage")
  const [currentPlayerName, setPlayerName] = useState("ChonkeyDonks");

  const navigateTo = (page) => {
    setCurrentPage(page);
  }

  const changePlayerName = (name) => {
    setPlayerName(name);
    navigateTo("homepage");
  }

  return (
    <>
    {currentPage === "startingpage" && <StartingPage navigateTo={navigateTo} currentPlayerName={currentPlayerName} changePlayerName={changePlayerName}/>}
    {currentPage === "homepage" && <HomePage navigateTo={navigateTo} currentPlayerName={currentPlayerName}/>}
    {currentPage === "newgamepage" && <NewGamePage navigateTo={navigateTo}/>}
    {currentPage === "aboutpage" && <AboutPage navigateTo={navigateTo}/>}
    </>
  )
}

export default App

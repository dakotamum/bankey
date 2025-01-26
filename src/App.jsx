import { useState } from 'react'
import HomePage  from './pages/HomePage'
import AboutPage  from './pages/AboutPage'
import NewGamePage  from './pages/NewGamePage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("homepage")

  const navigateTo = (page) => {
    setCurrentPage(page);
  }

  return (
    <>
    {currentPage === "homepage" && <HomePage navigateTo={navigateTo}/>}
    {currentPage === "newgamepage" && <NewGamePage navigateTo={navigateTo}/>}
    {currentPage === "aboutpage" && <AboutPage navigateTo={navigateTo}/>}
    </>
  )
}

export default App

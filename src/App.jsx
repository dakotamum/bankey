import { useState, useRef } from "react";
import { io } from "socket.io-client";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NewGamePage from "./pages/NewGamePage";
import StartingPage from "./pages/StartingPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("startingpage");
  const [currentPlayerName, setPlayerName] = useState("ChonkeyDonks");
  const [currentOtherPlayers, setCurrentOtherPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const socket = useRef(null); // Ref to persist the socket connection


  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const changePlayerName = (name) => {
    setPlayerName(name);

    // Connect to the WebSocket server only when the player's name changes
    if (!socket.current) {
      socket.current = io("http://localhost:3000", { query: { name }});
        socket.current.on("game-state", (data) => {
          setAllPlayers(data.players);  
        });

        // Listen for any messages from the server
        socket.current.on("connect-other", (data) => {
        setAllPlayers(prev => {
          return [...prev, data.player];
        });
      });

        socket.current.on("disconnect-other", (data) => {
          setAllPlayers(prev => prev.filter(player => player !== data.player));
      });
    }

    navigateTo("homepage");
  };

  return (
    <>
      {currentPage === "startingpage" && (
        <StartingPage
          navigateTo={navigateTo}
          currentPlayerName={currentPlayerName}
          changePlayerName={changePlayerName}
        />
      )}
      {currentPage === "homepage" && (
        <HomePage
          navigateTo={navigateTo}
          currentPlayerName={currentPlayerName}
          allPlayers={allPlayers}
        />
      )}
      {currentPage === "newgamepage" && <NewGamePage navigateTo={navigateTo} />}
      {currentPage === "aboutpage" && <AboutPage navigateTo={navigateTo} />}
    </>
  );
}

export default App;

import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NewGamePage from "./pages/NewGamePage";
import StartingPage from "./pages/StartingPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("startingpage");
  const [currentPlayerName, setPlayerName] = useState("ChonkeyDonks");
  const [isMvp, setIsMvp] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);
  const socket = useRef(null); // Ref to persist the socket connection

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const updateIsMvp = () => {
    if (currentPlayerName === allPlayers[0]) setIsMvp(true);
    else setIsMvp(false);
  };

  useEffect(() => {
    if (allPlayers.length > 0) updateIsMvp();
  }, [allPlayers]);

  const changePlayerName = (name) => {
    setPlayerName(name);

    // Connect to the WebSocket server only when the player's name changes
    if (!socket.current) {
      socket.current = io("http://localhost:3000", { query: { name } });
      socket.current.on("game-state", (data) => {
        setAllPlayers(data.players);
        console.log(allPlayers);
        updateIsMvp();
      });

      // Listen for any messages from the server
      socket.current.on("connect-other", (data) => {
        setAllPlayers((prev) => {
          return [...prev, data.player];
        });
        updateIsMvp();
      });

      socket.current.on("disconnect-other", (data) => {
        setAllPlayers((prev) =>
          prev.filter((player) => player !== data.player)
        );
      });

      updateIsMvp();
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
          isMvp={isMvp}
        />
      )}
      {currentPage === "newgamepage" && <NewGamePage navigateTo={navigateTo} />}
      {currentPage === "aboutpage" && <AboutPage navigateTo={navigateTo} />}
    </>
  );
}

export default App;

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
  const socket = useRef(null); // Ref to persist the socket connection

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const addOtherPlayer = (newPlayer) => {
    setCurrentOtherPlayers(prev => [...prev, newPlayer]);
  }

  const changePlayerName = (name) => {
    setPlayerName(name);

    // Connect to the WebSocket server only when the player's name changes
    if (!socket.current) {
      socket.current = io("http://localhost:3000", { query: { name }}); // Replace with your server URL if deployed

      // Emit the player's name to the server
      // socket.current.emit("connect", { playerName: name });

      // // Handle acknowledgment from the server
      // socket.current.on("connect-ack", (data) => {
      //   console.log("Acknowledged by server:", data);
      // });

      // Listen for any messages from the server
      socket.current.on("connect-other", (data) => {
      setCurrentOtherPlayers(prev => {
        if (!prev.includes(data.player)) {
          return [...prev, data.player];
        }
        return prev;
      });
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
          currentOtherPlayers={currentOtherPlayers}
        />
      )}
      {currentPage === "newgamepage" && <NewGamePage navigateTo={navigateTo} />}
      {currentPage === "aboutpage" && <AboutPage navigateTo={navigateTo} />}
    </>
  );
}

export default App;

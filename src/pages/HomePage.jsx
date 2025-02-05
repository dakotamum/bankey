// import { useState } from 'react'
import "../App.css";

function HomePage({ navigateTo, currentPlayerName, currentOtherPlayers }) {
  return (
    <>
      <div className="page">
        <div
          className="dialog"
          style={{
            gridTemplateRows: "1fr 1fr 1fr",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div
            className="centered-text-box"
            style={{
              gridRow: "1 / 2",
              gridColumn: "1 / span 2",
            }}
          >
            Hello {currentPlayerName}!
          </div>
          <button
            style={{
              gridRow: "2 / 3",
              gridColumn: "1 / 2",
            }}
            onClick={() => navigateTo("newgamepage")}
          >
            Start New Game
          </button>
          <button onClick={() => navigateTo("aboutpage")}>About</button>
          <div
            className="players-list"
            style={{
              gridRow: "2 / span 2",
              gridColumn: "2 / 3",
            }}
          >
            <div className="centered-text-box">Players List</div>
            {currentOtherPlayers.map((item, key) => (
              <div className="centered-text-box" key={key}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

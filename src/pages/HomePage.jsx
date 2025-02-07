import "../App.css";

function HomePage({ navigateTo, currentPlayerName, allPlayers, isMvp }) {
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
          {isMvp && (
            <button
              style={{
                gridRow: "2 / 3",
                gridColumn: "1 / 2",
              }}
              onClick={() => navigateTo("newgamepage")}
            >
              Start New Game
            </button>
          )}
          <button onClick={() => navigateTo("aboutpage")}>About</button>
          <div
            className="players-list-container"
            style={{
              gridRow: "2 / span 2",
              gridColumn: "2 / 3",
            }}
          >
            <div
              className="centered-text-box"
              style={{ backgroundColor: "magenta", top: 0, fontWeight: "bold" }}
            >
              Players List
            </div>
            {allPlayers.map((item, key) => (
              <div
                className="centered-text-box"
                style={{
                  backgroundColor:
                    currentPlayerName === item ? "orange" : "white",
                }}
                key={key}
              >
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

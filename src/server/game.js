import { Server } from "socket.io";

function initializeSocketIO(httpServer) {
  const io = new Server(httpServer);
  const activeClients = {};

  function notifyConnect(socket, newOtherPlayer) {
    for (let id in activeClients) {
      let client = activeClients[id];
      if (socket.id !== id) {
        client.socket.emit("connect-other", {
          player: newOtherPlayer,
        });
      }
    }
  }

  function notifyDisconnect(playerId, player) {
    for (let id in activeClients) {
      let client = activeClients[id];
      if (playerId !== id) {
        client.socket.emit("disconnect-other", {
          player: player
        });
      }
    }
  }

  io.on("connect", function (socket) {
    console.log("Connection established: ", socket.id, "name: ", socket.handshake.query.name);

    // // Create a new player object
    // let newPlayer = Player.create(socket.id);
    activeClients[socket.id] = {
      socket: socket,
      playerName: socket.handshake.query.name
    //   player: newPlayer,
    };

    // Handle client disconnection
    socket.on("disconnect", function () {
      notifyDisconnect(socket.id, activeClients[socket.id].playerName);
      delete activeClients[socket.id];
    });

    // // Handle input messages from the client
    // socket.on("input", function (data) {
    //   inputQueue.push({
    //     id: socket.id,
    //     message: data,
    //   });
    // });


    socket.emit("game-state", {players: Object.values(activeClients).map((client) => client.playerName)});

    // Notify other clients about the new connection
    notifyConnect(socket, socket.handshake.query.name);
  });
}

export function initialize(httpServer) {
  initializeSocketIO(httpServer);
}

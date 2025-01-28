import { Server } from "socket.io";

function initializeSocketIO(httpServer) {
  // Initialize socket.io with the HTTP server
  const io = new Server(httpServer);

  const activeClients = {}; // Keep track of connected clients
  const inputQueue = []; // Process input messages

  function notifyConnect(socket, newPlayer) {
    for (let id in activeClients) {
      let client = activeClients[id];
      if (newPlayer.id !== id) {
        client.socket.emit("connect-other", {
          id: newPlayer.id,
          player: newPlayer,
        });
        socket.emit("connect-other", {
          id: client.player.id,
          player: client.player,
        });
      }
    }
  }

  function notifyDisconnect(playerId) {
    for (let id in activeClients) {
      let client = activeClients[id];
      if (playerId !== id) {
        client.socket.emit("disconnect-other", {
          id: playerId,
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

    // // Notify the client of successful connection
    // socket.emit("connect-ack", {
    //   player: newPlayer,
    // });

    // Handle client disconnection
    socket.on("disconnect", function () {
      delete activeClients[socket.id];
    //   notifyDisconnect(socket.id);
    });

    // // Handle input messages from the client
    // socket.on("input", function (data) {
    //   inputQueue.push({
    //     id: socket.id,
    //     message: data,
    //   });
    // });

    // // Notify other clients about the new connection
    // notifyConnect(socket, newPlayer);
  });
}

export function initialize(httpServer) {
  initializeSocketIO(httpServer);
}

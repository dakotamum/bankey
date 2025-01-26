import livereload from "livereload";
import connectLivereload from "connect-livereload";

import http from "http";
import path from "path";
import fs from "fs";
import express from "express";
import { fileURLToPath } from "url";

// To handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mimeTypes = {
  ".js": "text/javascript",
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp3": "audio/mpeg3",
  ".ttf": "font/ttf",
  ".map": "application/octet-stream",
};

// React build directory
const reactBuildPath = path.join(__dirname, "dist");

// Set up livereload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(reactBuildPath);

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Set up Express application
const app = express();

// Add livereload middleware to inject the livereload script
app.use(connectLivereload());

// Serve static files from the React build directory
app.use(express.static(reactBuildPath));

// Handle all other requests and fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

// Start the server
const port = 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

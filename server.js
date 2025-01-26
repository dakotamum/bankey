import http from "http";
import path from "path";
import fs from "fs";
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

function handleRequest(request, response) {
  const lookup = request.url === "/" ? "/index.html" : decodeURI(request.url);
  const file = path.join(reactBuildPath, lookup);

  fs.access(file, fs.constants.R_OK, (err) => {
    if (!err) {
      fs.readFile(file, (error, data) => {
        if (error) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Server Error!");
        } else {
          const headers = {
            "Content-Type": mimeTypes[path.extname(lookup)] || "application/octet-stream",
            "Access-Control-Allow-Origin": "*",
          };
          response.writeHead(200, headers);
          response.end(data);
        }
      });
    } else {
      // Serve index.html for React routes
      const fallbackFile = path.join(reactBuildPath, "index.html");
      fs.readFile(fallbackFile, (error, data) => {
        if (error) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Server Error!");
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.end(data);
        }
      });
    }
  });
}

const server = http.createServer(handleRequest);

server.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening on port 3000");
});

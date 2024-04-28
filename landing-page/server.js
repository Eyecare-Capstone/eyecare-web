const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Jika URL yang diminta adalah root, kirim file index.html
  if (req.url === "/" || req.url === "/index.html") {
    const indexPath = path.join(__dirname, "index.html");
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end("Page not found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

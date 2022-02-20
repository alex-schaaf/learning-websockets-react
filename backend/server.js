const { WebSocketServer } = require("ws");

const server = new WebSocketServer({ port: 8080 });

server.on("connection", (ws) => {
  setInterval(() => {
    ws.send(
      JSON.stringify({
        temperature: Math.random() * 5 + 60,
        timestamp: new Date(),
      })
    );
  }, 1000);
});

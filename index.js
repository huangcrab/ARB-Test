const app = require("express");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = 5000;

const dealer_log_2 = require("./dealer_log_2.json");
const dealer_ranking_2 = require("./dealer_ranking_2.json");

io.on("connect", socket => {
  socket.emit("drop", [
    {
      id: 0,
      name: "Dealer_log_2",
      data: dealer_log_2
    },
    {
      id: 1,
      name: "Dealer_ranking_2",
      data: dealer_ranking_2
    }
  ]);
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

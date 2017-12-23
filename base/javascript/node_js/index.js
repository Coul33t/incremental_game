var server = require("./server");
var router = require("./router");
var requestHandler = require("./request_handler")
var handle = {};

handle["/"] = requestHandler.start;
handle["/save"] = requestHandler.save;
handle["/leaderboard"] = requestHandler.leaderboard;
handle["/load"] = requestHandler.load;

server.start(router.route, handle);
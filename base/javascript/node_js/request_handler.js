var fs = require("fs");
var querystring = require("querystring");
var url = require("url");

function start(response) {
    console.log("Start called");
    response.setHeader("Access-Control-Allow-Origin","*")
    response.end(response.writeHead(200));
}

function save(response, request) {
    console.log("Save called");
    var params = querystring.parse(url.parse(request.url).query);

    if ('dataname' in params && 'data' in params && 'player' in params) {
        fs.writeFile(params['player'] + '_' + params['dataname'] + '.json', params['data'], 'utf8', function(err) {
            
            if (err) {
                console.log(err);
            }

            else {
                console.log(params['dataname'] + " save succesful.");
            }
        });
    }

    response.setHeader("Access-Control-Allow-Origin","*")
    response.end(response.writeHead(200));
}

function load(response, request) {
    console.log("Load called");
    var params = querystring.parse(url.parse(request.url).query);

    if ('dataname' in params && 'player' in params) {
        fs.readFile(params['player'] + '_' + params['dataname'] + '.json', 'utf8', function(err, data) {
            if (err) {
                console.log("ERROR WHILE LOADING");
                console.log(err);
                response.setHeader("Access-Control-Allow-Origin","*");
                response.end(response.writeHead(418));
            }

            else {
                console.log(params['dataname'] + " loading succesful.");
                response.setHeader("Access-Control-Allow-Origin","*");
                response.writeHead(200, {"Content-type": "application/json"});
                response.end(data);
            }
        });
    }

    else {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.end(response.writeHead(418));
    }


}

function leaderboard(response, request) {
    console.log("Leaderboard called");
    response.setHeader("Access-Control-Allow-Origin","*")
    response.end(response.writeHead(200));
}

exports.start = start;
exports.save = save;
exports.load = load;
exports.leaderboard = leaderboard;

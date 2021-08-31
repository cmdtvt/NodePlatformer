console.log("Server is loading...");
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socket(server);
console.log("Done!")

app.use(express.static('public'));

var levels = {
	"devland":'{"4":{"11":{"name":"sign_1","rotation":0}},"5":{"7":{"name":"tallgrass_tile_1","rotation":0},"8":{"name":"tallgrass_tile_1","rotation":0},"9":{"name":"grass_tile_corner","rotation":0},"10":{"name":"grass_tile_1","rotation":0},"11":{"name":"grass_tile_corner","rotation":90},"16":{"name":"grass_tile_corner","rotation":0},"17":{"name":"grass_tile_corner","rotation":90}},"6":{"6":{"name":"grass_tile_corner","rotation":0},"7":{"name":"grass_tile_1","rotation":0},"8":{"name":"grass_tile_1","rotation":0},"9":{"name":"grass_tile_1","rotation":0},"10":{"name":"grass_tile_1","rotation":0},"11":{"name":"grass_tile_1","rotation":0},"12":{"name":"grass_tile_corner","rotation":90},"16":{"name":"grass_tile_1","rotation":270},"17":{"name":"grass_tile_1","rotation":90}},"7":{"5":{"name":"tallgrass_tile_1","rotation":270},"6":{"name":"grass_tile_1","rotation":270},"7":{"name":"dirt_tile_1","rotation":0},"8":{"name":"dirt_tile_1","rotation":0},"9":{"name":"dirt_tile_1","rotation":0},"10":{"name":"dirt_tile_1","rotation":0},"11":{"name":"dirt_tile_1","rotation":0},"12":{"name":"grass_tile_1","rotation":90},"13":{"name":"tallgrass_tile_1","rotation":90},"16":{"name":"grass_tile_1","rotation":270},"17":{"name":"grass_tile_1","rotation":90}},"8":{"6":{"name":"grass_tile_1","rotation":270},"7":{"name":"dirt_tile_1","rotation":0},"8":{"name":"dirt_tile_1","rotation":0},"9":{"name":"dirt_tile_1","rotation":0},"10":{"name":"dirt_tile_1","rotation":0},"11":{"name":"dirt_tile_1","rotation":0},"12":{"name":"grass_tile_1","rotation":90},"13":{"name":"tallgrass_tile_1","rotation":90},"16":{"name":"grass_tile_1","rotation":270},"17":{"name":"grass_tile_1","rotation":90}},"9":{"5":{"name":"tallgrass_tile_1","rotation":270},"6":{"name":"grass_tile_1","rotation":270},"7":{"name":"dirt_tile_1","rotation":0},"8":{"name":"dirt_tile_1","rotation":0},"9":{"name":"dirt_tile_1","rotation":0},"10":{"name":"dirt_tile_1","rotation":0},"11":{"name":"dirt_tile_1","rotation":0},"12":{"name":"grass_tile_1","rotation":90},"13":{"name":"tallgrass_tile_1","rotation":90},"16":{"name":"grass_tile_1","rotation":270},"17":{"name":"grass_tile_1","rotation":90}},"10":{"5":{"name":"tallgrass_tile_1","rotation":270},"6":{"name":"grass_tile_1","rotation":270},"7":{"name":"dirt_tile_1","rotation":0},"8":{"name":"dirt_tile_1","rotation":0},"9":{"name":"dirt_tile_1","rotation":0},"10":{"name":"dirt_tile_1","rotation":0},"11":{"name":"dirt_tile_1","rotation":0},"12":{"name":"grass_tile_1","rotation":90},"16":{"name":"grass_tile_1","rotation":270},"17":{"name":"grass_tile_1","rotation":90}},"11":{"6":{"name":"grass_tile_corner","rotation":270},"7":{"name":"grass_tile_1","rotation":180},"8":{"name":"grass_tile_1","rotation":180},"9":{"name":"grass_tile_1","rotation":180},"10":{"name":"grass_tile_1","rotation":180},"11":{"name":"grass_tile_1","rotation":180},"12":{"name":"grass_tile_corner","rotation":180},"16":{"name":"grass_tile_corner","rotation":270},"17":{"name":"grass_tile_corner","rotation":180}}}',
	"onetile":'{"8":{"9":{"name":"grass_tile_1","rotation":0}}}',
	"jesseland":'{"2":{"13":{"name":"tallgrass_tile_1","rotation":0}},"3":{"6":{"name":"sign_1","rotation":0},"7":{"name":"tallgrass_tile_1","rotation":0},"9":{"name":"tallgrass_tile_1","rotation":0},"13":{"name":"tallgrass_tile_1","rotation":0}},"4":{"2":{"name":"tallgrass_tile_1","rotation":0},"4":{"name":"sign_1","rotation":0},"5":{"name":"grass_tile_corner","rotation":0},"6":{"name":"grass_tile_1","rotation":0},"7":{"name":"grass_tile_1","rotation":0},"8":{"name":"grass_tile_1","rotation":0},"9":{"name":"grass_tile_1","rotation":0},"10":{"name":"grass_tile_1","rotation":0},"11":{"name":"grass_tile_1","rotation":0},"12":{"name":"grass_tile_1","rotation":0},"13":{"name":"grass_tile_1","rotation":0},"14":{"name":"grass_tile_1","rotation":0}},"5":{"1":{"name":"grass_tile_1","rotation":0},"2":{"name":"grass_tile_1","rotation":0},"3":{"name":"grass_tile_1","rotation":0},"4":{"name":"grass_tile_1","rotation":0},"5":{"name":"dirt_tile_1","rotation":0},"6":{"name":"dirt_tile_1","rotation":0},"7":{"name":"dirt_tile_1","rotation":0},"8":{"name":"dirt_tile_1","rotation":0},"9":{"name":"dirt_tile_1","rotation":0},"10":{"name":"dirt_tile_1","rotation":0},"11":{"name":"dirt_tile_1","rotation":0},"12":{"name":"dirt_tile_1","rotation":0},"13":{"name":"dirt_tile_1","rotation":0},"14":{"name":"dirt_tile_1","rotation":0},"15":{"name":"grass_tile_1","rotation":0},"16":{"name":"grass_tile_1","rotation":0},"17":{"name":"grass_tile_1","rotation":0},"18":{"name":"grass_tile_1","rotation":0},"19":{"name":"grass_tile_1","rotation":0}},"6":{"1":{"name":"dirt_tile_1","rotation":0},"2":{"name":"dirt_tile_1","rotation":0},"3":{"name":"dirt_tile_1","rotation":0},"4":{"name":"dirt_tile_1","rotation":0},"5":{"name":"dirt_tile_1","rotation":0},"6":{"name":"dirt_tile_1","rotation":0},"7":{"name":"dirt_tile_1","rotation":0},"8":{"name":"dirt_tile_1","rotation":0},"9":{"name":"dirt_tile_1","rotation":0},"10":{"name":"dirt_tile_1","rotation":0},"11":{"name":"dirt_tile_1","rotation":0},"12":{"name":"dirt_tile_1","rotation":0},"13":{"name":"dirt_tile_1","rotation":0},"14":{"name":"dirt_tile_1","rotation":0},"15":{"name":"dirt_tile_1","rotation":0},"16":{"name":"dirt_tile_1","rotation":0},"17":{"name":"dirt_tile_1","rotation":0},"18":{"name":"dirt_tile_1","rotation":0},"19":{"name":"dirt_tile_1","rotation":0},"20":{"name":"dirt_tile_1","rotation":0}},"7":{"1":{"name":"dirt_tile_1","rotation":0},"2":{"name":"dirt_tile_1","rotation":0},"3":{"name":"dirt_tile_1","rotation":0},"4":{"name":"dirt_tile_1","rotation":0},"5":{"name":"dirt_tile_1","rotation":0},"6":{"name":"dirt_tile_1","rotation":0},"7":{"name":"stone","rotation":0},"8":{"name":"stone","rotation":0},"9":{"name":"stone","rotation":0},"10":{"name":"stone","rotation":0},"11":{"name":"dirt_tile_1","rotation":0},"12":{"name":"dirt_tile_1","rotation":0},"13":{"name":"dirt_tile_1","rotation":0},"14":{"name":"stone","rotation":0},"15":{"name":"stone","rotation":0},"16":{"name":"stone","rotation":0},"17":{"name":"stone","rotation":0},"18":{"name":"dirt_tile_1","rotation":0},"19":{"name":"dirt_tile_1","rotation":0},"20":{"name":"dirt_tile_1","rotation":0}},"8":{"2":{"name":"dirt_tile_1","rotation":0},"3":{"name":"dirt_tile_1","rotation":0},"4":{"name":"dirt_tile_1","rotation":0},"5":{"name":"stone","rotation":0},"6":{"name":"stone","rotation":0},"7":{"name":"stone","rotation":0},"8":{"name":"stone","rotation":0},"9":{"name":"stone","rotation":0},"10":{"name":"stone","rotation":0},"11":{"name":"stone","rotation":0},"12":{"name":"stone","rotation":0},"13":{"name":"stone","rotation":0},"14":{"name":"stone","rotation":0},"15":{"name":"stone","rotation":0},"16":{"name":"stone","rotation":0},"17":{"name":"stone","rotation":0},"18":{"name":"stone","rotation":0},"19":{"name":"dirt_tile_1","rotation":0},"20":{"name":"dirt_tile_1","rotation":0}},"9":{"2":{"name":"bridge_plank_1","rotation":0},"3":{"name":"stone","rotation":0},"4":{"name":"stone","rotation":0},"5":{"name":"stone","rotation":0},"6":{"name":"stone","rotation":0},"7":{"name":"stone","rotation":0},"8":{"name":"stone","rotation":0},"9":{"name":"stone","rotation":0},"10":{"name":"stone","rotation":0},"11":{"name":"stone","rotation":0},"12":{"name":"stone","rotation":0},"13":{"name":"stone","rotation":0},"14":{"name":"stone","rotation":0},"15":{"name":"stone","rotation":0},"16":{"name":"stone","rotation":0},"17":{"name":"stone","rotation":0},"18":{"name":"stone","rotation":0},"19":{"name":"dirt_tile_1","rotation":0},"20":{"name":"dirt_tile_1","rotation":0}},"10":{"4":{"name":"stone","rotation":0},"5":{"name":"stone","rotation":0},"6":{"name":"stone","rotation":0},"7":{"name":"stone","rotation":0},"8":{"name":"stone","rotation":0},"9":{"name":"stone","rotation":0},"10":{"name":"stone","rotation":0},"11":{"name":"stone","rotation":0},"12":{"name":"stone","rotation":0},"13":{"name":"stone","rotation":0},"14":{"name":"stone","rotation":0},"15":{"name":"stone","rotation":0},"16":{"name":"stone","rotation":0},"17":{"name":"stone","rotation":0},"18":{"name":"bridge_plank_1","rotation":0},"19":{"name":"bridge_plank_1","rotation":0}},"11":{"7":{"name":"stone","rotation":0},"8":{"name":"stone","rotation":0},"9":{"name":"stone","rotation":0},"10":{"name":"stone","rotation":0},"11":{"name":"stone","rotation":0},"12":{"name":"stone","rotation":0},"13":{"name":"stone","rotation":0},"14":{"name":"stone","rotation":0},"15":{"name":"stone","rotation":0},"16":{"name":"stone","rotation":0},"17":{"name":"stone","rotation":0}}}'
}

current_level_json = JSON.parse(levels['jesseland']);
var chat = [];
var clients = {};

console.log("Server is running");

io.sockets.on('connection', newConnection);


function newConnection(socket) {
	console.log("New connection: "+socket.id);

	/*New user creation and authentification*/
	userid = Math.floor(Math.random() * 10000000000000) + 1;
	data = {
		userid : userid,
		world : current_level_json 
	}

	clients[userid] = {}
	io.sockets.emit('newchat', chat);
	io.to(socket.id).emit("handshake",data);
	newServerAlert("User joined to the server!");

	socket.on('chatmessage',newChatMessage);
	socket.on('mouse',mouseMsg);
	socket.on("playerLocation",playerLocation);


	function playerLocation(data) {
		socket.broadcast.emit('players', data);
	}

	function mouseMsg(data) {
		socket.broadcast.emit('mouse', data);
		//io.sockets.emit('mouse',data); // Lähetä msg kaikille clienteille
		//console.log(data);
	}

	function newChatMessage(data) {
		console.log(data);

		if (data["message"].trim().startsWith("/")) {
			command = data["message"].replace('/','');
			command = command.trim();

			if (command == "list") {newServerAlert("There are "+Object.keys(clients).length+" clients online.");}
			if (command == "levels") {newServerAlert("Levels available: "+Object.keys(levels));}
			if (command.startsWith("loadlevel")) {
				tempParts = command.split(" ");

				newServerAlert("Loading level: "+tempParts[1]);
				current_level_json = JSON.parse(levels[tempParts[1]]);
				newServerAlert("Level loaded sending to clients...");

				io.sockets.emit('loadlevel', current_level_json);
			}

		} else {
			chat.push("["+data["playerName"]+"]: "+data["message"]+"\n");
			io.sockets.emit('newchat', chat);
		}
	}

	function newServerAlert(message) {
		chat.push("### [SERVER]: "+message+" ###\n");
		io.sockets.emit('newchat', chat);
	}
}
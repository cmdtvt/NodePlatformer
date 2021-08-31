

var images = {
	"grass_tile_1":"grass_tile.png",
	"grass_tile_corner":"grass_tile_corner_left_up.png",
	"dirt_tile_1":"dirt_tile.png",
	"tallgrass_tile_1":"tallgrass_tile_1.png",
	"sign_1":"sign_tile.png",
	"stone":"stone_tile.png",
	"bridge_plank_1":"bridge_plank.png"


};
var loadedImages = {};
var tile_locations = {};



var grid_offset_x = 0;
var grid_offset_y = 0;
var grid_item_width = 50;
var grid_item_height = 50;

var player_id = 0;
var socket;

var current_level_json = {};
var mouseOnCanvas = false;

var gravity = 0.05;


var worldOffsetX = 0;
var worldOffsetY = 0;
var players = {};

var playerName = "Player";
var player_world_id = 0;
var playerSpeed = 0.2;
var dropping = true;
var playerX = 0;
var playerY = 0;
var image_player;

function setPlayerName() {
	playerName = document.getElementById("playername").value;
}

function sendchat() {
	element = document.getElementById("chatinput");
	chat = element.value;
	console.log(chat);
	var data = {
		playerID : player_id,
		playerName :playerName,
		message : chat
	}
	socket.emit("chatmessage",data);
	element.value = " ";

}

function preload() {
	for(tile in images) {
		loadedImages[tile] = loadImage("tiles/"+images[tile]);
	}
	image_player = loadImage("tiles/player.png")
}

function setup() {
	cnv = createCanvas(1200,700);
	cnv.parent('game');
	angleMode(DEGREES);
	socket = io.connect('137.74.119.216:3000');
	socket.on('newchat',updateChats);
	socket.on('handshake',syncClient);
	socket.on('players',updatePlayers);
	socket.on('loadlevel',loadLevel);
}

function draw() {
	background(179, 245, 255);

	textSize(12);
	text(playerName, 500+25,300-grid_item_height-10);
	textAlign(CENTER);
	image(image_player,500,250,grid_item_width,grid_item_height);

	/*Render other players*/
	for (var key in players) {
		fill(200,0,0);
		tempX = 500;
		tempY = 250;
		tempX = tempX + -players[key]["playerX"]*grid_item_width;
		tempY = tempY + -players[key]["playerY"]*grid_item_height;
		tempX = tempX+worldOffsetX*grid_item_width;// + players[key]["playerX"]*grid_item_width;
		tempY = tempY+worldOffsetY*grid_item_height;// + players[key]["playerY"]*grid_item_height;
		//tempX = tempX + worldOffsetX*grid_item_width;
		//tempY = tempY + worldOffsetY*grid_item_height;
		//console.log("Player at: "+tempX+" : "+tempY);

		textSize(12);
		text(players[key]["playerName"], tempX+25, tempY-10);
		textAlign(CENTER);
		fill(255, 0, 0);
		image(image_player,tempX,tempY,grid_item_width,grid_item_height);
		//rect(tempX,tempY,25,25);
	}

	/*Render the world*/
	for(tile_y in tile_locations) {
		for(tile_x in tile_locations[tile_y]) {
			var x = parseInt(tile_x)+worldOffsetX;
			var y = parseInt(tile_y)+worldOffsetY;
			var tiledata = tile_locations[tile_y][tile_x]
			var tempTile = new Tile(x,y,tiledata['name'],tiledata['rotation']);

			tempTile.draw();
		}
	}

	sendPlayerData()
	keyControl();
	//console.log(getFrameRate());


	

	/*Player logic*/
	dropping = true;

	for (var y in tile_locations) {
		for (var x in tile_locations[y]) {
			centX = 500;
			centY = 250;

			var xcorner = (x*grid_item_width)+worldOffsetX*grid_item_width;
			var ycorner = (y*grid_item_height)+worldOffsetY*grid_item_height;
			console.log(ycorner+" / "+centY);

			if (xcorner < centX && xcorner+grid_item_width > centX ) {
				if (ycorner-grid_item_height < centY && ycorner+grid_item_height > centY) {
					dropping = false;
					console.log("Collide");
				}
			}

			//rect(centX,200,50,50);
			//rect(xcorner,100,50,50);

		}
	}

	if (dropping == true) {
		worldOffsetY -= gravity;
	}
	
}

function keyControl() {
	if (keyIsDown(LEFT_ARROW)) {worldOffsetX += playerSpeed;}
	if (keyIsDown(RIGHT_ARROW)) {worldOffsetX -= playerSpeed;}
	if (keyIsDown(UP_ARROW)) {worldOffsetY += playerSpeed;}
	if (keyIsDown(DOWN_ARROW)) {worldOffsetY -= playerSpeed;}
}

class Tile {
	constructor(x,y,tiletype,rotation) {
		this.grid_x = x;
		this.grid_y = y;
		this.r = 0;
		this.g = 255;
		this.b = 255;
		this.tiletype = tiletype;
		this.rotation = rotation;

		this.image;
		this.image = loadedImages[0];
		for (var i in loadedImages){
			if (i == this.tiletype) {
				this.image = loadedImages[i];
			}
		}
	}

	move(dire) {
		if (dire=="up") {this.grid_y -= 1;}
		if (dire=="down") {this.grid_y += 1;}
		if (dire=="left") {this.grid_x -= 1;}
		if (dire=="right") {this.grid_x += 1;}
	}

	getLocation() {
		return [this.grid_x,this.grid_y];
	}

	draw(){
		push();
		imageMode(CENTER);
		translate(this.grid_x*grid_item_width+grid_item_width/2,this.grid_y*grid_item_height+grid_item_height/2);
		rotate(this.rotation);
		image(this.image,0,0,grid_item_width,grid_item_height);
		


		textSize(12);

		pop();
	}
}


function sendPlayerData() {
	var data = {
		playerID : player_id,
		playerX : worldOffsetX,
		playerY : worldOffsetY,
		playerSpeed : playerSpeed,
		worldid : player_world_id,
		playerName : playerName

	}
	socket.emit("playerLocation",data);	
}

function syncClient(data) {
	player_id = data["userid"];
	tile_locations = data["world"];
	console.log("ID of: "+player_id+" was assigned to you by the server.");
}

function updatePlayers(data) {

	if (!(data["playerID"] in players)) {
		players[data["playerID"]] = data;
		//console.log("First time");
	} else {
		players[data["playerID"]] = data;
		//console.log("Data updated!");
	}
}

function updateChats(data) {
	chatwindow = document.getElementById("chat");
	tempChats = "";
	for (var d in data) {
		tempChats = tempChats + data[d];
	}
	chatwindow.innerHTML = tempChats;
	chatwindow.scrollTop = chatwindow.scrollHeight;
}

function loadLevel(data) {
	console.log("Loading level...");
	tile_locations = data;
}
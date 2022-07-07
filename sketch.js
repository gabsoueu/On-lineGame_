var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player, game;
var playerCount, gameState;
var carro1, carro2, carro1PNG, carro2PNG;
var pista;
var carros;
var allPlayers;
var coinImg, fuelImg;
var fuels, coins;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  carro1PNG = loadImage("assets/car1.png");
  carro2PNG = loadImage("assets/car2.png");
  pista = loadImage("assets/track.jpg");
  coinImg = loadImage("assets/goldCoin.png");
  fuelImg = loadImage("assets/fuel.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.updateState (1);
  }
  if (gameState === 1) {
    game.play ();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

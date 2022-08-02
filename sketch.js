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
var obstaculos;
var pneusImg, conesImg, vidaImg;
var boomImg;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  carro1PNG = loadImage("assets/car1.png");
  carro2PNG = loadImage("assets/car2.png");
  pista = loadImage("assets/track.jpg");
  coinImg = loadImage("assets/goldCoin.png");
  fuelImg = loadImage("assets/fuel.png");
  conesImg = loadImage("assets/obstacle1.png");
  pneusImg = loadImage("assets/obstacle2.png");
  vidaImg = loadImage("assets/life.png");
  boomImg = loadImage("assets/blast.png");
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
  if (gameState === 2) {
    game.end ();
    game.showLeaderboard ();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

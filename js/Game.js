class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leaderboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();
    carro1 = createSprite (width/2, height-100);
    carro1.addImage("car1",carro1PNG);
    carro1.scale = 0.07;

    carro2 = createSprite (width/2 + 100, height-100);
    carro2.addImage("car2",carro2PNG);
    carro2.scale = 0.07;

    carros = [carro1,carro2];

  }

  play() {
    this.handleElements();

    this.reset();

    Player.getPlayersInfo();

    if(allPlayers !== undefined){
      image(pista, 0, -height*5, width, height*6);
      //exibir o placar
      this.showLeaderboard();

      var index = 0;
    //for in => for(variável in objeto)
    for(var plr in allPlayers){
      index = index + 1;
      var x = allPlayers[plr].positionX;
      var y = height - allPlayers[plr].positionY;

      carros[index-1].position.x = x;
      carros[index-1].position.y = y;
      
      if(index === player.index){
        fill ("red");
        ellipse (x,y,60);
        camera.position.y = carros[index-1].position.y;
      }
      this.playerControl();

      drawSprites();
      }
    }
  }

  handleElements(){
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Reiniciar Jogo");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2 + 200, 40);
  
    this.resetButton.class("resetButton");
    this.resetButton.position(width/2 + 200, 100);

    this.leaderboardTitle.html("Placar");
    this.leaderboardTitle.class("resetText");
    this.leaderboardTitle.position(width/3 -60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width/3 -50, 80);
    this.leader2.class("leadersText");
    this.leader2.position(width/3 -50, 130);
  }

  showLeaderboard(){
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if((players[0].rank === 0 && players[1].rank === 0 ||
      players[0].rank ===1)){
      leader1 = 
        players[0].rank +
        "&emsp;" + 
        players[0].name + 
        "&emsp;" +
        players[0].score;

        leader2 = 
        players[1].rank +
        "&emsp;" + 
        players[1].name + 
        "&emsp;" +
        players[1].score;
      }

      if(players[1].rank === 1){
        leader1 = 
        players[1].rank +
        "&emsp;" + 
        players[1].name + 
        "&emsp;" +
        players[1].score;

        leader2 = 
        players[0].rank +
        "&emsp;" + 
        players[0].name + 
        "&emsp;" +
        players[0].score;
      }
      this.leader1.html(leader1);
      this.leader2.html(leader2);
  }

  playerControl(){
    if(keyIsDown(UP_ARROW)){
      player.positionY += 10;
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.positionX > width/3-50){
      player.positionX -= 5;
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW)&& player.positionX < width/2+150){
      player.positionX += 5;
      player.update();
    }
  }

  getState(){
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data){
      gameState = data.val();
    });
  }

  updateState(state){
    database.ref("/").update({
      gameState: state,
    });
  }

  reset(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        gameState:0,
        playerCount:0,
        players:{},
      });
      window.location.reload();
    });
  }

}

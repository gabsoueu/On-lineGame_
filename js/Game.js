class Game {
  constructor() {}

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();
    carro1 = createSprite (width/2, height-100);
    carro1.addImage("car",carro1PNG);
  }

  play() {
    drawSprites();
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

}

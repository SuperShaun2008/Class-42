class Game {
  constructor() { }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200)
    car1.addImage(car1_image)
    car1.debug = "true"
    car2 = createSprite(300, 200)
    car2.addImage(car2_image)
    car2.debug = "true"
    car3 = createSprite(500, 200)
    car3.addImage(car3_image)
    car3.debug = "true"
    car4 = createSprite(700, 200)
    car4.addImage(car4_image)
    car4.debug = "true"
    cars = [car1, car2, car3, car4]
  }

  play() {
    form.hide();
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      var index = 0, x = 100, y = 0
      background(ground)
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5)
      for (var plr in allPlayers) {
        index = index + 1
        x = 100 + (index * 200) + allPlayers[plr].xPos
        y = displayHeight - allPlayers[plr].distance

        cars[index - 1].x = x
        cars[index - 1].y = y

        textAlign(CENTER)
        textSize(20)
        fill(255)
        text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75)


        if (index === player.index) {
          cars[index - 1].shapeColor = "red"
          camera.position.x = displayWidth / 2
          camera.position.y = cars[index - 1].y

          if (cars[index - 1].isTouching(obstacles)) {
            yVel -= 0.9
            S.play()
          }
        }

        //else
        //cars[index-1].shapeColor="black"



      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 50
      yVel += 0.9
      player.update();
    }
    if (keyIsDown(37)) {
      xVel -= 0.2
    }
    if (keyIsDown(39)) {
      xVel += 0.2
    }
    player.distance += yVel
    yVel *= 0.48
    player.xPos += xVel
    xVel *= 0.98
    player.update()
    if (player.distance > displayHeight * 5) {
      gameState = 2
    }
    drawSprites()
  }

  end() {
    console.log("game ended")
  }
}
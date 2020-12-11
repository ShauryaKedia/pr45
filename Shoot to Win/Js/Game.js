class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value", function(data){
            gameState = data.val()
        })
        
    }

    updateState(state){
        database.ref('/').update({
            gameState:state
        })
    }

    async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){ 
                playerCount = playerCountRef.val();
                player.getCount(); 
            }

            form = new Form()
            form.display()

            player1 = createSprite(100,displayHeight/2)
            player1.addImage("player1",soldier1Img)
            player2 = createSprite(displayWidth-100,displayHeight/2)
            //player2.addImage("player2",soldier2Img)

            players=[player1,player2]

            wallGroup = new Group()
            
        }
    }

    play(){
        form.hide()

        image(bgImg,0,0,displayWidth,displayHeight);
        drawSprites();
        Player.getPlayerInfo();

        if(frameCount%50 === 0){
           wall = createSprite(random(50,displayWidth/2-100),random(0,displayHeight-50)) 
           wall.addImage("wall", wallImg)
           wall.scale = 0.5 
           wall.lifetime = 150
           wallGroup.add(wall)
        }

        if(keyDown("space")){
            bullet1 = createSprite(200,200)
            bullet1.x = player1.x
            bullet1.y = player1.y
            bullet1.addImage("bullet1",bullet1Img)
            bullet1.velocityX = 4
        }

        
        
    }
}
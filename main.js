
//factory function for generating players
const Player = (name, symbol) => {
    let ai = false;    

    //commands for ai player
    const playRandomMove = () => {
      let move = Math.floor(Math.random() * Math.floor(9));
      gameBoard.gameState[move] = symbol
      gameBoard.printState()
    }

    const playOptimalMove = () => {

    }

    return {
      name,
      symbol,
      ai,
      playRandomMove
    }
};

//module for controlling the gameboard
const gameBoard = (() => {
    let gameState = ["", "", "", "", "", "", "", "", ""]
    let xTurn = true;

    square = Array.from(document.getElementsByClassName("board-square"));
    
    //print out current state of the game
    const printState = () => {
            gameState.forEach(function(item, index){
            document.getElementById(`square-${index + 1}`).textContent = item
            })
    } 


    //add click eventlistener to squares. Draw symbol of the player whos turn it is
    const activateBtn = () => {
        square.forEach(function(item, index){
        item.addEventListener("click", function(){
        if(gameState[index] === ""){
          console.log(index)
          if(xTurn === true) {
            item.textContent = "X"
            gameState[index] = "X"
            xTurn === true ? xTurn = false : xTurn = true
            promptMsg()
            gameLogic.checkWin()

          }else {
            item.textContent = "O"
            gameState[index] = "O"
            xTurn === true ? xTurn = false : xTurn = true
            promptMsg()
            gameLogic.checkWin()
          } 
        }else{
          console.log("invalid move")
        }

      })
      gameLogic.checkWin()
      })
    }
    //empties current gamestate and prints empty board
    const resetGame = () => {
      const resetBtn = document.getElementById("reset-button")
      resetBtn.addEventListener("click", function(){
      for(x = 0; x < gameState.length; x++){
      gameState[x] = ""
      }
      printState()
      })
    }

    //Shows which players turn it is currently
    const promptMsg = () => {
      const promptText = document.getElementById("promptText")     
      if(xTurn === true){
        promptText.textContent = "Player1's turn"
    } else {
        promptText.textContent = "Player2's turn"  
          }
    }

//Creates a popup message that declares the winner.
const modalPopUp = () => {
  let modal = document.getElementById("modal1");
  let closeBtn = document.getElementById("closeBtn");
  let playAgainBtn = document.getElementById("play-again")

  modal.style.display = 'block';
  
  
  function closeModal(){
  modal.style.display = 'none';
  }

  closeBtn.addEventListener("click", () => {
  modal.style.display = 'none';
  })

  playAgainBtn.addEventListener("click", () => {
    modal.style.display = 'none'
    openStartMenu()
})
}

//Opens a menu to choose settings for the game
const openStartMenu = () => {
  let startMenu = document.getElementById("start-menu")
  startMenu.style.display = 'block'
}



    return {
        printState,
        gameState,
        activateBtn,
        square,
        resetGame,
        promptMsg,
        modalPopUp,
        openStartMenu,
        xTurn
    }  
    
  })();


  const gameLogic = (() => {
    
    let gameState = gameBoard.gameState;
    let xWins = false;
    let oWins = false;
    let player1 = Player(document.getElementById("Player1-name").value, "X")
    let player2 = Player(document.getElementById("Player2-name").value, "O")

    //iterates through all possible winning combos for both players after each move.
    //I feel like should be more DRY here
    const winningCombos = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 4, 6],[0, 4, 8],[2, 4, 6]]
    const checkWin = () => {
      
      let straightO = 0
      for(i = 0; i < winningCombos.length; i++) {
        if(straightO === 3){
          xWins = false;
          oWins = true;
          endGame()
          return true;
        }else{
          straightO = 0
        for(x = 0; x < 3; x++){
        gameState[winningCombos[i][x]] === "O" ? straightO++ : straightO = 0
      }
      }
      }
      let straightX = 0
      for(i = 0; i < winningCombos.length; i++) {
        
        if(straightX === 3){
          oWins = false;
          xWins = true;
          endGame()
          return true;

        }else{
        straightX = 0
        for(x = 0; x < 3; x++){
        gameState[winningCombos[i][x]] === "X" ? straightX++ : straightX = 0
      }
      }
      }

      if(gameState.includes("") === false && oWins === false && xWins === false){
        endGame()
        return true;
      }
          
          

      }


//function for initiating the game based on inputs from the start menu. 
      const startGame = () => {

        const startBtn  = document.getElementById("startBtn")
        startBtn.addEventListener("click", function(){ 
        
        for(x = 0; x < gameState.length; x++){
          gameState[x] = ""
          }
          gameBoard.printState()
          
          document.getElementById("start-menu").style.display = 'none'
          
      })
    }

    //Changes player object values to correct ones.
      const spawnPlayers = () => {
        
        player2.name = document.getElementById("Player1-name").value
        player1.name = document.getElementById("Player2-name").value

        if(document.getElementById("p1real").checked) {
          player1.ai = false 
        }else { 
          player1.ai = true
        }
        
        if(document.getElementById("p2real").checked) {
          player1.ai = false 
        }else { 
          player1.ai = true
        }
        document.getElementById("playerX").textContent = player2.name
        document.getElementById("playerO").textContent = player1.name

      }

      const aiTurn = () => {
        if(player1.ai === true && gameBoard.xTurn === true){
          player1.playRandomMove()
          console.log("asd")
          gameBoard.xTurn = false;
        }

        if(player2.ai === true && gameBoard.xTurn === false)
          player2.playRandomMove()
          gameBoard.xTurn = true;
          console.log("fasd")
        }





      const flowOfGame = () => {
        gameBoard.openStartMenu();
        startGame();
        spawnPlayers();
        gameBoard.resetGame()
        gameBoard.promptMsg()
        gameBoard.activateBtn()
       

      }
      
      //ends the game and prompts a message declaring the winner.
      const endGame = () => {
          if(xWins === true){
            gameBoard.modalPopUp();
            document.getElementById("modalMsg").textContent = "X wins!"
          }else if(oWins === true){
            gameBoard.modalPopUp();
            document.getElementById("modalMsg").textContent = "O wins!"
          }else{
            gameBoard.modalPopUp();
            document.getElementById("modalMsg").textContent = "Draw!"
          }
      }

  return {
    checkWin,
    winningCombos,
    startGame,
    spawnPlayers,
    player1,
    player2,
    aiTurn,
    flowOfGame
  }  


    


})();


gameLogic.flowOfGame()
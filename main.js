const Player = (name, symbol) => {
    const getSymbol = () => symbol;
    const getName  = () => name;
    
};


const gameBoard = (() => {
    let gameState = ["X", "X", "O", "O", "X", "O", "X", "O", "X"]
       function printState(){
           console.log("asd")
            gameState.forEach(function(item, index){
            document.getElementById(`square-${index + 1}`).textContent = item   
        })
    }
       
    return {
        printState: printState
    }  
    

  })();


  const gameLogic = (() => {
    let gameState = []
    const add = (a, b) => a + b;
    return {
      add,
      
    };
  })();
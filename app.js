var TTTApp = angular.module('TTTApp', ["firebase"]) //sets up the angular app 

.controller('TTTController', function ($scope,$firebase){ //sets up the controller
	var gameRef = new Firebase("https://mikettt.firebaseIO.com/databaseGameContainer");
	$scope.remoteGameContainer = $firebase(gameRef);

//Initial cellList to set up board with ng-repeat.

//Declerations for new game
	var wins = [7,56,448,73,146,292,273,84]; //declaring win conditions

  //some firebase shit
	gameRef.once("value", function(dataSnapshot){
    if(!dataSnapshot.val() || dataSnapshot.val().numPlayers == 2){
      $scope.playerNum = 0;
    } 
    else {
      $scope.playerNum = 1;
    }
    console.log("I'm player " + $scope.playerNum);
    // This container object is what gets synced:
    $scope.gameContainer = {
	    cellList: [
        {status:"empty", data: 1},
        {status:"empty", data: 2},
        {status:"empty", data: 4},
        {status:"empty", data: 8},
        {status:"empty", data: 16},
        {status:"empty", data: 32},
        {status:"empty", data: 64},
        {status:"empty", data: 128},
        {status:"empty", data: 256}
      ],
	    clickCounter: $scope.counter,
	    player1Total: 0, // sum of move values
	    player2Total: 0,
	    player1winsCounter: 0,
	    player2winsCounter: 0,
      numPlayers: $scope.playerNum + 1
    };
    $scope.remoteGameContainer.$bind($scope, "gameContainer");
    // Set up everything
    $scope.newGame();
  });

//For some reason, only resets after 2 games 
	$scope.newGame = function () {
		//for loop resetting cellList status and data
		for(i = 0; i < 9; i++){
  		$scope.gameContainer.cellList[i].status = "empty";
  		$scope.gameContainer.cellList[i].data = Math.pow(2,i);
		};
		//Resets previous declerations.
		console.log($scope.gameContainer.cellList[0]);
		$scope.gameContainer.counter = 0;
		$scope.gameContainer.player1Total = 0; //reset player1Total to 0
		console.log("player1 total is " + $scope.gameContainer.player1Total); //test player1Total
		$scope.gameContainer.player2Total = 0;
		console.log("Play again was clicked"); //test
	};


//The game
	$scope.playerAlternator= function (thisCell) { //start of alternator function which switches clicks between users
		//if statement which will check to see if thisCell.status = "empty". If not, bail.
		if (thisCell.status!="empty" || ($scope.gameContainer.counter % 2) != $scope.playerNum){ 
			return;
		}
//otherwise, proceed with the function
		//each time the function repeats (via click), increment the var counter.
		$scope.gameContainer.counter++; 

		//check to see what the previous value was.
		console.log("Cell was: " + thisCell.status); 
		//Player alternator
			if (($scope.gameContainer.counter % 2) != 0) {
				thisCell.status = "X";
				//for loop adding the values of player1 
				$scope.gameContainer.player1Total += thisCell.data;
				console.log("Player 1 total: " + $scope.gameContainer.player1Total);

				//win logic for player 1
					for (i=0; i < wins.length; i++){
						if (($scope.gameContainer.player1Total & wins[i]) == wins[i]) {
							$scope.gameContainer.player1winsCounter++;
							console.log("Player 1 has won " + $scope.gameContainer.player1winsCounter + " times");
								
                //alert player 1 wins
								swal({
									title: "Player 1 wins!",      
									type: "success",   
									confirmButtonText: "Cool",
									imageSize: "200x100" });
							$scope.newGame();
						};
					}
			} 
			else {
				thisCell.status ="O";
				//for loop adding the values of player2
				$scope.gameContainer.player2Total += thisCell.data;
				console.log("Player 2 total: " + $scope.gameContainer.player2Total);
				//win logic for player 2
					for (i=0; i < wins.length; i++){
						if (($scope.gameContainer.player2Total & wins[i])== wins[i]){
							console.log("PLAYER 2 WINS");
							$scope.gameContainer.player2winsCounter++;
							console.log("Player 2 has won " + $scope.gameContainer.player2winsCounter + " times");
							swal({
								title: "Player 2 wins!",     
								type: "success",   
								confirmButtonText: "Cool",
								imageSize: "200x100" });
							$scope.newGame();
						};
					}
			}

//whatever, betch
$scope.goPlayerOne = function () {
    swal({
      title: "Player 1", 
      text: "You get to go first!",
      imageUrl: "images/player1.png",     
      confirmButtonText: "cool"
    });
  };

$scope.goPlayerTwo = function () {
    swal({
      title: "Player 2",   
      text: "Wait for Player 1 to make their move.",
      imageUrl: "images/player2.png",     
      confirmButtonText: "cool"
    });
  };

//check to see cell is X or O
	console.log("This cell is now: " + thisCell.status) ; 
	}
	

});

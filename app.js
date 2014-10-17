var TTTApp = angular.module('TTTApp', ["firebase"]) //sets up the angular app 
.controller('TTTController', function ($scope,$firebase){ //sets up the controller

	$scope.remoteGameContainer = $firebase(new Firebase("https://mikettt.firebaseIO.com/databaseGameContainer")) ;
	$scope.testString = ""; //setting var to test if the app and controller work. if it does, nothing should show up.

	$scope.cellList= [
		{status:"empty", data: 1},
		{status:"empty", data: 2},
		{status:"empty", data: 4},
		{status:"empty", data: 8},
		{status:"empty", data: 16},
		{status:"empty", data: 32},
		{status:"empty", data: 64},
		{status:"empty", data: 128},
		{status:"empty", data: 256}
	];

//(Alternator, player data, win)logics
	//Declerations
	// $scope.gameContainer.counter = 0; //counter for X / O playerAlternator function.
	var player1 = []; //create empty arrary of player1, where numbers will go
	var player2 = []; //create empty array of player2, where numbers will go
	var wins = [7,56,448,73,146,292,273,84]; //declaring win conditions
	$scope.player1winsCounter = 0; //player 1 win counter
	$scope.player2winsCounter = 0; //player 2 win counter
	$scope.thePlayer1Total = 0;
	$scope.thePlayer2Total = 0;


// This container object is what gets synced:
  $scope.gameContainer = {
    cellList: $scope.cellList,
    clickCounter: $scope.counter,
    player1Total: $scope.thePlayer1Total,
    player2Total: $scope.thePlayer2Total,
    player1: player1,
    player2: player2,
    wins: wins
  } ;

  $scope.gameContainer.counter = 0;
  $scope.remoteGameContainer.$bind($scope, "gameContainer");

  $scope.$watch('gameContainer', function() {
    console.log('gameContainer changed!');
  });

 //For some reason, only resets after 2 games 
  $scope.newGame = function () {
  		//resets board
		for(i = 0; i < 9; i++){
		$scope.gameContainer.cellList[i].status="empty";
		$scope.gameContainer.cellList[i].data= Math.pow(2,i);
		};

		console.log($scope.cellList[0]);
		$scope.gameContainer.counter = 0;
		$scope.gameContainer.player1 = 0;
		$scope.gameContainer.player2 = 0;
		$scope.gameContainer.player1Total = 0; //reset player1Total to 0
		console.log("player1 total is " + $scope.gameContainer.player1Total); //test player1Total
		$scope.gameContainer.player2Total = 0;
		console.log("Play again was clicked"); //test
		$scope.gameContainer.counter = 0;
	};


//the game
	$scope.playerAlternator= function (thisCell) { //start of alternator function which switches clicks between users
		if (thisCell.status!="empty"){ //if statement which will check to see if the cell equals null or a value. If it doesn't equal null, BAIL! 
			return;
		}
		//otherwise, proceed with the function
		$scope.gameContainer.counter++; //each time the function repeats (via click), increment the var counter.

		console.log("Cell was: " + thisCell.status) ; //check to see what the previous value was.
			if (($scope.gameContainer.counter % 2) != 0) {
			console.log($scope.gameContainer.counter); //if counter is even after modulo, the cell's status = X. If odd, make it equal O. 
				thisCell.status = "X";
				//player1 data	
				player1.push(thisCell.data); //push said number(data) into player2 array
				console.log(player1); //test to see if this works

				//for loop adding the values of player1 
				$scope.gameContainer.player1Total = 0;
				for (i=0; i< player1.length; i++){
				$scope.gameContainer.player1Total += player1[i]
				};
				console.log("Player 1 total: " + $scope.gameContainer.player1Total);


				//win logic for player 1
					for (i=0; i < wins.length; i++){
						if (($scope.gameContainer.player1Total & $scope.gameContainer.wins[i]) == $scope.gameContainer.wins[i]) {

							$scope.gameEnd = true;

							$scope.player1winsCounter++;
							console.log($scope.gameEnd);
							console.log("Player 1 has won " + $scope.player1winsCounter + " times");
							alert("PLAYER 1 WINS");

						};
					}
				
			} else {
				thisCell.status ="O";
				//player2 data
				console.log($scope.gameContainer.counter);
				player2.push(thisCell.data); //push said number(data) into player2 array
				console.log(player2); //test to see if this works

				//for loop adding the values of player2
				$scope.gameContainer.player2Total = 0;
				for (i=0; i< player2.length; i++){
				$scope.gameContainer.player2Total += player2[i];
				};
				console.log("Player 2 total: " + $scope.gameContainer.player2Total);
				//win logic for player 2
					for (i=0; i < $scope.gameContainer.wins.length; i++){
						if (($scope.gameContainer.player2Total & $scope.gameContainer.wins[i])== $scope.gameContainer.wins[i]){
							console.log("PLAYER 2 WINS");
							$scope.player2winsCounter++;
							console.log("Player 2 has won " + $scope.player2winsCounter + " times");
							alert("PLAYER 2 WINS");
						};
					}
			}
			//check to see cell is X or O
			console.log("This cell is now: " + thisCell.status) ; 

	}
	

});

//reset


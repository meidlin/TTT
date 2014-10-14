var TTTApp = angular.module('TTTApp', []); //sets up the angular app

TTTApp.controller('TTTController', function ($scope){ //sets up the controller

	$scope.testString = ""; //setting var to test if the app and controller work. if it does, nothing should show up.

	$scope.cellList= [
	{status:null, data: 1},
	{status:null, data: 2},
	{status:null, data: 4},
	{status:null, data: 8},
	{status:null, data: 16},
	{status:null, data: 32},
	{status:null, data: 64},
	{status:null, data: 128},
	{status:null, data: 256},
	]

//(Alternator, player data, win)logics
	//Declerations
	$scope.counter = 0; //counter for X / O playerAlternator function.
	player1 = []; //create empty arrary of player1, where numbers will go
	player2 = []; //create empty array of player2, where numbers will go
	wins = [7,56,448,73,146,292,273,84]; //declaring win conditions
	player1winsCounter = 0; //player 1 win counter
	player2winsCounter = 0; //player 2 win counter

	//Changing scope of win counter in order to ng-bind
	$scope.player1winsCounter = player1winsCounter;
	$scope.player2winsCounter = player2winsCounter;

// });

	$scope.playerAlternator= function (thisCell) { //start of alternator function which switches clicks between users
		if (thisCell.status!= null){ //if statement which will check to see if the cell equals null or a value. If it doesn't equal null, BAIL! 
			return;
		}
		//otherwise, proceed with the function
		$scope.counter++; //each time the function repeats (via click), increment the var counter.

		console.log("Cell was: " + thisCell.status) ; //check to see what the previous value was.
			if (($scope.counter % 2) != 0) { //if counter is even after modulo, the cell's status = X. If odd, make it equal O. 
				thisCell.status = "X";
				//player1 data	
				player1.push(thisCell.data); //push said number(data) into player2 array
				console.log(player1); //test to see if this works

				//for loop adding the values of player1 
				player1Total = 0;
				for (i=0; i< player1.length; i++){
				player1Total += player1[i]
				};
				console.log("Player 1 total: " + player1Total);
				//win logic for player 1
					for (i=0; i < wins.length; i++){
						if (player1Total === wins[i]) {
							console.log("PLAYER 1 WINS");
							player1winsCounter++;
							console.log("Player 1 has won " + player1winsCounter + " times");
						};
					}
				
			} else {
				thisCell.status ="O";
				//player2 data
				player2.push(thisCell.data); //push said number(data) into player2 array
				console.log(player2); //test to see if this works

				//for loop adding the values of player2
				player2Total = 0;
				for (i=0; i< player2.length; i++){
				player2Total += player2[i];
				};
				console.log("Player 2 total: " + player2Total);
				//win logic for player 2
					for (i=0; i < wins.length; i++){
						if (player2Total === wins[i]){
							console.log("PLAYER 2 WINS");
							player2winsCounter++;
							console.log("PLayer 2 has won " + player2winsCounter + " times");
						};
					}
			}
			//check to see cell is X or O
			console.log("This cell is now: " + thisCell.status) ; 
	}

});

//play again Logic
function playAgain(){
    y=confirm("Play again??");
    if(y==true){
        alert("Everyday I see my dream");
        location.reload(true);//reloads the entire page
    }
    else{
alert("bye");
    }
}

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

//Alternator Logic + Pushing specific numbers into player1 & player2 arrays. 
	$scope.counter = 0; //declaring global var counter for the upcoming f(x) payerAlternator.

//adding the player1 player 2 totals	
	player1 = []; //create empty arrary of player1, where numbers will go
	player2 = []; //create empty array of player2, where numbers will go


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


			}
			else{
				thisCell.status ="O";
				//player2 data
				player2.push(thisCell.data); //push said number(data) into player2 array
				console.log(player2); //test to see if this works
				
			}
			console.log("This cell is now: " + thisCell.status) ; //check to see if it changed the status of the cell properly
			

			
			//for loop adding the values of player1 
			player1Total = 0;
			for (i=0; i< player1.length; i++){
			player1Total += player1[i];
			};
			console.log("Player 1 total: " + player1Total);
			
			//for loop adding the values of player2
			player2Total = 0;
			for (i=0; i< player2.length; i++){
			player2Total += player2[i];
			console.log("Player 2 total: " + player2Total);
			};

	}

});

			



//Win Logic 
wins = [7,56,448,73,146,292,273,84];



//play again Logic
function playAgain(){
    y=confirm("Play again??");// confirm will show a popup box with the values "OK" or "CANCEL", choosing ok will yield the value "true" to y, otherwise, false.
    if(y==true){
        alert("Everyday I see my dream");
        location.reload(true);//We reload the page automatically! Yeah, with all that crazy animation at the beginning.
    }
    else{
alert("bye");//Don't want to quit? Prepare for a world of pain. This one I did not cover.
    }
}

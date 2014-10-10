var TTTApp = angular.module('TTTApp', []); //sets up the angular app

TTTApp.controller('TTTController', function ($scope){ //sets up the controller

	$scope.testString = ""; //setting var to test if the app and controller work. if it does, nothing should show up.

	$scope.cellList = [
	{status: "0"},
	{status: "1"},
	{status: "2"},
	{status: "3"},
	{status: "4"},
	{status: "5"},
	{status: "6"},
	{status: "7"},
	{status: "8"}
	] ;

	$scope.counter = 0; //declaring global var counter for the upcoming f(x) payerAlternator.

	$scope.playerAlternator= function (thisCell) { //start of alternator function which switches clicks between users
		if (thisCell.status=="X" || thisCell.status=="O"){ //if statement which will check to see if the cell equals X or O. If it does, BAIL! 
			return;
		}
		//otherwise, proceed with the function
		$scope.counter++; //each time the function repeats (via click), increment the var counter.
		console.log("Cell was: " + thisCell.status) ; //check to see what the previous value was.
			if (($scope.counter % 2) !=0) { //if counter is even after modulo, the cell's status = X. If odd, make it equal O. 
				thisCell.status = "X";
			}
			else{
				thisCell.status = "O";
			}
			console.log("This cell is now: " + thisCell.status) ; //check to see if it changed the status of the cell properly
	}
});
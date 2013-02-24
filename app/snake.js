
	// indicateds if the game is started or not 
	// if(isNaN(isDisplayed))  // if it is undefined
	 var isDisplayed = 0;

	// constructor for board game
	function board(){
		   this.level = 0;
		   this.score = 0;
		   this.currentX =  Math.floor(Math.random()*20) ;
		   this.currentY =  Math.floor(Math.random()*20) ;
		   this.col = 20;
		   this.row = 20;
		   this.total =  this.col*this.row;
		   this.grids = new Array();
		 

		   for (var i = 0;  i <  this.total; ++i) {
		   	this.grids[i] = 0;
		   };


		   this.setX = function(X){
		   	this.currentX = X;
		   }

		   this.setY = function(Y){
		   	this.currentY = Y;
		   }

		   this.returnX = function(){
		   	return this.currentX;
		   }

		   this.returnY = function(){
		   	return this.currentY;
		   }

		   this.getGrids = function()
		   {
		       return this.grids;
		   }

		   this.clear = function()
		   {
		   	 for (var i = 0;  i <  this.total; ++i) {
		   		this.grids[i] = 0;
		  	 };
		   		this.grids.length = 0;
		   }
	}

	function drawRandom(URL)
	{
		console.log("draw random run");
		$("#canvasAB").drawImage({
		   // source: URL,
		  source: "http://www.google.com/images/errors/logo_sm.gif",
		  x: 50, y: 50,
		  width: 100,
		  height: 100,
		  fromCenter: false
		});
		console.log("draw random run2");
	}

	// Converts image to canvas; returns new canvas element
	// function convertImageToCanvas(image) {
 //  	var canvas = document.createElement("canvas");
 //  	canvas.width = image.width;
 //  	canvas.height = image.height;
 //  	canvas.getContext("2d").drawImage(image, 0, 0);

	//   return canvas;
	// }

	function display(){

		console.log("display() run");
		console.log("board:\n"+game.getGrids());

 		drawRandom('http://www.google.com/images/errors/logo_sm.gif');
		
		console.log(game.returnX());
		console.log(game.returnY());

		for (var i = 0;  i  < game.returnX();  ++i) {
			for (var j = 0;  j < game.returnY();  ++j) {
			// document.getElementById("board").innerHTML = 
				if(game.getGrids[i*20 + j] == 1)
				{
					// $("board").innerHTML = 
					// "<div class=\"thumbContainer\"> <img src=\"thumb.png\" /><br/>";
					console.log("->>>>>> RUN");
					// drawRandom('http://www.google.com/images/errors/logo_sm.gif');
				}
			}
		}
	}

	function showHead(){
		console.log("isDisplayed = 1");
		isDisplayed = 1;
		
		// var sRow = Math.floor(Math.random()*20) ;
		// var sCol = Math.floor(Math.random()*20) ;
		var sRow = 10;
		var sCol = 10;

		game.setX(sRow);
		game.setY(sCol);

		console.log(sRow * 20  + sCol);
		game.grids[sRow * 20  + sCol]  = 1;

		display();
	}

	function clearGame(){
		console.log("isDisplayed = 0"); 
		isDisplayed = 0;

		game.clear()
		$('#board').empty();
		display();
	}

	function move (direction) {
		// game
	}


	function buttonListener(){
		var steps = 0;
		console.log("isDisplayed value ->" + isDisplayed);
		if(isDisplayed == 1){
			$("body").keydown(function(event) {
			// arrow = {left: 37, up: 38, right: 39, down: 40, enter:13, esc: 27 },
			// console.log("Event"+event);
				if(event.which == 37) // left
				{
					console.log('left');
					// console.log('isDisplayed'+isDisplayed);
					steps++;
				}
				else if(event.which == 38) // up
				{
					console.log('up');
					steps++;
				}
				else if(event.which == 39) // right
				{
					console.log('right');
					steps++;
				}
				else if(event.which == 40) // down
				{
					console.log('Down');
					steps++;
				}
				else
				{
					// nothing
					//console.log(event.which+'nothing');   
				}
			       }) // end of keydown 
		} // end of isDisplay
       	     };// end of button listener

       	   // ready function
	  $(document).ready(function() {

		game = new board();
		// display the board
		console.log("board:\n"+game.getGrids());
  		// Handler for .ready() called.
  		$("#play").click(function(){showHead()});
		
  		$("#play").click(function(){drawRandom(URL)});
		$("#clear").click(function(){clearGame()});
		$("body").click(function(){buttonListener()});	
		$("#canvasAB").drawImage({
		   // source: URL,
		  source: "http://www.google.com/images/errors/logo_sm.gif",
		  x: 50, y: 50,
		  width: 100,
		  height: 100,
		  fromCenter: false
		});	
	});
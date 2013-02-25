
  function Snake(x,y,speed,context,dir){
  	
  	this.foods = new Array();
  	this.speed = speed;
  	this.context = context;
  	this.width = 10;
  	this.height = 10;
  	this.x = x;
  	this.y = y;
  	this.dir = dir;
  	this.unFoods = new Array();
  	this.img  = new Image();
  	this.life = true;
  	}
  	
  Snake.prototype.draw = function(){
  	//this.context.save();
  	//this.context.clearRect(0,0,500,500);
  	this.context.fillStyle = "red";
  	this.context.fillRect(this.x,this.y,this.width,this.height);
  	//this.context.drawImage(this.img,this.x,this.y);
  	for(var index = 0; index<this.unFoods.length;index++){
  		var food = this.unFoods[index];
  		this.context.fillStyle = food.color;
  		this.context.fillRect(food.x,food.y,food.width,food.height);
  		
  		}
  		 for(var index = 0; index<this.foods.length;index++){
  		 	
  		 	var food = this.foods[index];
  		 	food.draw();
  		 	
  		 	}
  	  
  	}
  	
  	
  	
  	Snake.prototype.move = function(){  	
  	 	
  	 for(var index = this.foods.length-1 ; index>=0;index--){
  		
  		var food = this.foods[index];
  		if(index == 0){
  			
  		    food.x = this.x;
  		    food.y = this.y;	
  		  }else{
  		       
  		      food.x= this.foods[index-1].x;
  		      food.y = this.foods[index-1].y;
  		   }
  		
  		}
	    switch(this.dir){
  	    	case snkeUtil.LEFT :this.x -= this.speed;break;
  	    	case snkeUtil.RIGHT:this.x +=this.speed;break;
  	    	case snkeUtil.TOP: this.y -=this.speed;;break;  	    	
  	    	case snkeUtil.DOWN:this.y+= this.speed;break;
  	    	default:break;
  	    }
  	    /**
  	      Åö×²¼ì²â
  	     */
  	  this.collisition() 	
  	  //if(this.life)    
  	     this.draw();
  	     	
  	
  	  }
  
Snake.prototype.collisition = function(){
	for(var index = 0; index<this.unFoods.length;index++){
		
		var food = this.unFoods[index];		
		
	       if(((this.x)>=food.x&&this.x<=(food.x+food.width)||(this.x+this.width>=food.x&&(this.x+this.width)<=(food.x+food.width)))&&((this.y+this.height>=food.y&&(this.y+this.height)<=(food.y+food.height))||(this.y>=food.y&&this.y<=(food.y+food.height)))){
			this.unFoods.splice(index,1);
			
			this.foods.push(food);
			//return;
			break
			}			
		
		}
		/**
		±ß½ç¼ì²â
      		 */
      		 if(this.x<0 ||(this.x+this.width)>snkeUtil.farmWidth||this.y<0||(this.y+this.width)>snkeUtil.farmHeight){
      		 	//Åö×²ËÀÍö
      		 	this.life = false;
      		 	}
	
	
	}	  
Snake.prototype.setDir = function(dir){
  	
  	this.dir = dir;
  	
  	}

 Snake.prototype.setSpeed = function(speed){

     this.speed = speed;

}

 Snake.prototype.speedUp = function(speed){

     this.speed += speed;

}
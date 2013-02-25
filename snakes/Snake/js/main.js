
 function SnakeMain(){
 	   var context;
 	   var farm;
 	   var timer;
 	   var canvas_width;
 	   var canvas_height;
 	   var snake;
 	   
 	}
 	var snake;
SnakeMain.prototype.init=   function (farm){
   	 if(snkeUtil.isElement(farm)){
   	 	 this.farm = farm;
   	 	}else{
   	 		this.farm = document.getElementById(farm);
   	 		}
   	  this.context = this.farm.getContext("2d");
   	 snkeUtil.farmWidth= this.canvas_width = this.farm.width;
   	 snkeUtil.farmHeight= this.canvas_height = this.farm.height;
   	   
   	  this.context.fillStyle = "#E8FFFF";
	  this.context.strokeStyle = "#000000";
	  this.context.fillRect(0,0,500,500);
	  this.context.strokeRect(0,0,500,500);
	  this.snake =  new Snake(Math.floor(Math.random()*500),Math.floor(Math.random()*500),10,this.context,Math.floor(Math.random()*4));
	  var iniFood = new Food(Math.floor(Math.random()*500),Math.floor(Math.random()*500),10,10,this.context,1,10,'yellow');
	  this.snake.unFoods.push(iniFood);
	  snake = this.snake;
	  //���Ӽ����¼�
	//  Window.snake =this.snake;
          document.onkeyup= function(e){
                if (!e)e=window.event;
                switch(e.keyCode | e.which | e.charCode){
                		
                    case 37:{//left
                        //��ֹ�ߵ�����
                        if(snake.dir==snkeUtil.RIGHT){
                            break;
                        }
                        snake.dir = snkeUtil.LEFT;
                        break;
                    }
                    case 38:{//up
                    	  //��ݼ�������������
                    		if(event.ctrlKey){
                    			  snake.speedUp(-20);
                    				break;
                    		}
                        if(snake.dir==snkeUtil.DOWN){//��ֹ�ߵ�����
                            break;
                        }
                        snake.dir = snkeUtil.TOP;
                        break;
                    }
                    case 39:{//right
                        if(snake.dir==snkeUtil.LEFT){//��ֹ�ߵ�����
                            break;
                        }
                       snake.dir = snkeUtil.RIGHT;
                        break;
                    }
                    case 40:{//down
                    		if(event.ctrlKey){
                    			  snake.speedUp(20);
                    				break;
                    		}
                        if(snake.dir==snkeUtil.TOP){//��ֹ�ߵ�����
                            break;
                        }
                        snake.dir = snkeUtil.DOWN;
                        break;
                    }
                }
            }
        
			

}

SnakeMain.prototype.loop = function(){
	
	 if(!this.snake.life){
	 	clearInterval(timper);
	 	alert("game over");
	 	}
	  this.clear();
	  if(this.snake.unFoods.length<=4){
	  	this.generateFood();
	  	
	  	}
	  this.snake.move();
	
	}

SnakeMain.prototype.clear = function(){
	
	//this.context.save(); 
	  this.context.clearRect(0, 0, this.canvas_width, this.canvas_height); 
	  this.canvas_height = this.farm.height;
   	  this.context.fillStyle = "#E8FFFF";
	  this.context.strokeStyle = "#000000";
	  this.context.fillRect(0,0,500,500);
	  this.context.strokeRect(0,0,500,500);
	
	}
SnakeMain.prototype.generateFood = function(){
	
	// var colors = ['orange','yellow','green','blue','purple','#ccc'];
	var colorT = snkeUtil.getColor();
	 var width = Math.floor(Math.random()*20);
	 var height = Math.floor(Math.random()*20);
	
	 var food = new Food(Math.floor(Math.random()*(500-width)),Math.floor(Math.random()*(500-height)),10,10,this.context,1,10,"#"+colorT);
	 this.snake.unFoods.push(food);
	
	}

function Food(x,y,width,height,context,grade,life,col){
	
	 this.x = x;
	 this.y = y;
	 this.context = context;
	 this.point = grade;// 分值
	 this.life = life // 存在的生命时间
	 this.color = col;
	 this.width =width;
	 this.height = height;
	 this.dir;
	 this.speed = 10;
	}
	
	
	 	
   Food.prototype.draw = function(){
  	//this.context.save();
  	//this.context.clearRect(0,0,500,500);
  	this.context.fillStyle = this.color;
  	this.context.fillRect(this.x,this.y,this.width,this.height);
  	
  	
  	
  	}
  	
  	 Food.prototype.move = function(){
  	
  	  
  	    switch(this.dir){
  	    	case snkeUtil.LEFT :this.x -= this.speed;break;
  	    	case snkeUtil.RIGHT:this.x +=this.speed;break;
  	    	case snkeUtil.TOP: this.y -=this.speed;break;  	    	
  	    	case snkeUtil.DOWN:this.y+= this.speed;break;
  	    	default:break;
  	    }
  	    this.draw();
  	    /**
  	      碰撞检测
  	     */
  	   
  	    
  	    
  	     	
  	
  	  }
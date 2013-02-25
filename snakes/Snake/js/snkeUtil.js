
 var snkeUtil = {
 	 
 	 isElement:function(ele){
 	 	 if(ele instanceof HTMLElement){
 	   	  	return true;
 	   	  	}else{
 	   	  		return false;
 	   	  		}
 	 	},
 	LEFT:1,
 	RIGHT:2,
 	TOP:3,
 	DOWN:4,
 	Direction:[this.LEFT,this.RIGHT,this.TOP,this.DOWN],
 	getColor:function getColor(){//随机产生一个十六进制颜色
		var num = Math.floor(Math.random() * 16777215);//十六进制FFFFFF转换为十进制为16777215，理论上这里取不到FFFFFF
		var color = num.toString(16);
		for(; color.length < 6;){
			color = "0" + color;
		}
		return color;
	},
	farmWidth:0,
	farmHeight:0,
 	}

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
 	getColor:function getColor(){//�������һ��ʮ��������ɫ
		var num = Math.floor(Math.random() * 16777215);//ʮ������FFFFFFת��Ϊʮ����Ϊ16777215������������ȡ����FFFFFF
		var color = num.toString(16);
		for(; color.length < 6;){
			color = "0" + color;
		}
		return color;
	},
	farmWidth:0,
	farmHeight:0,
 	}
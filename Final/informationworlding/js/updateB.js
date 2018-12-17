function updateBackground(){

	day = new Date();
	h = day.getHours();

	if(h<=5 && h>=0){
		r=0;
		g=0;
		b=0;

	}else if(h<=7 && h>5){
		r=0.5;
		g=0.5;
		b=0.6;
	}else if(h<=12 && h>7){
		r=0.6;
		g=0.8;
		b=0.9;
		r+=0.01;
	// console.log(r);
	}else if(h<=16 && h>12){
		r=0.7;
		g=0.8;
		b=0.9;
	}else if(h<=19 && h>16){
		r=0.6;
		g=0.6;
		b=0.5;
	}else if(h<=23 && h>19){
		r=0.2;
		g=0.2;
		b=0.3;
	}
	scene.background = new THREE.Color(r,g,b);
}
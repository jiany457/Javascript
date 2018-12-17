var myR;

function sendQ(){

	let url = 'http://api.waqi.info/feed/beijing/?token=cf79b510a4164ee390d9441e2c551b802657c5fa';

	// let url = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=ff8aff13e812da1ed3a97a1977e84d10";
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
	// let input = new FormData(form);
	// for (let pair of input.entries()){
	// 	jsonObject[pair[0] = pair[1]];
	// }
	// let url = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=ff8aff13e812da1ed3a97a1977e84d10";
	if(xhr.readyState == 4) {
		if (xhr.status == 200 ){
			myResponse = JSON.parse(xhr.responseText);
			myR = myResponse.data.iaqi.pm25.v;
			// document.getElementById("Output").innerHTML = JSON.stringify(myResponse);

						
	}else {
		console.log("There was an error");
	}
	}
}

xhr.open("GET", url, true);
xhr.send();

}

function airpollution(data){
	var fogcolor = new THREE.Color(r,g,b);
	scene.fog = new THREE.Fog(fogcolor, -1000, data*200);
}


var starQty;
function starForge(data) {
		/* 	Yep, it's a Star Wars: Knights of the Old Republic reference,
			are you really surprised at this point? 
											*/
		 //45
		 	starQty = data*200;	
			geometry = new THREE.SphereGeometry(1000, 100, 50);

	    	materialOptions = {
	    		size: 1.0, //I know this is the default, it's for you.  Play with it if you want.
	    		transparency: true, 
	    		opacity: 0.7
	    	};

	    	starStuff = new THREE.PointCloudMaterial(materialOptions);

		// The wizard gaze became stern, his jaw set, he creates the cosmos with a wave of his arms
		
		for (var i = 0; i < starQty; i++) {		

			var starVertex = new THREE.Vector3();
			starVertex.x = Math.random() * 2000 - 1000;
			starVertex.y = Math.random() * 2000 - 1000;
			starVertex.z = Math.random() * 2000 - 1000;

			geometry.vertices.push(starVertex);

		}


		stars = new THREE.PointCloud(geometry, starStuff);
		scene.add(stars);
}

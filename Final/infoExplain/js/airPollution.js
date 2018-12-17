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
			airpollution();
			starForge();
			
	}else {
		console.log("There was an error");
	}
	}
}

xhr.open("GET", url, true);
xhr.send();

}

function airpollution(){
	var fogcolor = new THREE.Color(r,g,b);
	scene.fog = new THREE.Fog(fogcolor, -1000, myR*110);
}
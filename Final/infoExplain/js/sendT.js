var getT;
var T;
function sendT(){

	let url_T = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=ff0c74f5ac07bde870073e9bf0d9e586';
	// let url = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=ff8aff13e812da1ed3a97a1977e84d10";
	let xhr_T = new XMLHttpRequest();
	xhr_T.onreadystatechange = function(){
	// let input = new FormData(form);
	// for (let pair of input.entries()){
	// 	jsonObject[pair[0] = pair[1]];
	// }
	// let url = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=ff8aff13e812da1ed3a97a1977e84d10";
	if(xhr_T.readyState == 4) {
		if (xhr_T.status == 200 ){
			getT = JSON.parse(xhr_T.responseText);
			// document.getElementById("Output").innerHTML = JSON.stringify(myResponse);
			changeGround();
			
	}else {
		console.log("There was an error");
	}
	}
}

xhr_T.open("GET", url_T, true);
xhr_T.send();
}


function changeGround(){
	T = getT.main.temp;
}
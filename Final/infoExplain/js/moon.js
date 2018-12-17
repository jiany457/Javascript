Clone = function(){
	var geo = new THREE.SphereGeometry(20,20,20);
	var material = new THREE.MeshPhongMaterial( {color:"hotpink"} );
	this.sphere = new THREE.Mesh(geo, material);
	// this.sphere.receiveShadow = true; 
	// this.sphere.castShadow = true;
}

var clone;
function createClone(){
		clone = new Clone();
		scene.add( clone.sphere );
}

function myClone(){
		// function youAreHere(position) {  
		// console.log("position: ", position);
		// }
		// if(navigator.geolocation) {  
		// navigator.geolocation.getCurrentPosition(youAreHere);
		// }
		function youHaveMoved(position) {  
			clone.sphere.position.x = (position.coords.latitude - Math.floor(position.coords.latitude))*20;
			// moon.sphere.position.x = position.coords.latitude;
			clone.sphere.position.y = (position.coords.longitude - Math.floor(position.coords.longitude))*20;		
			clone.sphere.position.z = position.coords.altitude-1500||-1500;
			console.log(clone.sphere.position.z);
		}
		if(navigator.geolocation) {  
		navigator.geolocation.watchPosition(youHaveMoved);
		}
}


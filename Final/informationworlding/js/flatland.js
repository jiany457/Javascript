Plane = function(){
		var myP = new THREE.PlaneBufferGeometry( 7500, 7500, 255, 255);
		var myT = new THREE.MeshPhongMaterial( { color: "rgb(203,123,103)", flatShading: true  } );
		this.mesh = new THREE.Mesh(myP, myT);
		this.mesh.position.x = 0;
		this.mesh.position.y = -800;
		this.mesh.position.z = -3000;
}

var plane;
function createGround(){
	plane = new Plane();
	// plane.mesh.rotation.x -=1.6;
	scene.add(plane.mesh);
}
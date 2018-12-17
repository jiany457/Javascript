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


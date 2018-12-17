	
Houses = function(){
	var myG = new THREE.TorusKnotBufferGeometry( 50, 10, 50, 20 );
	// myG.translate( 0, 0.5, 0 );
	var myM = new THREE.MeshPhongMaterial( { color: "rgb(203,153,153)", flatShading: true  } );

	
	this.mesh = new THREE.Mesh( myG, myM );

	this.mesh.position.x = -500;
	this.mesh.position.y = 0;
	this.mesh.position.z = -1000;
	this.mesh.scale.x = 50;
	this.mesh.scale.y = 50;
	this.mesh.scale.z = 50;
	this.mesh.updateMatrix();
	// this.mesh.matrixAutoUpdate = false;

}


// function rotation(){

// 	this.mesh.rotation.y+= (Math.random()*0.05);

// }

var houses;

function createHouses(){
	
	houses = new Houses();
	// houses = new Houses();
	scene.add(houses.mesh);
// }

}


		// var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
		// 		geometry.translate( 0, 0.5, 0 );
		// 		var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
		// 		for ( var i = 0; i < 500; i ++ ) {
		// 			var mesh = new THREE.Mesh( geometry, material );
		// 			mesh.position.x = Math.random() * 5000 - 1500;
		// 			mesh.position.y = -300;
		// 			mesh.position.z = Math.random() * 5000 - 5000;
		// 			mesh.scale.x = 20;
		// 			mesh.scale.y = Math.random() * 80 + 10;
		// 			mesh.scale.z = 20;
		// 			mesh.updateMatrix();
		// 			mesh.matrixAutoUpdate = false;
		// 			scene.add( mesh );
		// 		}
// Sea = function(){	
// 	// create the geometry (shape) of the cylinder;
// 	// the parameters are: radius top, radius bottom, height, number of segments on the radius, number of segments vertically

// 	var geom = new THREE.CylinderGeometry(600,600,800,30,10);
	
// 	// rotate the geometry on the x axis
// 	//Matrix4(): This allows a Vector3 representing a point in 3D space to undergo transformations such as translation, rotation, shear, scale, reflection, orthogonal or perspective projection and so on, by being multiplied by the matrix. 
// 	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
	
// 	// create the material 
// 	var mat = new THREE.MeshPhongMaterial({color:Colors.blue,transparent:true,opacity:.6,shading:THREE.FlatShading,});


// 	// To create an object in Three.js, we have to create a mesh 
// 	// which is a combination of a geometry and some material
// 	this.mesh = new THREE.Mesh(geom, mat);

// 	// Allow the sea to receive shadows
// 	this.mesh.receiveShadow = true; 
// }

Sea = function(){	
	// create the geometry (shape) of the cylinder;
	// the parameters are: radius top, radius bottom, height, number of segments on the radius, number of segments vertically

	var geom = new THREE.CylinderGeometry(500,1000,300,40,10);
	
	// rotate the geometry on the x axis
	//Matrix4(): This allows a Vector3 representing a point in 3D space to undergo transformations such as translation, rotation, shear, scale, reflection, orthogonal or perspective projection and so on, by being multiplied by the matrix. 
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
	

	// create an array to store new data associated to each vertex
	geom.mergeVertices();
	var l = geom.vertices.length;


	this.waves = [];
	for (var i=0; i<l; i++){
		// get each vertex
		var v = geom.vertices[i];
		// store some data associated to it
		
		this.waves.push({y:v.y,
						 x:v.x,
						 z:v.z,
						// a random angle
						ang:Math.random()*Math.PI*50,
						// a random distance
						amp:5 + Math.random()*50,
						// a random speed between 0.016 and 0.048 radians / frame
						speed:0.016 + Math.random()*0.032
						});
	};

	var mat = new THREE.MeshPhongMaterial({
		color:Colors.yellow,
		transparent:true,
		opacity:.9,
		shading:THREE.FlatShading,
	});

	

	this.mesh = new THREE.Mesh(geom, mat);
	this.mesh.receiveShadow = true;
	
}

var sea;

function createSea(){
	sea = new Sea();
	// push it a little bit at the bottom of the scene
	sea.mesh.position.y =100;
	sea.mesh.position.x =-500;
	sea.mesh.position.z =-3000;
	// sea.mesh.rotation.x = -1.8;
	// add the mesh of the sea to the scene
	scene.add(sea.mesh);
}

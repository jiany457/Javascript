Cloud = function(){
	// Create an empty container that will hold the different parts of the cloud
	this.mesh = new THREE.Object3D(); //create an empty object
	
	// create a cube geometry;
	// this shape will be duplicated to create the cloud
	var geom = new THREE.BoxGeometry(10,10,10);
	
	// create a material; a simple white material will do the trick
	var mat = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
	
	// duplicate the geometry a random number of times
	var nBlocs = 3+Math.floor(Math.random()*3);
	
	for (var i=0; i<nBlocs; i++ ){
		
		// create the mesh by cloning the geometry
		var m = new THREE.Mesh(geom, mat); 
		
		// set the position and the rotation of each cube randomly
		m.position.x = i*15;
		m.position.y = Math.random()*5;
		m.position.z = Math.random()*5;
		m.rotation.z = 0.01*Math.random()*Math.PI*2;
		m.rotation.y = 0.01*Math.random()*Math.PI*2;
		
		// set the size of the cube randomly
		var s = .1 + Math.random()*.9;
		m.scale.set(s,s,s);
		
		// allow each cube to cast and to receive shadows
		m.castShadow = true;
		m.receiveShadow = true;
		
		// add the cube to the container we first created
		this.mesh.add(m);
	} 
}

Sky = function(){
	// Create an empty container
	this.mesh = new THREE.Object3D();
	
	// choose a number of clouds to be scattered in the sky
	//bBlocs represent how many box in a cloud
	this.nClouds = 200;
	
	// To distribute the clouds consistently,
	// we need to place them according to a uniform angle
	var stepAngle = Math.PI*2 / this.nClouds;
	
	// create the clouds
	for(var i=0; i<this.nClouds; i++){
		var c = new Cloud();
	 
		// set the rotation and the position of each cloud;
		// for that we use a bit of trigonometry
		var a = stepAngle*i; // this is the final angle of the cloud
		var h = 1000 + Math.random()*200; // this is the distance between the center of the axis and the cloud itself

		// Trigonometry!!! I hope you remember what you've learned in Math :)
		// in case you don't: 
		// we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
		c.mesh.position.y = Math.sin(a)*h;
		c.mesh.position.x = Math.cos(a)*h;

		// rotate the cloud according to its position
		c.mesh.rotation.z = a + Math.PI/2;
		// for a better result, we position the clouds at random depths inside of the scene
		c.mesh.position.z = -400-Math.random()*400;
		
		// we also set a random scale for each cloud
		var s = 1+Math.random()*2;
		c.mesh.scale.set(s,s,s);

		// do not forget to add the mesh of each cloud in the scene
		this.mesh.add(c.mesh);  
	}  
}

var sky;

function createSky(){
	sky = new Sky();
	sky.mesh.position.y = -200;
	sky.mesh.position.z =- 3000;
	sky.mesh.position.x =- 500;

	sky.mesh.rotation.z = 0.5;
	scene.add(sky.mesh);
} 
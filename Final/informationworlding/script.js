
var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
	yellow:"rgb(243,253,109)"
};

var r, g, b, day, h;

var mousePos = {x:0, y:0};	
var myResponse;		
var time = Date();
var myPos_l;
var myPos_lo;
var myPos_a;
// var myPos_lo;
// var myPos_a;
			// var v1 =256/5;

/*----------------Setting up scene----------------------*/


window.addEventListener('load', init, false);



// document.getElementById('content').innerHTML = myPos_lo;
// document.getElementById('content').innerHTML = myPos_a;


function init(event) {
	// set up the scene, the camera and the renderer
	createScene();
	sendQ();
	airpollution(myR);
	starForge(myR);
	// changeShape();
	createLights();
	updateBackground();
	addSea();
	addGrass();//Grass
	createSky();
	createGeo();
	// createClone();
	myClone();
	document.addEventListener('mousemove', handleMouseMove, false);
	loop();

}

// document.getElementById("Output").innerHTML = myResponse.main.temp;
// document.body.style.backgroundColor = "rgb("+ (myResponse.main.temp*10-myResponse.main.temp*5)/10 +",0,0)";

// document.getElementById("Output1").innerHTML = JSON.stringify(myResponse.coord);


function handleMouseMove(event) {

	// Converting the mouse position value received to a normalized value varying between -1 and 1;
	// this is the formula for the horizontal axis:
	
	var tx = -1 + (event.clientX / WIDTH)*2;

	// for the vertical axis, we need to inverse the formula 
	// because the 2D y-axis goes the opposite direction of the 3D y-axis
	
	var ty = 1 - (event.clientY / HEIGHT)*2;
	
	mousePos = {x:tx, y:ty};
}

//we need: a camera, a scene, a renderer, objects, lights
var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;

function createScene() {
	// Get the width and the height of the screen,
	// use them to set up the aspect ratio of the camera 
	// and the size of the renderer.
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	// Create the scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(r,g,b);

	
	// Add a fog effect to the scene; same color as the background color used in the style sheet
	//in css: #e4e0ba, #f7d9aa
	 //	/* 颜色， 开始渲染地方， 渲染结束地方 */
	

	// Create the camera
	aspectRatio = WIDTH / HEIGHT; //the ratio of the width to the height of an image or screen 看到一个东西的长高比例，最好alignwith windowsize
	fieldOfView = 60; //视角宽度
	nearPlane = 1; //最近视角
	farPlane = 10000;	//最远视角
	camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio,nearPlane, farPlane);
	camera.position.z = 50000;
	camera.position.y = 100;
	// Create the renderer	
	renderer = new THREE.WebGLRenderer({ 
		// Allow transparency to show the gradient background
		// we defined in the CSS
		alpha: true, 

		// Activate the anti-aliasing; this is less performant,
		// but, as our project is low-poly based, it should be fine :)
		antialias: true //?? 
	});

	// Define the size of the renderer; in this case,
	// it will fill the entire screen
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setPixelRatio( window.devicePixelRatio );
	// Enable shadow rendering	
	//打开渲染器的阴影地图
	//能够显示阴影
	renderer.shadowMap.enabled = true;
	
	// Add the DOM element of the renderer to the 
	// container we created in the HTML
	container = document.getElementById('world');
	container.appendChild(renderer.domElement);
	controls = new THREE.OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.25;
				controls.screenSpacePanning = false;
				controls.minDistance = 100;
				controls.maxDistance = 500;
				controls.maxPolarAngle = Math.PI / 2;
	// Listen to the screen: if the user resizes it
	// we have to update the camera and the renderer size
	window.addEventListener('resize', handleWindowResize, false);
	renderer.render(scene,camera);

}



function handleWindowResize() {
	// update height and width of the renderer and the camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}


/*----------------Lighting----------------------*/
var hemisphereLight, shadowLight;
// A hemisphere light is a gradient colored light; 

function createLights() {

	hemisphereLight = new THREE.HemisphereLight("rgb(13,13,19)","rgb(13,23,29)", .9) //(sky color,ground color, intensity of the light);
	hemisphereLight.position.set( 0, 50, 0 );
	hemisphereLight.color.setHSL( 0.6, 1, 0.6 );
	hemisphereLight.groundColor.setHSL( 0.095, 1, 0.75 );
	hemisphereLight.position.set( 0, 50, 0 )
	// A directional light shines from a specific direction. 
	// It acts like the sun, that means that all the rays produced are parallel. 
	//store it as a variable
	shadowLight = new THREE.DirectionalLight("rgb(203,193,209)", .9); //(color of light, intensity); 0xffffff
	// Set the direction of the light  
	shadowLight.position.set(150, 350, 350); //(x,y,z);
	// shadowLight.position.multiplyScalar( 30 );
	// Allow shadow casting 
	shadowLight.castShadow = true;

	// define the visible area of the projected shadow //??
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// define the resolution of the shadow; the higher the better, 
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	// to activate the lights, just add them to the scene
	scene.add(hemisphereLight);  
	scene.add(shadowLight);
	renderer.setClearColor(0x00001,0.0);

	ambientLight = new THREE.AmbientLight(0xdc8874, .5);
	scene.add(ambientLight);
}

function loop(){
	time = Date();
	// document.getElementById('myday').innerHTML = time;
	// Rotate the propeller, the sea and the sky
	// airplane.propeller.rotation.x += 0.3;
	// sea.mesh.rotation.z += .0005;
	updateBackground();
	updateSea();
	sky.mesh.rotation.z += .001;
	// sea.moveWaves();
	sea.mesh.rotation.y+=0.001;
	geo.mesh.rotation.y += .001;
	grass.mesh.rotation.z +=0.001;
	myClone();	
	// changeShape();// 
	controls.update();  
	renderer.render(scene, camera);
	// call the loop function again
	requestAnimationFrame(loop);
}
























//init
Grass = function(){
var geometry_g = new THREE.PlaneBufferGeometry( 100, 100 );
var texture_g = new THREE.CanvasTexture( generateTextureGrass());

for ( var i = 0; i < 15; i ++ ) {
var material_g = new THREE.MeshBasicMaterial({	
						color: new THREE.Color().setHSL( 0.3, 0.75, ( i / 15 ) * 0.4 + 0.1 ),
						map: texture_g,
						depthTest: false,
						depthWrite: false,
						transparent: true
	});
	
	this.mesh = new THREE.Mesh( geometry_g, material_g );
	this.mesh.position.y = i * 25-800;
	this.mesh.rotation.x = - Math.PI / 2;
	this.mesh.position.z = -2000;
	this.mesh.position.x = -500;

}
}




//simply a call back function
function generateTextureGrass() {
				var canvas_g = document.createElement( 'canvas' );
				canvas_g.width = 512;
				canvas_g.height = 512;
				var context_g = canvas_g.getContext( '2d' );
				for ( var i = 0; i < 20000; i ++ ) {
					context_g.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 1000) + '%)';
					context_g.beginPath();
					context_g.arc( Math.random() * canvas_g.width, Math.random() * canvas_g.height, Math.random() + 0.15, 0, Math.PI * 2, true );
					context_g.fill();
				}
				context_g.globalAlpha = 0.075;
				context_g.globalCompositeOperation = 'lighter';
				return canvas_g;
}

var grass;

function addGrass(){
	var time = Date.now() / 6000;

	// for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
	// 				var mesh = scene.children[ i ];
	// 				mesh.position.x = Math.sin( time * 4 ) * i * i * 0.005;
	// 				mesh.position.z = Math.cos( time * 6 ) * i * i * 0.005;
	// }
					grass = new Grass();
					scene.add( grass.mesh );
					grass.mesh.scale.set(15,15,15);
}

//render
// var newtime = Date.now() / 6000;
// for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
// 					this.mesh = scene.children[ i ];
// 					this.mesh.position.x = Math.sin( newtime * 4 ) * i * i * 0.005;
// 					this.mesh.position.z = Math.cos( newtime * 6 ) * i * i * 0.005-2000;

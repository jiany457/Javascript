var geometry_s;
var geometry_sb;
Sea = function(){
geometry_s = new THREE.PlaneBufferGeometry( 1500, 1500, worldWidth*0.08 - 0.08, worldDepth*0.08 - 0.08 );
geometry_s.rotateX( - Math.PI / 2 );
				var position_s = geometry_s.attributes.position;
				position_s.dynamic = true;
				for ( var i = 0; i < position_s.count; i ++ ) {
					var y = 35 * Math.sin( i / 80 );
					position_s.setY( i, y );
				}
				var texture_s = new THREE.TextureLoader().load( 'js/1.jpg' );
				texture_s.wrapS = texture_s.wrapT = THREE.RepeatWrapping;
				texture_s.repeat.set( 5, 5 );
				var material_s = new THREE.MeshBasicMaterial( { color: 0x0044ff, map: texture_s, opacity:.5} );
				this.mesh = new THREE.Mesh( geometry_s, material_s );
				this.mesh.castShadow = true;
				this.mesh.receiveShadow = true;
				// this.mesh.rotation.y = 0.;	
}

var sea;
			
Seabody = function(){
				geometry_sb = new THREE.BoxGeometry( 1500,200,1500);
				var mat_sb = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
				this.mesh = new THREE.Mesh( geometry_sb, mat_sb );
				this.mesh.position.z = -2000;
				this.mesh.position.y = -300;
				this.mesh.position.x = -500;
				this.mesh.castShadow = true;
				this.mesh.receiveShadow = true;
// geometry_sb.rotateX( - Math.PI / 2 )
				// var texture_sb = new THREE.TextureLoader().load( 'js/1.jpg' );
				// texture_sb.wrapS = texture_sb.wrapT = THREE.RepeatWrapping;
				// texture_sb.repeat.set( 5, 5 );
				sea = new Sea();
				sea.mesh.position.z = -0;
				sea.mesh.position.y = -20;
				sea.mesh.position.x = -0;
				this.mesh.add(sea.mesh);
				// this.mesh.rotation.y = 0.;
	}			

var seabody;

function addSea(){
	// sea = new Sea();
	// scene.add( sea.mesh );
	seabody = new Seabody();
	scene.add(seabody.mesh);
}

function updateSea(){
var delta = clock.getDelta();
var time_s = clock.getElapsedTime() * 10;
var position_s = geometry_s.attributes.position;
for ( var i = 0; i < position_s.count; i ++ ) {
					var y = 35 * Math.sin( i / 5 + ( time_s + i ) / 7 );
					position_s.setY( i, y );
}
position_s.needsUpdate = true;
}
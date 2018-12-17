			var worldWidth = 256, worldDepth = 256,
			worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2; //world half width = 128
			var clock = new THREE.Clock();
			var geometry;
			var now;

Geometry = function(){

			var data = generateHeight( worldWidth, worldDepth );
			geometry = new THREE.PlaneBufferGeometry( 7500, 7500, worldWidth-1, worldDepth-1);//可改

				
				geometry.rotateX( - Math.PI / 2 );
			

				//-------------------------------------------------//
				//update this
				var vertices = geometry.attributes.position.array;
				for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
					vertices[ j + 1 ] = data[ i ]*10;
				}
				//update
				texture = new THREE.CanvasTexture( generateTexture( data, worldWidth, worldDepth ) );
				texture.wrapS = THREE.ClampToEdgeWrapping;
				texture.wrapT = THREE.ClampToEdgeWrapping;
				this.mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: texture } ) );
				this.mesh.rotation.x = 0.3;
}

function generateHeight( width, height ) {

				var size = width * height, data = new Uint8Array( size ),
				//z could be a variable too;
				perlin = new ImprovedNoise(), quality = 1, z = 100*Math.random();
				for ( var j = 0; j < 4; j ++ ) {
					for ( var i = 0; i < size; i ++ ) {
						var x = i % width, y = ~~ ( i / width );
						data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
				}
				quality *= 5;
	}
				return data;
			
}
		

function generateTexture( data, width, height ) {
				var canvas, canvasScaled, context, image, imageData, vector3, sun,shade;
				vector3 = new THREE.Vector3( 1, 1, 1 );
				sun = new THREE.Vector3( 1, 1, 1);
				sun.normalize();
				canvas = document.createElement( 'canvas' );
				canvas.width = width;
				canvas.height = height;
				context = canvas.getContext( '2d' );
				context.fillStyle = "#000" ;
				context.fillRect( 0, 0, width, height );
				image = context.getImageData( 0, 0, canvas.width, canvas.height );
				imageData = image.data;
				for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
					vector3.x = data[ j - 2 ] - data[ j + 2 ];
					vector3.y = 4;
					vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
					vector3.normalize();
					shade = vector3.dot( sun );

					//color of the land, J is the variable
					// 	imageData[ i ] = ( 126 + shade * 80 ) * ( 0.5 + data[ j ] * 0.007 );
					// imageData[ i + 1 ] = ( 196 + shade * 30 ) * ( 0.5 + data[ j ] * 0.007 );
					// imageData[ i + 2 ] = ( 255+ shade *100 ) * ( 0.5 + data[ j ] * 0.005 );
				
					imageData[ i ] = ( 123 + shade * 80 ) * ( 0.5 + data[ j ] * 0.007 );
					imageData[ i + 1 ] = ( 196  + shade * 30 ) * ( 0.5 + data[ j ] * 0.007 );
					imageData[ i + 2 ] = ( 255 + shade *100 ) * ( 0.5 + data[ j ] * 0.005 );
				}

				context.putImageData( image, 0, 0 );
				// Scaled 4x
				canvasScaled = document.createElement( 'canvas' );
				canvasScaled.width = width * 4-10;
				canvasScaled.height = height * 4-10;
				context = canvasScaled.getContext( '2d' );
				context.scale( 4, 4 );
				context.drawImage( canvas, 0, 0 );
				image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
				imageData = image.data;
				for ( var i = 0, l = imageData.length; i < l; i += 10 ) {
					var v = ~~ ( Math.random() * 5 );
					imageData[ i ] += v;
					imageData[ i + 1 ] += v;
					imageData[ i + 2 ] += v;
				}
				context.putImageData( image, 0, 0 );
				return canvasScaled;
			}

function GUpdate( new_param ) {
				var data = generateHeight( worldWidth, new_param ); //data=generateHeight(128,128);
				console.log( new_param );

				texture = new THREE.CanvasTexture( generateTexture( data, worldWidth, new_param ) );
				const up_mat = new THREE.MeshBasicMaterial( { map: texture } );
				mesh.material = up_mat;
				mesh.needsUpdate = true;
				//mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: texture } ) );
				//scene.add( mesh );
//
}

var geo;
function createGeo(){
	geo = new Geometry();
	geo.mesh.position.y=100;
	geo.mesh.position.x=-500;
	geo.mesh.position.z=-2000;
	geo.mesh.receiveShadow = true;
	geo.mesh.scale.set(0.2,0.2,0.2);
	scene.add(geo.mesh );	
}

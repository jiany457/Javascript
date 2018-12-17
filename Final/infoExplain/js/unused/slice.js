Slice = function(){
	var myslice = new THREE.BoxGeometry(50,10,50);
	var skin = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
	this.mesh = new THREE.Mesh(myslice, skin); 
	this.mesh.receiveShadow = true;
}
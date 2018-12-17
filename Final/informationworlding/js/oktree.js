LargeTree = function(){
var branch = new THREE.CylinderGeometry(1,10,100);
	var material = new THREE.MeshNormalMaterial();
	this.sphere = new THREE.Mesh(branch, material);
}

Leaves = function(){
var leafs = new THREE.BoxGeometry(10,10,10);
var ma1 = new THREE.MeshNormalMaterial();
this.m1 = new THREE.Mesh(leafs, ma1);
this.m1.position.x = 30*Math.random(-3,2);
this.m1.position.y = 50*Math.random(-1,1);
this.m1.scale.set(5*Math.random(),5*Math.random(),5*Math.random());

}

var largeTree;
var leaf = [];
function addTree(){
	//branch
	largeTree = new LargeTree();
	scene.add(largeTree.sphere); 
	

for(var i=0; i<5; i++){
	leaf[i] = new Leaves();
	leaf[i].m1.rotation.y = Math.random();
	scene.add(leaf[i].m1);
}
}


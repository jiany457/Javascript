var THREE = require('three');

var tree = new THREE.Tree({
    generations : 4,        // # for branch' hierarchy
    length      : 4.0,      // length of root branch
    uvLength    : 16.0,     // uv.v ratio against geometry length (recommended is generations * length)
    radius      : 0.2,      // radius of root branch
    radiusSegments : 8,     // # of radius segments for each branch geometry
    heightSegments : 8      // # of height segments for each branch geometry
});

var geometry = THREE.TreeGeometry.build(tree);

var mesh = new THREE.Mesh(
    geometry, 
    new THREE.MeshPhongMaterial({}) // set any material
);

var scene = new THREE.Scene();
scene.add(mesh);
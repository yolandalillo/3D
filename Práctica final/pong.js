  var stepX = 0.15;
  var stepY = 0.15;
  var scoreCPU = 0;
  var scorePlayer = 0;
  var start = true;

function init() {
  var scene = new THREE.Scene();
  var sceneWidth = window.innerWidth - 20;
  var sceneHeight = window.innerHeight - 20;

  var camera = new THREE.PerspectiveCamera(90, sceneWidth / sceneHeight, 0.01, 100);
  camera.position.set(0, -10, 15);
  camera.lookAt(scene.position);

  var renderer = new THREE.WebGLRenderer({
    antialias : true
  });
  renderer.shadowMap.enabled = true;
  renderer.setSize(sceneWidth, sceneHeight);
  document.body.appendChild(renderer.domElement);

  var light = getLight();
  var secondLight = getSecondLight();

  var leftBorder = getBorder("left", 1, 20, 2, -5, 0, 0);
  var rightBorder = getBorder("right", 1, 20, 2, 5, 0, 0);
  var topBorder = getBorder("top", 11, 1, 2, 0, 10, 0); //--CPU
  var downBorder = getBorder("down", 9, 1, 2, 0, -9.5, 0); //--Player

  var sphere = getSphere();
  var floor = getFloor();

  scene.add(light);
  scene.add(secondLight);
  scene.add(leftBorder);
  scene.add(rightBorder);
  scene.add(topBorder); //--cpu
  scene.add(downBorder); //--player
  scene.add(sphere);
  scene.add(floor);

  var borders = [leftBorder, rightBorder, topBorder, downBorder];

  animate(sphere, borders, renderer, scene, camera);

}


}

function animate(sphere, borders, renderer, scene, camera){


}

function getLight(){

}

function getSecondLight() {

}

function getSphere(){

   var geometry = new THREE.SphereGeometry(1, 20, 20);
   var material = new THREE.MeshNormalMaterial();
   var mesh = new Physijs.BoxMesh(geometry, material);
   mesh.position.z = 1;
   mesh.castShadow = true;
   mesh.name = "sphere";
   mesh.addEventListener('collision', function(otherObject) {
      console.log(otherObject.name);
   });

   return mesh;

}

function getFloor(){
  var texture = new THREE.TextureLoader().load("fondo.jpg");
  var geometry = new THREE.PlaneGeometry(10, 20);
  var mesh = new THREE.Mesh(geometry, getWoodMaterial(texture));
  mesh.receiveShadow = true;

  return mesh;

}

function getBorder(name, x, y, z, posX, posY, posZ){
  var geometry = new THREE.BoxGeometry(x, y, z);
  var mesh = new THREE.Mesh(geometry, getMaterial(texture));
  mesh.receiveShadow = true;
  mesh.position.set(posX, posY, posZ);
  mesh.name = name;

  return mesh;

}

function getMaterial(){
  var texture = new THREE.TextureLoader().load("wood.png");
  var material = new THREE.MeshPhysicalMaterial({
     map : texture
  });
  material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
  material.map.repeat.set(0.5, 1);
  material.side = THREE.DoubleSide;
  return material;
}

}

function checkCollision(sphere, borders) {
}

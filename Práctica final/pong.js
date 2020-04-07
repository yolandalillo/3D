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

function animate(sphere, borders, renderer, scene, camera){

}

function getLight(){

}

function getSecondLight() {

}

function getSphere(){

}

function getFloor(){
  var texture = new THREE.TextureLoader().load("fondo.jpg");
  var geometry = new THREE.PlaneGeometry(10, 20);
  var mesh = new THREE.Mesh(geometry, getWoodMaterial(texture));
  mesh.receiveShadow = true;

  return mesh;

}

function getBorder(){

}

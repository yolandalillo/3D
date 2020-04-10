var stepX = 0.15;
var stepY = 0.25;
var start = false;
var step = 0.5;

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
   var topBorder = getBorder("top",  2.5, 1, 2, 0, 9.5, 0); //CPU
   var downBorder = getBorder("down",  2.5, 1, 2, 0, -9.5, 0); //Player
   var sphere = getSphere();
   var floor = getFloor();

   scene.add(light);
   scene.add(secondLight);
   scene.add(leftBorder);
   scene.add(rightBorder);
   scene.add(topBorder);
   scene.add(downBorder);
   scene.add(sphere);
   scene.add(floor);

   var borders = [ leftBorder, rightBorder, topBorder, downBorder ];

   animate(sphere, borders, renderer, scene, camera);
}

//better in a separate function so it's better understood
//we call it in the animate function
function spheremovement(sphere) {
  if(start){
    sphere.position.x += stepX;
    sphere.position.y += stepY;
  }
}

function playermovement(sphere, borders) {
  //same as in other exercises
  document.onkeydown = function (ev) {
    switch (ev.keyCode) {
      case 32: //space
        start = true;
        break;
      case 37: //movement to the left
      //borders[2] CPU  borders[1] right
        borders[3].position.x -= step;
        break;
      case 39: //movement to the right
        borders[3].position.x += step;
        break;
    }
  }

}

function animate(sphere, borders, renderer, scene, camera) {
   checkCollision(sphere, borders);


   playermovement(sphere,borders);
   spheremovement(sphere);
   renderer.render(scene, camera);

   requestAnimationFrame(function() {
      animate(sphere, borders, renderer, scene, camera);
   });
}


function getLight() {
   var light = new THREE.DirectionalLight();
   light.position.set(4, -4, 10);
   light.castShadow = true;
   light.shadow.camera.near = 0;
   light.shadow.camera.far = 16;
   light.shadow.camera.left = -8;
   light.shadow.camera.right = 5;
   light.shadow.camera.top = 10;
   light.shadow.camera.bottom = -10;
   light.shadow.mapSize.width = 4096;
   light.shadow.mapSize.height = 4096;
   return light;
}

function getSecondLight() {
   var secondLight = new THREE.DirectionalLight();
   secondLight.position.set(4, 40, 5);
   secondLight.castShadow = true;
   secondLight.shadow.camera.near = 0;
   secondLight.shadow.camera.far = 16;
   secondLight.shadow.camera.left = -8;
   secondLight.shadow.camera.right = 5;
   secondLight.shadow.camera.top = 10;
   secondLight.shadow.camera.bottom = -10;
   secondLight.shadow.mapSize.width = 4096;
   secondLight.shadow.mapSize.height = 4096;
   return secondLight;
}

function getSphere() {
  var texture = new THREE.TextureLoader().load("ball.png");

   var geometry = new THREE.SphereGeometry(1, 20, 20);
   var material = new THREE.MeshNormalMaterial();
   var mesh = new THREE.Mesh(geometry, getWoodMaterial(texture));
   mesh.position.z = 1;
   mesh.castShadow = true;
   mesh.name = "sphere";

   return mesh;
}

function getFloor() {
  var texture = new THREE.TextureLoader().load("floor.jpg");


   var geometry = new THREE.PlaneGeometry(10, 20);
   var mesh = new THREE.Mesh(geometry, getWoodMaterial(texture));
   mesh.receiveShadow = true;

   return mesh;
}

function getBorder(name, x, y, z, posX, posY, posZ) {
   var geometry = new THREE.BoxGeometry(x, y, z);
   var texture = new THREE.TextureLoader().load("wood.png");
   var mesh = new THREE.Mesh(geometry, getWoodMaterial(texture));
   mesh.receiveShadow = true;
   mesh.position.set(posX, posY, posZ);
   mesh.name = name;

   return mesh;
}

function getWoodMaterial(texture) {
   //var texture = new THREE.TextureLoader().load("wood.png");
   var material = new THREE.MeshPhysicalMaterial({
      map : texture
   });
   material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
   material.map.repeat.set(4, 4);
   material.side = THREE.DoubleSide;

   return material;
}

function checkCollision(sphere, borders) {
   var originPosition = sphere.position.clone();

   for (var i = 0; i < sphere.geometry.vertices.length; i++) {
      var localVertex = sphere.geometry.vertices[i].clone();
      var globalVertex = localVertex.applyMatrix4(sphere.matrix);
      var directionVector = globalVertex.sub(sphere.position);
      var ray = new THREE.Raycaster(originPosition, directionVector.clone().normalize());
      var collisionResults = ray.intersectObjects(borders);
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
         // Collision detected
         if (collisionResults[0].object.name == "left" || collisionResults[0].object.name == "right") {
            stepX *= -1;
         }
         if (collisionResults[0].object.name == "down" || collisionResults[0].object.name == "top") {
            stepY *= -1;
         }
         break;
      }
   }
}

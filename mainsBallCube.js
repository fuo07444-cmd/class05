// 車輪の角度と運転席の高さを修正したToyTrain
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

camera.position.set(6, 4, 10);
camera.lookAt(0, 0, 0);

const light = new THREE.PointLight(0xffffff, 50, 10);
light.position.set(5, 5, 5);
scene.add(light);

const trainGroup = new THREE.Group();

// 車体（Cylinder）
const bodyGeo = new THREE.CylinderGeometry(1, 1, 4, 32);
const bodyMat = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.rotation.z = Math.PI / 2;
body.position.set(0, 1, 0);
trainGroup.add(body);

// 運転席（Box）高さを伸ばす
const cabinGeo = new THREE.BoxGeometry(2, 3, 2);
const cabinMat = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const cabin = new THREE.Mesh(cabinGeo, cabinMat);
cabin.position.set(2, 2, 0);
trainGroup.add(cabin);

// 煙突（Cylinder）
const chimneyGeo = new THREE.CylinderGeometry(0.3, 0.3, 1, 32);
const chimneyMat = new THREE.MeshPhongMaterial({ color: 0x663300 });
const chimney = new THREE.Mesh(chimneyGeo, chimneyMat);
chimney.position.set(-1.5, 2.2, 0);
trainGroup.add(chimney);

// 車輪（左右）角度修正
const wheelGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.3, 32);
const wheelMat = new THREE.MeshPhongMaterial({ color: 0xff0000 });

const wheelL = new THREE.Mesh(wheelGeo, wheelMat);
wheelL.rotation.x = Math.PI / 2;
wheelL.position.set(1.5, 0.5, -1.1);
trainGroup.add(wheelL);

const wheelR = new THREE.Mesh(wheelGeo, wheelMat);
wheelR.rotation.x = Math.PI / 2;
wheelR.position.set(1.5, 0.5, 1.1);
trainGroup.add(wheelR);

scene.add(trainGroup);

function animate() {
  requestAnimationFrame(animate);
  trainGroup.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();

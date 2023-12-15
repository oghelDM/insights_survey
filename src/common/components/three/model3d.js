import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let renderer, scene, camera, controls;
let width, height;

export const setup = (root) => {
	width = root.getBoundingClientRect().width;
	height = root.getBoundingClientRect().height;

	//RENDERER
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setClearColor(0x000000, 0);

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);

	root.appendChild(renderer.domElement);

	//CAMERA
	camera = new THREE.PerspectiveCamera(
		35,
		width / height,
		0.1, // closest
		3000 // farthest
	);
	camera.position.z = 130;

	controls = new OrbitControls(camera, renderer.domElement);

	//SCENE
	scene = new THREE.Scene();
	// scene.background = new THREE.Color(BLACK);

	//LIGHTS
	// const spotLight1 = new THREE.SpotLight(0xffffff, 5.55);
	// spotLight1.position.x = 10;
	// scene.add(spotLight1);
	const light = new THREE.AmbientLight(0xffffff, 3);
	scene.add(light);

	const loader = new GLTFLoader();

	// http://localhost:4000/src/assets/3dmodels/luffy_hat.glb
	// /src/assets/3dmodels/
	// luffy_hat.glb
	// ../src/assets/3dmodels/luffy_hat.glb
	// xps-13-9320-laptop-gp-AR.glb
	// https://statics.dmcdn.net/d/TESTS/fwk/assets/luffy_hat.glb

	loader.load(
		"https://statics.dmcdn.net/d/TESTS/fwk/assets/luffy_hat.glb",
		(gltf) => {
			console.log("gltf.scene: ", gltf.scene);
			gltf.scene.scale.set(40, 40, 40);
			scene.add(gltf.scene);
		},
		undefined,
		(error) => {
			console.error(error);
		}
	);

	window.addEventListener("resize", onWindowResize);

	render();
};

//
const onWindowResize = () => {
	width = window.innerWidth;
	height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize(width, height);
};

const resetTimers = () => {
	clearTimeout(timeoutId);
	clearInterval(intervalId);
	rotationStrengthTarget = 0;
	timeoutId = setTimeout(() => (rotationStrengthTarget = 1), 2500);
};

// const controls = new OrbitControls(camera, renderer.domElement);

// RENDER LOOP
const render = () => {
	renderer.render(scene, camera);

	requestAnimationFrame(render);

	// console.log('render')
};

const data = { setup };

export default data;

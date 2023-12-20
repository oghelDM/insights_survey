import * as THREE from "three";

import { ComponentBaseType } from "@/types";
import { getClientXY, map } from "@/utils/helper";

export interface DepthMapType extends ComponentBaseType {
	imageUrl: string;
	depthMapUrl: string;
}

const VERTEX_SHADER = `
	varying vec2 vUv;
	uniform vec2 uResolution;

	void main() {
		vec3 p = position;// x from -w/2 to w/2, y from -h/2 to h/2
		
		vec4 mvPosition = modelViewMatrix * vec4( p, 1.0 );
		gl_Position = projectionMatrix * mvPosition;

		vUv = (uv - vec2(.5)) * uResolution.xy + vec2(0.5);
	}
`;

const FRAGMENT_SHADER = `
	varying vec2 vUv;

	uniform vec2 uAmplitude;
	uniform sampler2D uTexture;
	uniform sampler2D uDepthMapTexture;

	void main() {
		vec2 offset = texture2D(uDepthMapTexture, vUv).rg;

		float power = .6;
		offset = vec2(pow(offset.x, power), pow(offset.y, power));

		vec4 color = texture2D(uTexture, vUv - offset.rg * uAmplitude);

		gl_FragColor = vec4( color.rgb, 1. );
	}
`;

const MAX_AMPLITUDE = 0.016;

export class DepthMap extends HTMLElement {
	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private camera: THREE.OrthographicCamera;
	private canvas: HTMLCanvasElement;
	private material: THREE.ShaderMaterial;
	private width: number;
	private height: number;
	private w = 1; // width of the plane geometry
	private h = 1; // height of the plane geometry

	private amplitude = [0, 0]; // x and y amplitude of the depth map effect
	private amplitudeTarget = [0, 0];
	private time = 0;
	private isUserInteracting = false;

	constructor(props: DepthMapType, styleProps: any = {}) {
		super();

		this.setAttribute("id", props.id);

		const style = {
			position: "absolute",
			width: "100%",
			height: "100%",
			backgroundColor: "transparent",
			left: 0,
			top: 0,
			touchAction: "pinch-zoom",
			...styleProps,
		};
		for (const [key, value] of Object.entries(style)) {
			(this.style as any)[key] = value;
		}
	}

	private init = () => {
		const { width, height } = this.getBoundingClientRect();
		this.width = width;
		this.height = height;

		this.renderer = new THREE.WebGLRenderer({
			antialias: false,
			preserveDrawingBuffer: true,
		});
		this.renderer.setPixelRatio(window.devicePixelRatio ?? 1);
		this.renderer.setSize(this.width, this.height);
		// this.renderer.setClearColor(BLACK, 1);

		this.canvas = this.renderer.domElement;
		this.canvas.width = Math.ceil(width);
		this.canvas.height = height;
		this.canvas.style.width = `${Math.ceil(width)}px`;
		this.canvas.style.height = `${height}px`;
		this.appendChild(this.canvas);

		this.camera = new THREE.OrthographicCamera(
			-this.w / 2,
			this.w / 2,
			this.h / 2,
			-this.h / 2,
			-1,
			1
		);

		this.scene = new THREE.Scene();
		this.scene.add(this.camera);

		const imgW = 1920;
		const imgH = 1080;
		const imageAspect = imgH / imgW;
		let a1 = 1;
		let a2 = 1;
		if (height / width > imageAspect) {
			a1 = (width / height) * imageAspect;
		} else {
			a2 = height / width / imageAspect;
		}

		const imgTexture = new THREE.TextureLoader().load(
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/depthMap/avatar.png"
		);
		const depthTexture = new THREE.TextureLoader().load(
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/depthMap/avatar-depthMap.png"
		);
		imgTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
		depthTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				uTexture: { value: imgTexture },
				uDepthMapTexture: { value: depthTexture },
				uResolution: { value: new THREE.Vector2(a1, a2) },
				uAmplitude: { value: this.amplitude },
			},
			side: THREE.DoubleSide,
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_SHADER,
			transparent: true,
			// wireframe: true,
		});

		const geometry = new THREE.PlaneGeometry(this.w, this.h, 1, 1);
		const mesh = new THREE.Mesh(geometry, this.material);
		this.scene.add(mesh);

		this.canvas.addEventListener("pointermove", this.pointerMove);
		window.addEventListener("resize", this.onWindowResize);

		// allows the devicePixelRatio to work properly :/
		this.onWindowResize();
		this.render();
	};

	// called when the HTMLElement is added to the document
	connectedCallback() {
		this.init();
	}

	onWindowResize = () => {
		const { width, height } = this.getBoundingClientRect();
		this.width = width;
		this.height = height;

		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
		// this prevents canvas flickering
		this.renderer.render(this.scene, this.camera);
	};

	pointerMove = (e: PointerEvent) => {
		const boundingClientRect = this.getBoundingClientRect();
		const { x, y } = getClientXY(e, boundingClientRect);
		const xx = map(x, 0, boundingClientRect.width, -1, 1) * MAX_AMPLITUDE;
		const yy = map(y, 0, boundingClientRect.height, 1, -1) * MAX_AMPLITUDE;
		this.isUserInteracting = true;
		this.amplitudeTarget = [xx, yy];
	};

	private render = () => {
		this.renderer.render(this.scene, this.camera);

		if (!this.isUserInteracting) {
			this.amplitudeTarget[0] =
				Math.cos(this.time * 0.05) * MAX_AMPLITUDE;
			this.amplitudeTarget[1] =
				Math.sin(this.time * 0.05) * MAX_AMPLITUDE;
		}
		this.amplitude[0] +=
			(this.amplitudeTarget[0] - this.amplitude[0]) * 0.1;
		this.amplitude[1] +=
			(this.amplitudeTarget[1] - this.amplitude[1]) * 0.1;

		this.time += 1;
		setTimeout(() => this.render(), 1000 / 60);
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-depth-map", DepthMap);

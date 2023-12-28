import * as THREE from "three";

import { ComponentBaseType } from "@/types";
import { getClientXY, map } from "@/utils/helper";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface DepthMapType extends ComponentBaseType {
	imageUrl: string;
	depthMapUrl: string;
}

const PLANE_H = 90;
const PLANE_DETAIL_H = 200;

const VERTEX_SHADER = `
	uniform vec2 uAmplitude;
	uniform vec2 uResolution;
	uniform sampler2D uDepthMapTexture;

	varying vec2 vUv;

	void main() {
		vec3 p = position;// x from -w/2 to w/2, y from -h/2 to h/2

		vUv = (uv - vec2(.5)) * uResolution + vec2(0.5);
		float offset = texture2D(uDepthMapTexture, vUv).r;
		offset = pow(offset, 4.);
		p.x += uAmplitude.x * offset;
		p.y += uAmplitude.y * offset;
		p.z = offset * 20.;
		
		vec4 mvPosition = modelViewMatrix * vec4( p, 1.0 );
		gl_Position = projectionMatrix * mvPosition;
	}
`;

const FRAGMENT_SHADER = `
	varying vec2 vUv;

	uniform sampler2D uTexture;
	uniform sampler2D uDepthMapTexture;

	void main() {
		float offset = texture2D(uDepthMapTexture, vUv).r;
		vec4 color = texture2D(uTexture, vUv);

		gl_FragColor = vec4( vec3(1.,0.,0.), 1. );
		gl_FragColor = vec4( color.rgb, 1. );
	}
`;

export class DepthMap extends HTMLElement {
	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private canvas: HTMLCanvasElement;
	private mesh: THREE.Mesh;
	private width: number;
	private height: number;

	private amplitude = [0, 0]; // x and y amplitude of the depth map effect
	private target = [0, 0]; // smooth effect
	private time = 0;
	private isUserInteracting = false;
	private timeoutId: number;
	private uniforms: any;

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
			antialias: true,
		});

		this.canvas = this.renderer.domElement;
		this.canvas.width = Math.ceil(width);
		this.canvas.height = height;
		this.canvas.style.width = `${Math.ceil(width)}px`;
		this.canvas.style.height = `${height}px`;
		this.appendChild(this.canvas);

		this.renderer.setSize(this.width, this.height);
		this.renderer.setPixelRatio(window.devicePixelRatio ?? 1);

		this.camera = new THREE.PerspectiveCamera(40, width / height, 1, 10000);
		this.camera.position.z = 110;

		this.scene = new THREE.Scene();

		this.uniforms = {
			uAmplitude: { value: [...this.amplitude] },
		};

		[
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/depthMap/avatar-depthMap.png",
			"https://statics.dmcdn.net/d/TESTS/fwk/assets/depthMap/avatar.png",
		].forEach((url, i) => {
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.src = url;
			img.onload = (e) => this.prepareTexture(e.target, i === 0);
		});

		// new OrbitControls(this.camera, this.renderer.domElement);
	};

	prepareTexture = (img: EventTarget | null, isDepthMap: boolean) => {
		if (!img) {
			return;
		}
		const { naturalWidth: imgW, naturalHeight: imgH } =
			img as HTMLImageElement;
		const imageAspect = imgH / imgW;
		let a1 = 1;
		let a2 = 1;
		if (this.height / this.width > imageAspect) {
			a1 = (this.width / this.height) * imageAspect;
		} else {
			a2 = this.height / this.width / imageAspect;
		}

		const texture = new THREE.Texture(img);
		texture.needsUpdate = true;

		this.uniforms[isDepthMap ? "uDepthMapTexture" : "uTexture"] = {
			value: texture,
		};
		this.uniforms.uResolution = {
			value: [a1, a2],
		};

		if (this.uniforms.uTexture && this.uniforms.uDepthMapTexture) {
			const geometry = new THREE.PlaneGeometry(
				(PLANE_H * this.width) / this.height,
				PLANE_H,
				(PLANE_DETAIL_H * this.width) / this.height,
				PLANE_DETAIL_H
			);

			const material = new THREE.ShaderMaterial({
				uniforms: this.uniforms,
				vertexShader: VERTEX_SHADER,
				fragmentShader: FRAGMENT_SHADER,
				side: THREE.DoubleSide,
				// wireframe: true,
			});

			this.mesh = new THREE.Mesh(geometry, material);
			this.scene.add(this.mesh);

			window.addEventListener("pointermove", this.pointerMove);
			window.addEventListener("resize", this.onWindowResize);

			this.render();
		}
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
		const { x, y } = getClientXY(e);
		const { innerWidth, innerHeight } = window;

		this.target[0] = map(x, 0, innerWidth, -1, 1);
		this.target[1] = map(y, 0, innerHeight, -1, 1);

		this.isUserInteracting = true;

		window.clearTimeout(this.timeoutId);
		this.timeoutId = window.setTimeout(
			() => (this.isUserInteracting = false),
			1500
		);
	};

	private render = () => {
		this.renderer.render(this.scene, this.camera);

		if (!this.isUserInteracting) {
			const MAX_AMPLITUDE = 0.6;
			this.target[0] = Math.cos(this.time * 0.036) * MAX_AMPLITUDE;
			this.target[1] = Math.sin(this.time * 0.036) * MAX_AMPLITUDE;
		}

		this.amplitude[0] += (this.target[0] - this.amplitude[0]) * 0.1;
		this.amplitude[1] += (this.target[1] - this.amplitude[1]) * 0.1;

		const translateMax = 6; // vertex translation amplitude
		this.uniforms.uAmplitude = {
			value: [
				map(this.amplitude[0], -1, 1, -translateMax, translateMax),
				map(this.amplitude[1], -1, 1, translateMax, -translateMax),
			],
		};

		const rotMax = -0.06; // rotation amplitude
		this.mesh.rotation.x = map(this.amplitude[1], -1, 1, -rotMax, rotMax);
		this.mesh.rotation.y = map(this.amplitude[0], -1, 1, -rotMax, rotMax);

		this.time += 1;
		setTimeout(() => this.render(), 1000 / 60);
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-depth-map", DepthMap);

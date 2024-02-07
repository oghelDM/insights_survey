import { CssType } from "@/types";
import { keepSafe } from "@/utils/helper";
import { createDiv } from "../../utils/divMaker";
import { BaseComponent } from "../BaseComponent";
import { CollectionType, defaultValuesCollection } from "./defaultValues";

export class Collection extends BaseComponent {
	protected cleanProps: Required<CollectionType>;
	private products: HTMLElement[];
	private nbProducts: number;
	private isAnimationPlaying = false;
	private currIdx = 0; // the index of the currently displayed product
	private autoPlayTimeoutId: number | undefined;
	private autoPlayIntervalId: number | undefined;

	constructor(props: CollectionType, style: CssType = {}) {
		super(props, {
			position: "absolute",
			height: "100%",
			width: "100%",
			backgroundColor: props.debug ? "#00ff88ff" : "unset",
			...style,
		});

		this.init(props);
	}

	public init = (props: CollectionType) => {
		this.cleanProps = {
			...defaultValuesCollection,
			...props,
		};

		const {
			productUrls,
			id,
			clickUrls,
			onClick,
			styleProductFocused,
			startIndex,
			arrows,
			debug,
			fadeObjects,
			autoPlay,
		} = this.cleanProps;

		this.nbProducts = productUrls.length;
		this.currIdx = keepSafe(startIndex, this.nbProducts);

		this.products = productUrls.map((url, index) => {
			const isCurrentProduct = index === this.currIdx;
			const element = createDiv(`${id}-product-${index}`, {
				...styleProductFocused,
				backgroundImage: `url(${url})`,
				outline: debug ? "1px solid pink" : "unset",
				pointerEvents:
					clickUrls[this.currIdx] && isCurrentProduct
						? "auto"
						: "none",
				cursor: clickUrls[index] ? "pointer" : "unset",
				opacity: isCurrentProduct ? "1" : "0",
			});

			// position the elements behind the interactive div
			// this.insertBefore(element, this.childNodes[0]);
			this.appendChild(element);
			if (clickUrls[index]) {
				element.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					onClick(clickUrls[index]);
				});
			}
			return element;
		});
		// make sure the first product is above all other ones
		this.appendChild(this.products[this.currIdx]);

		// initialize fadeObjects opacity
		fadeObjects.forEach((elements, i) =>
			elements.forEach(
				(element) =>
					(element.style.opacity = i === this.currIdx ? "1" : "0")
			)
		);

		arrows.forEach((arrow, i) =>
			arrow.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				window.clearTimeout(this.autoPlayTimeoutId);
				window.clearInterval(this.autoPlayIntervalId);
				if (i === 0) {
					this.goToPrevious();
				} else {
					this.goToNext();
				}
			})
		);

		window.clearTimeout(this.autoPlayTimeoutId);
		window.clearInterval(this.autoPlayIntervalId);
		if (autoPlay) {
			this.startAutoPlay();
		}
	};

	public goToPrevious = () => this.startAnimation(true);

	public goToNext = () => this.startAnimation(false);

	public startAutoPlay = (
		delay: number = 3,
		frequency: number = 1.5
	): void => {
		this.autoPlayTimeoutId = window.setTimeout(
			() =>
				(this.autoPlayIntervalId = window.setInterval(
					() => this.startAnimation(true),
					frequency * 1000
				)),
			delay
		);
	};

	private startAnimation = (isLeft: boolean) => {
		if (this.isAnimationPlaying) {
			return;
		}

		const {
			styleProductFocused,
			styleProductOutLeft,
			styleProductOutRight,
			styleProductInLeft,
			styleProductInRight,
			introAnimationProperties,
			outroAnimationProperties,
			fadeObjects,
		} = this.cleanProps;

		const nextIdx = keepSafe(
			this.currIdx + (isLeft ? -1 : 1),
			this.nbProducts
		);
		const currProduct = this.products[this.currIdx];
		const nextProduct = this.products[nextIdx];
		this.appendChild(nextProduct);

		nextProduct.style.pointerEvents = "auto";
		currProduct.style.pointerEvents = "none";

		// // make sure to reset the css properties
		// currProduct.getAnimations()[0]?.cancel();
		// nextProduct.getAnimations()[0]?.cancel();
		// for (const [key, value] of Object.entries(styleProductFocused)) {
		// 	(nextProduct.style as any)[key] = value;
		// }

		let animDoneCounter = 0;
		const animationDone = () => {
			animDoneCounter += 1;
			if (animDoneCounter === 2) {
				this.currIdx = nextIdx;
				this.isAnimationPlaying = false;
			}
		};

		this.isAnimationPlaying = true;
		const outroAnim = currProduct.animate(
			[
				styleProductFocused,
				isLeft ? styleProductOutLeft : styleProductOutRight,
			] as any,
			{
				...outroAnimationProperties,
				fill: "forwards",
				iterations: 1,
			}
		);
		const introAnim = nextProduct.animate(
			[
				isLeft ? styleProductInRight : styleProductInLeft,
				styleProductFocused,
			] as any,
			{
				...introAnimationProperties,
				fill: "forwards",
				iterations: 1,
			}
		);

		const currFadeObjects = fadeObjects[this.currIdx];
		currFadeObjects?.forEach((fadeObject) =>
			fadeObject.animate([{ opacity: "1" }, { opacity: "0" }], {
				...outroAnimationProperties,
				fill: "forwards",
				iterations: 1,
			})
		);
		const nextFadeObjects = fadeObjects[nextIdx];
		nextFadeObjects?.forEach((fadeObject) =>
			fadeObject.animate([{ opacity: "0" }, { opacity: "1" }], {
				...introAnimationProperties,
				fill: "forwards",
				iterations: 1,
			})
		);

		outroAnim.addEventListener("finish", animationDone);
		introAnim.addEventListener("finish", animationDone);
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-collection", Collection);

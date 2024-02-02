import { createDiv } from "../../utils/divMaker";
import { CollectionType, defaultValuesCollection } from "./defaultValues";

export class Collection extends HTMLElement {
	protected cleanProps: Required<CollectionType>;
	private products: HTMLElement[];
	private nbProducts: number;
	private isAnimationPlaying = false;
	private currIdx = 0; // the index of the currently displayed product
	private nextIdx = 0; // the index of the incoming product

	constructor(props: CollectionType, style: any = {}) {
		super();

		this.init(props, style);
	}

	public init = (props: CollectionType, style: any = {}) => {
		this.cleanProps = {
			...defaultValuesCollection,
			...props,
		};

		const {
			productUrls: products,
			id,
			clickUrls,
			onClick,
			focusedProductStyle,
			startIndex,
			arrows,
		} = this.cleanProps;

		this.currIdx = startIndex;

		this.products = products.map((url, index) => {
			const element = createDiv(`${id}-${index}`, {
				...focusedProductStyle,
				backgroundImage: `url(${url})`,
				outline: this.cleanProps.debug ? "1px solid pink" : "unset",
				/* added to fix webkit bug jitter */
				"-webkit-backface-visibility": "hidden",
				"-webkit-transform": "perspective(1000px)",
			});

			// position the elements behind the interactive div
			this.insertBefore(element, this.childNodes[0]);
			if (clickUrls[index]) {
				element.addEventListener("click", (e) => {
					console.log("click on product: ", index);
					e.preventDefault();
					e.stopPropagation();
					onClick(clickUrls[index]);
				});
			}
			return element;
		});
		this.nbProducts = products.length;

		arrows.forEach((arrow, i) =>
			arrow.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				// this.stopAutoPlay();
				// this.moveIndexBy(i === 0 ? 1 : -1);
			})
		);
	};

	private animateYo = (domElem: HTMLElement, isRight: boolean): Animation =>
		domElem.animate(
			[{ left: isRight ? "-100%" : "100%" }, { left: "0%" }],
			{
				// delay: delay,
				duration: 460,
				fill: "forwards",
				easing: "cubic-bezier(.01,.58,.17,1)",
				iterations: 1,
			}
		);

	private animateCSS = (
		currProduct: HTMLElement,
		nextProduct: HTMLElement,
		isRight: boolean
	) => {
		currProduct.style.opacity = "1";
		nextProduct.style.opacity = "1";
		const animation = this.animateYo(nextProduct, isRight);
		animation.addEventListener("finish", () =>
			this.animationEnd(currProduct, nextProduct)
		);
	};

	private animationEnd = (
		currProduct: HTMLElement,
		nextProduct: HTMLElement
	) => {
		this.isAnimationPlaying = false;
		nextProduct.style.left = "0";
		currProduct.style.opacity = "0";
		this.currIdx = this.nextIdx;
	};
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-collection", Collection);

export class ImageDM extends HTMLElement {
	constructor(id: string, imageUrl: string, style: any = {}) {
		super();

		this.setAttribute("id", id);

		const actualStyle = {
			display: "block",
			position: "absolute",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			width: "100%",
			height: "100%",
			left: null,
			top: null,
			right: null,
			bottom: null,
			borderRadius: "0px",
			opacity: 1,
			scale: 1,
			rotate: 0,
			backgroundColor: null,
			aspectRatio: "auto",

			...style,
			backgroundImage: `url(${imageUrl})` || null,
		};

		for (const [key, value] of Object.entries(actualStyle)) {
			(this.style as any)[key] = value;
		}
	}
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-image", ImageDM);

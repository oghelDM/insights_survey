export const hotSpotBounce = (
	domElem: HTMLElement,
	duration: number,
	delay = 0
) =>
	domElem.animate(
		[
			{ transform: "scale(1)" },
			{ transform: "scale(1.1)" },
			{ transform: "scale(1)" },
		],
		{
			delay,
			duration,
			fill: "forwards",
			easing: "ease-out",
			iterations: Infinity,
		}
	);

export const bounceIn = (domElem: HTMLElement, duration: number, delay = 0) =>
	domElem.animate(
		[
			{ transform: "scale(0)" },
			{ transform: "scale(1.05)" },
			{ transform: "scale(0.95)" },
			{ transform: "scale(1)" },
		],
		{
			delay,
			duration,
			fill: "forwards",
			easing: "ease-out",
		}
	);

export const bounceOut = (domElem: HTMLElement, duration: number, delay = 0) =>
	domElem.animate(
		[
			{ transform: "scale(1)" },
			{ transform: "scale(1.1)" },
			{ transform: "scale(0)" },
		],
		{
			delay,
			duration,
			fill: "forwards",
			easing: "ease-out",
		}
	);

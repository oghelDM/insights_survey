import { VPAIDVideoPlayer } from "@app";
import { ImageDM } from "@/components/image";
import { bounceIn, rotate } from "@/animations";
import { Creative, CreativeProps } from "@/creative";
import { random12, trackPixel } from "@/utils/helper";
import { CarouselBasic } from "@/components/carouselBasic";

const ALL_DATA = {
	en: {
		assetsUrl: "EN/1",
		redirection:
			"https://ad.doubleclick.net/ddm/trackclk/N884815.132420DAILYMOTION/B31092848.385708328;dc_trk_aid=576817442;dc_trk_cid=208350023;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
		productFloodlights: [
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot002;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot003;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot004;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot005;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot006;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		],
		ctaFloodlight:
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		arrowFloodlights: [
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot00b;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot00c;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		],
	},
	es: {
		assetsUrl: "ES/1",
		redirection:
			"https://ad.doubleclick.net/ddm/trackclk/N884815.132420DAILYMOTION/B31350486.385714214;dc_trk_aid=576888921;dc_trk_cid=208852488;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1",
		productFloodlights: [
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot007;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot008;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot009;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot00-;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot00a;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		],
		ctaFloodlight:
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		arrowFloodlights: [
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot00d;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
			"https://ad.doubleclick.net/ddm/activity/src=13942653;type=invmedia;cat=fllot00e;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		],
	},
};

const data = ALL_DATA.es;

const shineCoordinates = [
	[
		{ left: 25, bottom: 83.5, width: 2 },
		{ left: 56, bottom: 83, width: 3 },
		{ left: 72, bottom: 65, width: 2 },
		{ left: 30, bottom: 45, width: 2 },
		{ left: 57, bottom: 25.5, width: 3 },
		{ left: 21, bottom: 0, width: 2 },
	],
	[
		{ left: 25, bottom: 83.5, width: 2 },
		{ left: 56, bottom: 83, width: 3 },
		{ left: 72, bottom: 65, width: 2 },
		{ left: 30, bottom: 45, width: 2 },
		{ left: 57, bottom: 25.5, width: 3 },
		{ left: 21, bottom: 0, width: 2 },
	],
	[
		{ left: 25, bottom: 83.5, width: 2 },
		{ left: 56, bottom: 83, width: 3 },
		{ left: 72, bottom: 65, width: 2 },
		{ left: 30, bottom: 45, width: 2 },
		{ left: 57, bottom: 25.5, width: 3 },
		{ left: 21, bottom: 5, width: 2 },
	],
	[
		{ left: 56, bottom: 33, width: 3 },
		{ left: 25, bottom: 53.5, width: 2 },
		{ left: 72, bottom: 65, width: 2 },
		{ left: 30, bottom: 45, width: 2 },
		{ left: 21, bottom: 60, width: 2 },
		{ left: 40, bottom: 25.5, width: 3 },
	],
	[
		{ left: 25, bottom: 50, width: 2 },
		{ left: 65, bottom: 45.5, width: 3 },
		{ left: 72, bottom: 60, width: 2 },
		{ left: 56, bottom: 33, width: 3 },
		{ left: 21, bottom: 40, width: 2 },
		{ left: 30, bottom: 55, width: 2 },
	],
];

class MyCreative extends Creative {
	constructor(root: HTMLElement, { onClick }: CreativeProps) {
		super();
		const clickUrl = data.redirection;

		// BG
		const bg = new ImageDM(
			"bg-dm",
			`https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/elements.png`
		);
		root.appendChild(bg);
		bg.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			onClick(clickUrl);
		});

		const cta = new ImageDM(
			"cta-dm",
			`https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/cta.png`,
			{
				width: "24%",
				height: "8%",
				left: "45%",
				bottom: "11%",
				backgroundSize: "contain",
				cursor: "pointer",
				scale: "0",
			}
		);
		root.appendChild(cta);
		cta.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			onClick(clickUrl);
			trackPixel(data.ctaFloodlight);
		});
		bounceIn(cta, 450, 400);

		const fadeObjects = shineCoordinates.map((stars) =>
			stars.map(({ left, bottom, width }, i) => {
				const star = new ImageDM(
					`star-${i}-id`,
					`https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/shine.png`,
					{
						width: `${width * 3}%`,
						height: "unset",
						aspectRatio: "1 / 1",
						left: `${left}%`,
						bottom: `${bottom}%`,
						opacity: "0",
					}
				);

				rotate(star, random12(3000, 7500));

				return star;
			})
		);

		// CAROUSEL component
		const carousel = new CarouselBasic(
			{
				id: "carousel-dm",
				productUrls: [
					`https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/product_0.png`,
					`https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/product_1.png`,
					`https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/product_2.png`,
					`https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/product_3.png`,
					`https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/product_4.png`,
				],
				floodlights: data.productFloodlights,
				focusedElementWidth: 100,
				focusedElementHeight: 100,
				debug: false,
				gap: 20,
				onClick,
				clickUrl,
				fadeObjects,
				autoPlay: true,
			},
			{ width: "34%", height: "83%", right: "0" }
		);
		root.appendChild(carousel);

		fadeObjects.flat().forEach((star) => {
			carousel.appendChild(star);
			star.animate(
				[
					{ scale: 0 },
					{ scale: 1 },
					{ scale: 1 },
					{ scale: 1 },
					{ scale: 1 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
					{ scale: 0 },
				],
				{
					delay: random12(0, 1200),
					duration: 1000, //random12(1000, 2000),
					fill: "forwards",
					easing: "linear",
					iterations: Infinity,
				}
			);
		});

		["left", "right"].forEach((name, i) => {
			const btn = new ImageDM(
				`arrow-${name}-id`,
				`https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/arrow.png`,
				{
					width: "13%",
					height: "unset",
					aspectRatio: "1 / 1",
					left: i === 0 ? "3%" : "unset",
					right: i === 1 ? "3%" : "unset",
					top: "43%",
					userSelect: "none",
					cursor: "pointer",
					transform: i === 0 ? "unset" : "rotate(180deg)",
				}
			);
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				carousel.stopAutoPlay();
				carousel.moveIndexBy(i === 0 ? 1 : -1);
				trackPixel(data.arrowFloodlights[i]);
			});
			carousel.appendChild(btn);
		});
	}

	public getVideos() {
		return {
			low: `https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/video_low.mp4`,
			mid: `https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/video_mid.mp4`,
			high: `https://statics.dmcdn.net/d/PRODUCTION/2024/Lotteries_Scratchcards_Florida_Lottery_Xtreme_Interactive_Custom_Carousel_2401_CAMPAIGN_EN_15s/assets/${data.assetsUrl}/video_high.mp4`,
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);

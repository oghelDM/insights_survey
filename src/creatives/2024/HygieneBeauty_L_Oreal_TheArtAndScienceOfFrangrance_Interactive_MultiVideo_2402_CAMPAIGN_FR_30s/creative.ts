import { VPAIDVideoPlayer } from "@app";
import { trackPixel } from "@/utils/helper";
import { ImageDM } from "@/components/image";
import { createDiv } from "@/utils/divMaker";
import { Creative, CreativeProps } from "@/creative";

const ASSET_URL_PREFIX =
	"https://statics.dmcdn.net/d/PRODUCTION/2024/HygieneBeauty_L_Oreal_TheArtAndScienceOfFrangrance_Interactive_MultiVideo_2402_CAMPAIGN_FR_30s/assets5/";
const DATA = [
	{
		videoSrc: `${ASSET_URL_PREFIX}video0_low.mp4`,
		bgUrl: `${ASSET_URL_PREFIX}element0.png`,
		completionFloodlights: ["", "", "", ""],
		productRedirect:
			"https://www.loreal.com/fr/articles/brands/the-art-and-science-of-fragrance/?utm_source=dailymotion&utm_medium=social_video_paid&utm_content=oa_brde_none_video_aw&utm_campaign=oa_brde_none_fragrance-fr-fr_craftingtheingredient30s_ctcomm",
		floodlightRedirect:
			"https://ad.doubleclick.net/ddm/activity/src=14129555;type=invmedia;cat=opslo004;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		cardClickFloodlight:
			"https://ad.doubleclick.net/ddm/activity/src=14129555;type=invmedia;cat=opslo007;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
	},
	{
		videoSrc: `${ASSET_URL_PREFIX}video1_low.mp4`,
		bgUrl: `${ASSET_URL_PREFIX}element1.png`,
		completionFloodlights: ["", "", "", ""],
		productRedirect:
			"https://www.loreal.com/fr/articles/brands/the-art-and-science-of-fragrance/?utm_source=dailymotion&utm_medium=social_video_paid&utm_content=oa_brde_none_video_aw&utm_campaign=oa_brde_none_fragrance-fr-fr_pioneeringthroughscience30s_ctcomm",
		floodlightRedirect:
			"https://ad.doubleclick.net/ddm/activity/src=14129555;type=invmedia;cat=opslo005;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		cardClickFloodlight:
			"https://ad.doubleclick.net/ddm/activity/src=14129555;type=invmedia;cat=opslo001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
	},
	{
		videoSrc: `${ASSET_URL_PREFIX}video2_low.mp4`,
		bgUrl: `${ASSET_URL_PREFIX}element2.png`,
		completionFloodlights: ["", "", "", ""],
		productRedirect:
			"https://www.loreal.com/fr/articles/brands/the-art-and-science-of-fragrance/?utm_source=dailymotion&utm_medium=social_video_paid&utm_content=oa_brde_none_video_aw&utm_campaign=oa_brde_none_fragrance-fr-fr_unleashingcreativity30s_ctcomm",
		floodlightRedirect:
			"https://ad.doubleclick.net/ddm/activity/src=14129555;type=invmedia;cat=opslo006;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		cardClickFloodlight:
			"https://ad.doubleclick.net/ddm/activity/src=14129555;type=invmedia;cat=opslo002;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
	},
	{
		videoSrc: `${ASSET_URL_PREFIX}video3_low.mp4`,
		bgUrl: `${ASSET_URL_PREFIX}element3.png`,
		completionFloodlights: ["", "", "", ""],
		productRedirect:
			"https://www.loreal.com/fr/articles/brands/the-art-and-science-of-fragrance/?utm_source=dailymotion&utm_medium=social_video_paid&utm_content=oa_brde_none_video_aw&utm_campaign=oa_brde_none_fragrance-fr-fr_dream15s_ctcomm",
		floodlightRedirect:
			"https://ad.doubleclick.net/ddm/activity/src=14129555;type=invmedia;cat=opslo008;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
		cardClickFloodlight:
			"https://ad.doubleclick.net/ddm/activity/src=14129555;type=invmedia;cat=opslo003;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?",
	},
];

class MyCreative extends Creative {
	private currIdx = 0; //the current video index, starts at 0
	private playBtns: HTMLElement[] = [];
	private videosContainer2: HTMLElement;
	private currentFloodlightIndex = 0;
	private creativeProps: CreativeProps;
	private clickUrl =
		"https://www.loreal.com/fr/articles/brands/the-art-and-science-of-fragrance/?utm_source=dailymotion&utm_medium=social_video_paid&utm_content=oa_brde_none_video_aw&utm_campaign=oa_brde_none_fragrance-fr-fr_craftingtheingredient30s_ctcomm";
	private floodlightRedirect = "";

	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		this.creativeProps = creativeProps;

		const bg = new ImageDM("bg", `${ASSET_URL_PREFIX}bg.png`);
		root.appendChild(bg);

		const videosContainer = createDiv("videos-container", {
			position: "absolute",
			width: "20%",
			height: "70%",
			right: "5%",
			top: "10%",
			overflow: "hidden",
			// backgroundColor: "crimson",
		});

		["up", "down"].forEach((name, i) => {
			const arrow = new ImageDM(
				`arrow-${name}`,
				`${ASSET_URL_PREFIX}fleche.png`,
				{
					width: "20%",
					height: "3%",
					right: "5%",
					top: i === 0 ? "5%" : "82%",
					backgroundSize: "contain",
					rotate: i === 0 ? "0deg" : "180deg",
					cursor: "pointer",
					// backgroundColor: "yellow",
				}
			);
			arrow.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.videosContainer2.style.top = i === 0 ? "0%" : "-10%";
				trackPixel(
					i === 0
						? "https://ad.doubleclick.net/ddm/activity/src=14129555;type=invmedia;cat=opslo00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
						: "https://ad.doubleclick.net/ddm/activity/src=14129555;type=invmedia;cat=opslo000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
				);
			});
			root.appendChild(arrow);
		});

		this.videosContainer2 = createDiv("videos-container-2", {
			position: "absolute",
			width: "90%",
			height: "100%",
			left: "5%",
			top: "0%",
			transition: "top .4s",
			// backgroundColor: "lavender",
		});

		DATA.forEach(
			(
				{
					bgUrl,
					productRedirect,
					cardClickFloodlight,
					floodlightRedirect,
				},
				i
			) => {
				const card = new ImageDM(`card-${i}`, bgUrl, {
					width: "100%",
					height: "auto",
					aspectRatio: "323 / 182",
					top: `${i * 28}%`,
					cursor: "pointer",
				});
				const playBtn = new ImageDM(
					`play-${i}`,
					`${ASSET_URL_PREFIX}play.png`,
					{
						width: "100%",
						height: "100%",
						backgroundSize: "30%",
						opacity: i === this.currIdx ? "0" : "1",
						transition: "opacity .4s",
					}
				);
				card.addEventListener("click", (e) => {
					this.setupVideo(e, i);

					this.floodlightRedirect = floodlightRedirect;
					this.clickUrl = productRedirect;

					trackPixel(cardClickFloodlight);
				});
				card.appendChild(playBtn);
				this.playBtns.push(playBtn);
				this.videosContainer2.appendChild(card);
			}
		);

		root.appendChild(videosContainer);
		videosContainer.appendChild(this.videosContainer2);

		root.addEventListener("click", () => {
			trackPixel(this.floodlightRedirect);
			this.creativeProps.onClick(this.clickUrl);
		});
	}

	private setupVideo = (e: MouseEvent, index: number) => {
		e.preventDefault();
		e.stopPropagation();

		if (index === this.currIdx) {
			return;
		}

		// move the scroll if necessary
		if (index === 0) {
			this.videosContainer2.style.top = "0%";
		} else if (index === 3) {
			this.videosContainer2.style.top = "-10%";
		}

		this.playBtns[this.currIdx].style.opacity = "1";
		this.playBtns[index].style.opacity = "0";
		this.currentFloodlightIndex = 0; // reset the quartile floodlights
		this.creativeProps.videoSlot.src = DATA[index].videoSrc;
		this.creativeProps.resumeAd();

		this.currIdx = index;
	};

	// public videoTimeUpdate(completionPercent: number): void {
	// 	const completionFloodlights = DATA[this.currIdx].completionFloodlights;
	// 	if (
	// 		!isNaN(completionPercent) &&
	// 		this.currentFloodlightIndex < completionFloodlights.length
	// 	) {
	// 		if (
	// 			completionPercent >=
	// 			Math.min(25 * this.currentFloodlightIndex, 95) // force the last floodlight before the video reaches 100%
	// 		) {
	// 			// trackPixel(completionFloodlights[this.currentFloodlightIndex]);
	// 			this.currentFloodlightIndex += 1;
	// 		}
	// 	}
	// }

	public getVideos() {
		return {
			low: `${ASSET_URL_PREFIX}video0_low.mp4`,
			mid: `${ASSET_URL_PREFIX}video0_mid.mp4`,
			high: `${ASSET_URL_PREFIX}video0_high.mp4`,
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);

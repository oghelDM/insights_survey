import { VPAIDVideoPlayer } from "@app";
import { fetchWeatherApi } from "openmeteo";
import { createDiv } from "@/utils/divMaker";
import { Creative, CreativeProps } from "@/creative";
import { random12, trackPixel } from "@/utils/helper";
import { ImageDM } from "@/components/image";

const DATA = [
	{
		videoSrc:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainment_Canal_Plus_Barbie_OnSite_TakeOver_2402_CAMPAIGN_FR_20s/assets/video_low.mp4",
		bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2024/HygieneBeauty_L_Oreal_TheArtAndScienceOfFrangrance_Interactive_MultiVideo_2402_CAMPAIGN_FR_30s/assets/element0.png",
		completionFloodlights: ["", "", "", ""],
	},
	{
		videoSrc:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Education_ThePower_Formaciones_Interactive_Carousel_2311_CAMPAIGN_FR_30s/assets/video_low.mp4",
		bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2024/HygieneBeauty_L_Oreal_TheArtAndScienceOfFrangrance_Interactive_MultiVideo_2402_CAMPAIGN_FR_30s/assets/element1.png",
		completionFloodlights: ["", "", "", ""],
	},
	{
		videoSrc:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Technology_Computing_Asus_Zenbook14_HotSpots_2402_FR_15s/assets/video_low.mp4",
		bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2024/HygieneBeauty_L_Oreal_TheArtAndScienceOfFrangrance_Interactive_MultiVideo_2402_CAMPAIGN_FR_30s/assets/element2.png",
		completionFloodlights: ["", "", "", ""],
	},
	{
		videoSrc:
			"https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/video_low.mp4",
		bgUrl: "https://statics.dmcdn.net/d/PRODUCTION/2024/HygieneBeauty_L_Oreal_TheArtAndScienceOfFrangrance_Interactive_MultiVideo_2402_CAMPAIGN_FR_30s/assets/element3.png",
		completionFloodlights: ["", "", "", ""],
	},
];

const clickUrl = "click url to replace";

class MyCreative extends Creative {
	private currIdx = 0; //the current video index, starts at 0
	private playBtns: HTMLElement[] = [];
	private videosContainer2: HTMLElement;
	private currentFloodlightIndex = 0;
	private creativeProps: CreativeProps;

	constructor(root: HTMLElement, creativeProps: CreativeProps) {
		super();

		this.creativeProps = creativeProps;

		const bg = new ImageDM(
			"bg",
			"https://statics.dmcdn.net/d/PRODUCTION/2024/HygieneBeauty_L_Oreal_TheArtAndScienceOfFrangrance_Interactive_MultiVideo_2402_CAMPAIGN_FR_30s/assets/bg.png"
		);
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
				"https://statics.dmcdn.net/d/PRODUCTION/2024/HygieneBeauty_L_Oreal_TheArtAndScienceOfFrangrance_Interactive_MultiVideo_2402_CAMPAIGN_FR_30s/assets/fleche.png",
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

		DATA.forEach(({ bgUrl }, i) => {
			const card = new ImageDM(`card-${i}`, bgUrl, {
				width: "100%",
				height: "auto",
				aspectRatio: "323 / 182",
				top: `${i * 28}%`,
				cursor: "pointer",
			});
			const playBtn = new ImageDM(
				`play-${i}`,
				"https://statics.dmcdn.net/d/PRODUCTION/2024/HygieneBeauty_L_Oreal_TheArtAndScienceOfFrangrance_Interactive_MultiVideo_2402_CAMPAIGN_FR_30s/assets/play.png",
				{
					width: "100%",
					height: "100%",
					backgroundSize: "30%",
					opacity: i === this.currIdx ? "0" : "1",
					transition: "opacity .4s",
				}
			);
			card.addEventListener("click", (e) => this.setupVideo(e, i));
			card.appendChild(playBtn);
			this.playBtns.push(playBtn);
			this.videosContainer2.appendChild(card);
		});

		root.appendChild(videosContainer);
		videosContainer.appendChild(this.videosContainer2);

		// root.addEventListener("click", () => onClick(clickUrl));
	}

	private setupVideo = (e: MouseEvent, index: number) => {
		e.preventDefault();
		e.stopPropagation();

		console.log("setupVideo: ", index);
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

	public videoTimeUpdate(completionPercent: number): void {
		const completionFloodlights = DATA[this.currIdx].completionFloodlights;
		if (
			!isNaN(completionPercent) &&
			this.currentFloodlightIndex < completionFloodlights.length
		) {
			if (
				completionPercent >=
				Math.min(25 * this.currentFloodlightIndex, 95) // force the last floodlight before the video reaches 100%
			) {
				trackPixel(completionFloodlights[this.currentFloodlightIndex]);
				this.currentFloodlightIndex += 1;
			}
		}
	}

	public getVideos() {
		return {
			low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/video_low.mp4",
			mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/video_mid.mp4",
			high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/video_high.mp4",
		};
	}
}
customElements.define("dm-creative", MyCreative);

window.getVPAIDAd = () => new VPAIDVideoPlayer(MyCreative);

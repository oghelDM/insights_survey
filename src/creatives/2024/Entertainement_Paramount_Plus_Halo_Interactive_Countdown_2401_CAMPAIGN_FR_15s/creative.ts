import { VPAIDVideoPlayer } from "@app";
import { ImageDM } from "@/components/image";
import { Countdown } from "@/components/Countdown";
import { CreativeHandler, CreativeProps } from "@/types";

const creative: CreativeHandler = (
	root: HTMLElement,
	{ onClick }: CreativeProps
) => {
	const clickUrl =
		"https://ad.doubleclick.net/ddm/trackclk/N5615.280320.DAILYMOTIONFR/B31410726.386379146;dc_trk_aid=577593956;dc_trk_cid=208892177;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1";

	const bg = new ImageDM(
		"bg-DM",
		"https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/bg2.png"
	);
	root.appendChild(bg);

	const date = new Date("Feb 08, 2024 00:00:01");

	const countdown = new Countdown(
		{
			id: "countdown-dm",
			date,
			elementWidth: "3em",
			debug: false,
			clickUrl,
			isOverMessage: " ",
			onClick,
			suffixes: ["s", "m", "h", "j"],
		},
		{
			width: "26%",
			right: "3.95%",
			bottom: "40.5%",
			fontSize: "3vi",
			lineHeight: "4vi",
			textAlign: "center",
		}
	);
	root.appendChild(countdown);

	root.addEventListener("click", () => onClick(clickUrl));
};

window.getVPAIDAd = () =>
	new VPAIDVideoPlayer(creative, {
		low: "https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/video_low.mp4",
		mid: "https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/video_mid.mp4",
		high: "https://statics.dmcdn.net/d/PRODUCTION/2024/Entertainement_Paramount_Plus_Halo_Interactive_Countdown_2401_CAMPAIGN_FR_15s/assets/video_high.mp4",
	});

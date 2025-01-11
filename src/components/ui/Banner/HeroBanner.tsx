/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useGSAP } from "@gsap/react";
import { IconLocation } from "@tabler/icons-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../Button/Button";

interface VideoState {
	currentIndex: number;
	hasClicked: boolean;
	isLoading: boolean;
	loadedVideos: number;
}

const TOTAL_VIDEOS = 4;
const DELAY_TIME = 1000;
const VIDEO_BASE_PATH = "/videos/hero-";

gsap.registerPlugin(ScrollTrigger);

const HeroBanner = (): JSX.Element => {
	const [videoState, setVideoState] = useState<VideoState>({
		currentIndex: 0,
		hasClicked: false,
		isLoading: true,
		loadedVideos: 0,
	});
	const [delayedSource, setDelayedSource] = useState<string>("");
	const nextVideoRef = useRef<HTMLVideoElement>(null);
	const mainVideoRef = useRef<HTMLVideoElement>(null);

	const upcomingVideo = useMemo(
		() => (videoState.currentIndex + 1) % TOTAL_VIDEOS,
		[videoState.currentIndex]
	);

	const getVideoSource = useCallback(
		(index: number): string => `${VIDEO_BASE_PATH}${index + 1}.mp4`,
		[]
	);

	const handleMiniVideoClick = useCallback((): void => {
		setVideoState((previous) => ({
			...previous,
			hasClicked: true,
			isLoading: true,
			currentIndex: upcomingVideo,
		}));
	}, [upcomingVideo]);

	const handleVideoLoaded = useCallback((): void => {
		setVideoState((previous) => ({
			...previous,
			isLoading: false,
		}));
	}, []);

	useGSAP(
		() => {
			if (videoState.hasClicked && nextVideoRef.current) {
				gsap.set("#next-video", { visibility: "visible" });
				gsap.to("#next-video", {
					duration: 0.8,
					ease: "power1.inOut",
					height: "100%",
					onStart: () => {
						void nextVideoRef.current?.play();
					},
					scale: 1,
					transformOrigin: "center center",
					width: "100%",
				});
				gsap.from("#current-video", {
					duration: 1.5,
					ease: "power1.inOut",
					scale: 0,
					transformOrigin: "center center",
				});
			}
		},
		{
			dependencies: [videoState.currentIndex, videoState.hasClicked],
			revertOnUpdate: true,
		}
	);

	useGSAP(() => {
		const startClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
		const endClipPath = "polygon(14% 0, 72% 0, 80% 90%, 0 95%)";

		gsap.set("#video-frame", {
			clipPath: endClipPath,
		});

		gsap.from("#video-frame", {
			clipPath: startClipPath,
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: "#video-frame",
				start: "center center",
				end: "bottom center",
				scrub: true,
			},
		});
	});

	useEffect(() => {
		const videoElement = nextVideoRef.current;
		if (videoElement) {
			videoElement.addEventListener("loadeddata", handleVideoLoaded);
			return () => {
				videoElement.removeEventListener("loadeddata", handleVideoLoaded);
			};
		}
		return () => {};
	}, [handleVideoLoaded, videoState.currentIndex]);

	useEffect(() => {
		const timer = setTimeout(() => {
			const nextIndex =
				videoState.currentIndex === TOTAL_VIDEOS - 1
					? TOTAL_VIDEOS - 1
					: videoState.currentIndex % TOTAL_VIDEOS;

			if (delayedSource !== getVideoSource(nextIndex)) {
				setDelayedSource(getVideoSource(nextIndex));
				if (mainVideoRef.current) {
					mainVideoRef.current.addEventListener(
						"loadedmetadata",
						() => {
							if (mainVideoRef.current) {
								mainVideoRef.current.currentTime = 1;
							}
						},
						{ once: true }
					);
				}
			}
		}, DELAY_TIME);

		return (): void => {
			clearTimeout(timer);
		};
	}, [videoState.currentIndex, getVideoSource, delayedSource]);

	return (
		<section className="overflow-hidden relative w-screen h-dvh">
			{videoState.isLoading && (
				<div className="absolute top-0 left-0 z-50 size-full flex-center">
					<div className="three-body">
						<div className="three-body__dot"></div>
						<div className="three-body__dot"></div>
						<div className="three-body__dot"></div>
					</div>
				</div>
			)}

			<div
				className="overflow-hidden relative z-10 w-screen h-dvh"
				style={{
					filter: "url(#round)",
				}}
			>
				<div
					id="video-frame"
					className="overflow-hidden relative z-10 w-screen h-dvh bg-zentry-blue-75"
				>
					<div>
						<div className="overflow-hidden absolute z-50 rounded-2xl cursor-pointer mask-clip-path absolute-center size-64">
							<div>
								<div
									className="opacity-0 transition-all duration-500 ease-in origin-center scale-50 hover:scale-100 hover:opacity-100"
									onClick={handleMiniVideoClick}
								>
									<video
										className="object-cover object-center origin-center scale-150 size-64"
										id="current-video"
										loop
										muted
										onLoadedData={handleVideoLoaded}
										ref={nextVideoRef}
										src={getVideoSource(upcomingVideo)}
									/>
								</div>
							</div>
						</div>

						<video
							className="object-cover object-center absolute invisible z-20 absolute-center size-64"
							id="next-video"
							loop
							muted
							onLoadedData={handleVideoLoaded}
							ref={nextVideoRef}
							src={getVideoSource(videoState.currentIndex)}
						/>
						<video
							// autoPlay
							className="object-cover object-center absolute top-0 left-0 size-full"
							loop
							muted
							onLoadedData={handleVideoLoaded}
							ref={mainVideoRef}
							src={delayedSource}
						/>
					</div>
					<h1 className="absolute right-5 bottom-5 z-40 special-font hero-heading text-zentry-blue-75">
						G<b>A</b>MING
					</h1>

					<div className="absolute top-0 left-0 z-40 size-full">
						<div className="px-5 mt-24 sm:px-10">
							<h1 className="special-font hero-heading text-zentry-blue-100">
								redefi<b>n</b>e
							</h1>
							<p className="mb-5 max-w-64 font-robert-regular text-zentry-blue-100">
								Enter the Metagame Layer <br /> Unleash the Play Economy
							</p>
							<Button
								// className="text-xs uppercase bg-transparent rounded-full transition-all duration-500 hover:bg-transparent"
								className="text-xs uppercase rounded-full transition-all duration-500"
								id="watch-trailer"
								leftIcon={<IconLocation size={16} />}
								title="Watch trailer"
								variant="secondary"
							>
								Watch Trailer
							</Button>
						</div>
					</div>
				</div>
			</div>

			<h1 className="absolute right-5 bottom-5 text-black special-font hero-heading">
				G<b>A</b>MING
			</h1>
			<svg
				width="0"
				height="0"
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				className="absolute invisible"
			>
				<defs>
					<filter id="round">
						<feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
							result="goo"
						/>
						<feComposite in="SourceGraphic" in2="goo" operator="atop" />
					</filter>
				</defs>
			</svg>
		</section>
	);
};

export default HeroBanner;

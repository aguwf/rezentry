import NaturalFloating from "@/components/ui/FloatingAnimation/Floating";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { FC } from "react";
import AnimatedText from "../AnimatedText/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const About: FC = () => {
	useGSAP(() => {
		const clipAnimation = gsap.timeline({
			scrollTrigger: {
				trigger: "#clip",
				start: "start start+=100",
				end: "+=800 center-=100",
				scrub: 1,
				pin: true,
				pinSpacing: true,
			},
		});

		clipAnimation.to(".mask-clip-path", {
			width: "100vw",
			height: "100vh",
			borderRadius: "0",
			ease: "power1.inOut",
		});
	});

	return (
		<section className="overflow-hidden w-full min-h-screen about">
			<div className="flex relative flex-col gap-5 items-center mt-36 mb-8">
				<h2 className="font-general text-sm uppercase md:text-[10px]">
					Welcome to Rezentry
				</h2>
				<AnimatedText
					className="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]"
					text="Disc<b>o</b>ver the world's<br/>largest shared <b>a</b>dventure"
				/>

				<div className="about-subtext">
					<p>The Metagame begins-your life, now an epic MMORPG adventure.</p>
					<p>
						Rezentry unites every player from countless games and platforms.
					</p>
				</div>

				<div className="w-screen h-dvh" id="clip">
					<div className="relative z-30 about-stone">
						<NaturalFloating
							className="absolute w-screen h-dvh"
							rotationDegree={0}
							duration={3}
							yDistance={15}
						>
							<img
								className="object-cover sticky top-[10%] left-0 w-1/3 lg:left-[20%] lg:w-auto"
								src="/images/stones-1.png"
								alt=""
							/>
						</NaturalFloating>
						<NaturalFloating
							className="absolute w-screen h-dvh"
							rotationDegree={0}
							duration={4}
							yDistance={20}
							delay={0.5}
						>
							<img
								className="object-cover sticky top-[25%] left-[70%] w-1/5 lg:w-auto"
								src="/images/stones-2.png"
								alt=""
							/>
						</NaturalFloating>
						<NaturalFloating
							className="absolute w-screen h-dvh"
							rotationDegree={0}
							duration={2.5}
							yDistance={25}
							delay={1}
						>
							<img
								className="object-cover sticky top-[35%] left-[68%] w-1/6 lg:top-[25%] lg:w-auto"
								src="/images/stones-3.png"
								alt=""
							/>
						</NaturalFloating>
					</div>
					<div className="z-0 mask-clip-path about-image">
						<img
							className="object-cover absolute top-0 left-0 size-full"
							src="/images/about.webp"
							alt=""
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;

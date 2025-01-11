import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { FC } from "react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
	className?: string;
	text: string;
	delay?: number;
}

const AnimatedText: FC<AnimatedTextProps> = ({
	className,
	text,
	delay = 0,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const context = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "100 bottom",
					end: "center bottom",
					toggleActions: "play none none reverse",
				},
			});

			tl.to(".animated-word", {
				opacity: 1,
				transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
				ease: "power2.inOut",
				stagger: 0.02,
				delay: delay,
                duration: 1,
			});
		}, containerRef);

		return (): void => {
			context.revert();
		};
	}, []);

	return (
		<div ref={containerRef} className={`animated-word-container ${className}`}>
			{text.split("<br/>").map((line, index) => (
				<div
					key={index}
					className="flex-wrap gap-2 px-10 max-w-full flex-center md:gap-3"
				>
					{line.split(" ").map((word, index) => (
						<span
							key={index}
							className="animated-word"
							dangerouslySetInnerHTML={{ __html: word }}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default AnimatedText;

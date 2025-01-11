import Button from "@/components/ui/Button/Button";
import { IconLocationFilled } from "@tabler/icons-react";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";

interface NavBgStyle {
	left?: number;
	width?: number;
	opacity?: number;
}

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar: FC = () => {
	const navContainer = useRef<HTMLDivElement>(null);
	const [navBgStyle, setNavBgStyle] = useState<NavBgStyle>({ opacity: 0 });
	const [isVisible, setIsVisible] = useState(true);
	const [previousScrollPos, setPreviousScrollPos] = useState(0);
	const [isTop, setIsTop] = useState(true);

	const handleMouseEnter = (
		event: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		const target = event.currentTarget;
		const parent = target.parentElement;
		if (!parent) return;

		const targetRect = target.getBoundingClientRect();
		const parentRect = parent.getBoundingClientRect();
		const relativeLeft = targetRect.left - parentRect.left;

		setNavBgStyle({
			left: relativeLeft,
			width: targetRect.width,
			opacity: 1,
		});
	};

	const handleMouseLeave = () => {
		setNavBgStyle((previous) => ({ ...previous, opacity: 0 }));
	};

	const audioRef = useRef<HTMLAudioElement>(null);
	const [isIndicatorActive, setIsIndicatorActive] = useState(false);

	const toggleAudio = async () => {
		if (audioRef.current) {
			if (audioRef.current.paused) {
				await audioRef.current.play();
				setIsIndicatorActive(true);
			} else {
				audioRef.current.pause();
				setIsIndicatorActive(false);
			}
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			const isScrollingDown = currentScrollPos > previousScrollPos;

			setIsVisible(currentScrollPos < 10 || !isScrollingDown);
			setPreviousScrollPos(currentScrollPos);
			setIsTop(currentScrollPos <= 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [previousScrollPos]);

	return (
		<div
			className={`fixed rounded-xl inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 navbar sm:inset-x-6 ${
				!isVisible ? "-translate-y-24" : ""
			} ${!isTop ? "bg-zentry-blue-200/50" : ""}`}
			ref={navContainer}
		>
			<header className="absolute top-1/2 w-full -translate-y-1/2">
				<nav className="flex justify-between items-center p-4 size-full">
					<div className="flex gap-4 items-center left-nav-container md:gap-8">
						<div className="logo">
							<img src="/logo.svg" alt="Logo" />
						</div>

						<div className="left-nav">
							<Button
								variant="blue50"
								className="text-sm text-gray-700"
								rightIcon={
									<IconLocationFilled size={16} className="!fill-gray-700" />
								}
							>
								Product
							</Button>
							<Button variant="blue50" className="ml-2 text-sm text-gray-700">
								Whitepaper
							</Button>
						</div>
					</div>

					<div className="right-nav">
						<ul className="hidden relative items-center md:flex">
							<li className="absolute bottom-0 size-full">
								<div
									className="absolute h-full rounded-full transition-all duration-300 ease-out bg-zentry-blue-50"
									style={navBgStyle}
								></div>
							</li>
							{navItems.map((item) => (
								<li
									key={item}
									className="hidden relative px-6 py-2 transition-colors md:block text-zentry-blue-50 hover:text-primary"
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
								>
									<a href={item.toLowerCase()}>{item}</a>
								</li>
							))}
							<li className="nav-hover-btn">
								<button
									onClick={toggleAudio}
									className="flex justify-center items-center space-x-0.5 gap-1 h-8"
								>
									<audio
										loop
										src="/audio/loop.mp3"
										ref={audioRef}
										className="hidden"
									/>
									{[1, 2, 3, 4, 5, 6].map((bar) => {
										return (
											<div
												key={bar}
												className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
												style={{
													animationDelay: `${bar * 0.2}s`,
												}}
											></div>
										);
									})}
								</button>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		</div>
	);
};

export default Navbar;

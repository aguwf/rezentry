import Navbar from "@/components/layout/Navbar/Navbar";
import About from "@/components/ui/AboutSection/About";
import HeroBanner from "@/components/ui/Banner/HeroBanner";
import ProductGrid from "@/components/ui/ProductGrid/ProductGrid";
import type { FunctionComponent } from "../common/types";

export const Home = (): FunctionComponent => {
	// const { t, i18n } = useTranslation();																								

	return (
		<div className="overflow-x-hidden relative w-screen min-h-screen">
			<Navbar />
			<HeroBanner />
			<About />
			<ProductGrid />
			<section className="min-h-screen"></section>
		</div>
	);
};

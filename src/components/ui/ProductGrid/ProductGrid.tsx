import type { FC } from "react";
import ProductGridItem from "./ProductGridItem";

const ProductGrid: FC = () => {
	return (
		<section className="py-40 bg-black">
			<div className="container px-3 pb-4 mx-auto md:px-10">
				<div className="py-3">
					<p className="text-lg font-circular text-zentry-blue-50">
						Explore the Zentry Universe
					</p>
				</div>
				<p className="max-w-md text-lg opacity-50 font-circular text-zentry-blue-50">
					Immerse yourself in an IP-rich product universe where AI-driven
					gamification and hyper-personalization lead humans & AI into a global
					play economy.
				</p>
			</div>

			<div className="container mx-auto product-grid md:px-10">
				<ProductGridItem
					src="/videos/feature-1.mp4"
					title="Title"
					description="Description"
				/>
			</div>
		</section>
	);
};

export default ProductGrid;

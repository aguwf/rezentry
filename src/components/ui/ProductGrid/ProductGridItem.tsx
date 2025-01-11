import type { FC } from "react";

const ProductGridItem: FC<{
	src: string;
	title: string;
	description: string;
}> = ({ src, title, description }) => {
	return (
		<div className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-xl md:h-[65vh]">
			<video
				src={src}
				className="object-cover w-full h-full"
				loop
				muted
				autoPlay
			/>
			<div className="flex absolute inset-0 flex-col justify-center items-start p-6 bg-black bg-opacity-50">
				<h3 className="text-xl font-bold text-white font-circular">{title}</h3>
				<p className="mt-2 text-sm text-white">{description}</p>
			</div>
		</div>
	);
};

export default ProductGridItem;

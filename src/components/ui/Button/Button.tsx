import { cn } from "@/common/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import "./button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "ghost"
		| "link"
		| "blue100"
		| "blue50";
	size?: "sm" | "md" | "lg";
	isLoading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			variant = "primary",
			size = "md",
			isLoading = false,
			disabled,
			leftIcon,
			rightIcon,
			fullWidth,
			...props
		},
		ref
	) => {
		const baseStyles =
			"relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

		const variants = {
			primary: "text-white [&_svg]:fill-primary hover:[&_svg]:fill-primary/90",
			secondary:
				"text-gray-700 [&_svg]:fill-secondary hover:[&_svg]:fill-secondary/80",
			outline:
				"text-foreground [&_svg]:fill-transparent hover:[&_svg]:fill-accent [&_svg]:border border-input",
			ghost:
				"text-foreground [&_svg]:fill-transparent hover:[&_svg]:fill-accent",
			link: "text-primary underline-offset-4 hover:underline [&_svg]:fill-transparent",
			blue100:
				"text-white [&_svg]:fill-zentry-blue-100 hover:[&_svg]:fill-zentry-blue-100/90",
			blue50:
				"text-white [&_svg]:fill-zentry-blue-50 hover:[&_svg]:fill-zentry-blue-50/90",
		};

		const sizes = {
			sm: "h-9 px-3 text-sm",
			md: "h-10 px-8 py-6",
			lg: "h-11 px-8 text-lg",
		};

		return (
			<button
				ref={ref}
				className={cn(
					baseStyles,
					variants[variant],
					sizes[size],
					fullWidth && "w-full",
					"relative overflow-hidden",
					className
				)}
				disabled={disabled || isLoading}
				aria-busy={isLoading}
				{...props}
			>
				{isLoading && (
					<span className="mr-2 w-4 h-4 animate-spin">
						{/* Add your loading spinner SVG here */}
					</span>
				)}
				{leftIcon && <span className="mr-2">{leftIcon}</span>}
				<div className="btnMain__text">{children}</div>
				{rightIcon && <span className="ml-2">{rightIcon}</span>}
				<div className="btnMain__shape">
					<svg
						className="btnMain__shapeIcon"
						strokeWidth="1"
						preserveAspectRatio="none"
						viewBox="0 0 200 65"
					>
						<path
							className="transition-all duration-300 ease-in-out btnMain__shapePath"
							d="M175.671875,7.599999999999998 L175.671875,7.599999999999998 Q201.671875,7.599999999999998,201.671875,33.6 L201.671875,28.400000000000002 Q201.671875,54.400000000000006,175.671875,54.400000000000006 L27,54.400000000000006 Q1,54.400000000000006,1,28.400000000000002 L1,33.6 Q1,7.599999999999998,27,7.599999999999998 Z"
						/>
					</svg>
				</div>
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;

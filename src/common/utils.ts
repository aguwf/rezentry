/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const isProduction = import.meta.env.MODE === "production";

export function cn(...inputs: Array<ClassValue>): string {
	return twMerge(clsx(inputs));
}

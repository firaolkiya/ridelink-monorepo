import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "./internal/cn.js";

export type TextTone = "default" | "muted" | "subtle" | "danger";
export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface TextProps extends HTMLAttributes<HTMLElement> {
	as?: "p" | "span" | "div" | "label" | "strong" | "small" | "h1" | "h2" | "h3" | "h4";
	size?: TextSize;
	tone?: TextTone;
	weight?: TextWeight;
}

const toneStyles: Record<TextTone, string> = {
	default: "#0f172a",
	muted: "#334155",
	subtle: "#64748b",
	danger: "#b91c1c",
};

const sizeStyles: Record<TextSize, CSSProperties> = {
	xs: { fontSize: "0.75rem", lineHeight: 1.4 },
	sm: { fontSize: "0.875rem", lineHeight: 1.5 },
	md: { fontSize: "1rem", lineHeight: 1.6 },
	lg: { fontSize: "1.125rem", lineHeight: 1.6 },
	xl: { fontSize: "1.25rem", lineHeight: 1.4 },
};

const weightStyles: Record<TextWeight, CSSProperties["fontWeight"]> = {
	regular: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
};

export function Text({
	as: Component = "p",
	className,
	size = "md",
	style,
	tone = "default",
	weight = "regular",
	...props
}: TextProps) {
	return (
		<Component
			className={cn("cbd-text", className)}
			style={{
				color: toneStyles[tone],
				margin: 0,
				fontFamily: "inherit",
				fontWeight: weightStyles[weight],
				...sizeStyles[size],
				...style,
			}}
			{...props}
		/>
	);
}
import type { CSSProperties, HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "./internal/cn.js";

export interface CardProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}
export interface CardSectionProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

const baseCardStyle: CSSProperties = {
	backgroundColor: "#ffffff",
	border: "1px solid #e2e8f0",
	borderRadius: 16,
	boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
	color: "#0f172a",
};

function sectionStyle(padding: CSSProperties["padding"]): CSSProperties {
	return {
		padding,
	};
}

export function Card({ className, style, ...props }: CardProps) {
	return (
		<div
			className={cn("cbd-card", className)}
			style={{ ...baseCardStyle, ...style }}
			{...props}
		/>
	);
}

export function CardHeader({ className, style, ...props }: CardSectionProps) {
	return (
		<div
			className={cn("cbd-card__header", className)}
			style={{ borderBottom: "1px solid #e2e8f0", ...sectionStyle("1rem 1.25rem"), ...style }}
			{...props}
		/>
	);
}

export function CardBody({ className, style, ...props }: CardSectionProps) {
	return (
		<div
			className={cn("cbd-card__body", className)}
			style={{ ...sectionStyle("1.25rem"), ...style }}
			{...props}
		/>
	);
}

export function CardFooter({ className, style, ...props }: CardSectionProps) {
	return (
		<div
			className={cn("cbd-card__footer", className)}
			style={{ borderTop: "1px solid #e2e8f0", ...sectionStyle("1rem 1.25rem"), ...style }}
			{...props}
		/>
	);
}
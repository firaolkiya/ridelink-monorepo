import type { CSSProperties, HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "./internal/cn.js";

export type StackDirection = "row" | "column";
export type StackAlign = "stretch" | "start" | "center" | "end" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

export interface StackProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
	direction?: StackDirection;
	gap?: number | string;
	align?: StackAlign;
	justify?: StackJustify;
	wrap?: boolean;
}

function gapValue(gap: number | string | undefined) {
	if (typeof gap === "number") {
		return `${gap}px`;
	}
	return gap ?? "0px";
}

function alignValue(align: StackAlign | undefined) {
	if (align === "start") return "flex-start";
	if (align === "end") return "flex-end";
	return align;
}

function justifyValue(justify: StackJustify | undefined) {
	if (justify === "start") return "flex-start";
	if (justify === "end") return "flex-end";
	if (justify === "between") return "space-between";
	if (justify === "around") return "space-around";
	if (justify === "evenly") return "space-evenly";
	return justify;
}

export function Stack({
	children,
	className,
	direction = "column",
	gap = 0,
	align = "stretch",
	justify = "start",
	style,
	wrap = false,
	...props
}: StackProps) {
	return (
		<div
			className={cn("cbd-stack", className)}
			style={{
				display: "flex",
				flexDirection: direction,
				gap: gapValue(gap),
				alignItems: alignValue(align),
				justifyContent: justifyValue(justify),
				flexWrap: wrap ? "wrap" : "nowrap",
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
}
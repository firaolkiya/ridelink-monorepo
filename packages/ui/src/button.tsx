import { forwardRef } from "react";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

import { cn } from "./internal/cn.js";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
	primary: {
		backgroundColor: "#2563eb",
		borderColor: "#1d4ed8",
		color: "#ffffff",
	},
	secondary: {
		backgroundColor: "#f8fafc",
		borderColor: "#cbd5e1",
		color: "#0f172a",
	},
	ghost: {
		backgroundColor: "transparent",
		borderColor: "transparent",
		color: "#0f172a",
	},
};

const sizeStyles: Record<ButtonSize, CSSProperties> = {
	sm: {
		fontSize: "0.875rem",
		lineHeight: 1.25,
		padding: "0.5rem 0.75rem",
	},
	md: {
		fontSize: "0.9375rem",
		lineHeight: 1.4,
		padding: "0.625rem 1rem",
	},
	lg: {
		fontSize: "1rem",
		lineHeight: 1.5,
		padding: "0.75rem 1.125rem",
	},
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{
		className,
		fullWidth = false,
		size = "md",
		style,
		variant = "primary",
		type = "button",
		disabled,
		...props
	},
	ref,
) {
	const resolvedVariant: ButtonVariant = variant;
	const resolvedSize: ButtonSize = size;

	return (
		<button
			ref={ref}
			type={type}
			disabled={disabled}
			className={cn("cbd-button", className)}
			style={{
				alignItems: "center",
				borderRadius: 12,
				borderStyle: "solid",
				borderWidth: 1,
				cursor: disabled ? "not-allowed" : "pointer",
				display: "inline-flex",
				fontFamily: "inherit",
				fontWeight: 600,
				justifyContent: "center",
				opacity: disabled ? 0.6 : 1,
				transition: "transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease",
				userSelect: "none",
				width: fullWidth ? "100%" : "auto",
				...variantStyles[resolvedVariant],
				...sizeStyles[resolvedSize],
				...style,
			}}
			{...props}
		/>
	);
});
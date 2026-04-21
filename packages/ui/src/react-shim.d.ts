declare module "react" {
	export type CSSProperties = Record<string, string | number | undefined>;
	export type ReactNode = unknown;
	export interface HTMLAttributes<T> {
		className?: string;
		style?: CSSProperties;
		children?: ReactNode;
		id?: string;
		title?: string;
		role?: string;
		[attribute: string]: unknown;
	}
	export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
		type?: "button" | "submit" | "reset";
		disabled?: boolean;
		onClick?: (...args: unknown[]) => void;
	}
	export type PropsWithChildren<P = object> = P & { children?: ReactNode };
	export function forwardRef<T, P = object>(
		render: (props: P, ref: unknown) => unknown,
	): (props: P & { ref?: unknown }) => unknown;
}

declare module "react/jsx-runtime" {
	export const Fragment: unknown;
	export const jsx: unknown;
	export const jsxs: unknown;
}

declare namespace JSX {
	interface IntrinsicElements {
		button: unknown;
		div: unknown;
		h1: unknown;
		h2: unknown;
		h3: unknown;
		h4: unknown;
		label: unknown;
		p: unknown;
		small: unknown;
		span: unknown;
		strong: unknown;
	}
}
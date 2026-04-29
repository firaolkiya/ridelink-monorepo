import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent, HTMLAttributes } from "react";

import { Button } from "./button.js";
import { Card, CardBody, CardFooter, CardHeader } from "./card.js";
import { Stack } from "./stack.js";
import { Text } from "./text.js";
import { cn } from "./internal/cn.js";

export type AuthMode = "sign-in" | "sign-up";

export interface AuthFormValues {
	email: string;
	password: string;
	remember: boolean;
}

export interface AuthFormProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
	mode?: AuthMode;
	title?: string;
	subtitle?: string;
	submitLabel?: string;
	defaultEmail?: string;
	defaultRemember?: boolean;
	errorMessage?: string;
	loading?: boolean;
	onSubmit?: (values: AuthFormValues) => void | Promise<void>;
}

const inputStyle: CSSProperties = {
	appearance: "none",
	border: "1px solid #cbd5e1",
	borderRadius: 10,
	color: "#0f172a",
	fontFamily: "inherit",
	fontSize: "0.95rem",
	lineHeight: 1.4,
	outline: "none",
	padding: "0.625rem 0.75rem",
	width: "100%",
};

function defaultTitle(mode: AuthMode) {
	return mode === "sign-up" ? "Create account" : "Welcome back";
}

function defaultSubtitle(mode: AuthMode) {
	return mode === "sign-up"
		? "Use your email address to create a new account."
		: "Sign in to continue to your dashboard.";
}

function defaultSubmitLabel(mode: AuthMode) {
	return mode === "sign-up" ? "Create account" : "Sign in";
}

export function AuthForm({
	className,
	defaultEmail = "",
	defaultRemember = true,
	errorMessage,
	loading = false,
	mode = "sign-in",
	onSubmit,
	style,
	subtitle,
	submitLabel,
	title,
	...props
}: AuthFormProps) {
	const [email, setEmail] = useState(defaultEmail);
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(defaultRemember);

	const resolvedTitle = title ?? defaultTitle(mode);
	const resolvedSubtitle = subtitle ?? defaultSubtitle(mode);
	const resolvedSubmitLabel = submitLabel ?? defaultSubmitLabel(mode);

	const isDisabled = useMemo(() => {
		return loading || !email.trim() || !password.trim();
	}, [email, loading, password]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (isDisabled) return;
		await onSubmit?.({
			email: email.trim(),
			password,
			remember,
		});
	}

	return (
		<Card
			className={cn("cbd-auth-form", className)}
			style={{ maxWidth: 420, width: "100%", ...style }}
			{...props}
		>
			<CardHeader>
				<Stack gap={6}>
					<Text as="h2" size="xl" weight="semibold">
						{resolvedTitle}
					</Text>
					<Text size="sm" tone="subtle">
						{resolvedSubtitle}
					</Text>
				</Stack>
			</CardHeader>

			<CardBody>
				<form onSubmit={handleSubmit}>
					<Stack gap={14}>
						<label>
							<Stack gap={6}>
								<Text as="span" size="sm" weight="medium">
									Email
								</Text>
								<input
									autoComplete="email"
									disabled={loading}
									type="email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									style={inputStyle}
									required
								/>
							</Stack>
						</label>

						<label>
							<Stack gap={6}>
								<Text as="span" size="sm" weight="medium">
									Password
								</Text>
								<input
									autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
									disabled={loading}
									type="password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									style={inputStyle}
									required
								/>
							</Stack>
						</label>

						<label style={{ alignItems: "center", display: "inline-flex", gap: 8 }}>
							<input
								disabled={loading}
								type="checkbox"
								checked={remember}
								onChange={(event) => setRemember(event.target.checked)}
							/>
							<Text as="span" size="sm" tone="muted">
								Remember me
							</Text>
						</label>

						{errorMessage ? (
							<Text size="sm" tone="danger">
								{errorMessage}
							</Text>
						) : null}

						<Button type="submit" fullWidth disabled={isDisabled}>
							{loading ? "Please wait..." : resolvedSubmitLabel}
						</Button>
					</Stack>
				</form>
			</CardBody>

			<CardFooter>
				<Text size="xs" tone="subtle">
					By continuing, you agree to the platform terms and privacy policy.
				</Text>
			</CardFooter>
		</Card>
	);
}
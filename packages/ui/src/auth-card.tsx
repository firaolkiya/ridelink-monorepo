import type { HTMLAttributes } from "react";

import { AuthForm, type AuthFormProps } from "./auth.js";
import { Card, CardBody, CardFooter, CardHeader } from "./card.js";
import { Stack } from "./stack.js";
import { Text } from "./text.js";

export interface AuthCardProps extends AuthFormProps, Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
	label?: string;
	footer?: string;
}

export function AuthCard({
	className,
	footer,
	label = "Shared account access",
	style,
	...authFormProps
}: AuthCardProps) {
	return (
		<Card className={className ? `cbd-auth-card ${className}` : "cbd-auth-card"} style={{ maxWidth: 480, width: "100%", ...style }}>
			<CardHeader>
				<Stack gap={4}>
					<Text as="span" size="xs" tone="subtle" weight="semibold">
						{label}
					</Text>
					<Text as="h2" size="xl" weight="semibold">
						{authFormProps.mode === "sign-up" ? "Create a new workspace account" : "Sign in to continue"}
					</Text>
				</Stack>
			</CardHeader>
			<CardBody>
				<AuthForm {...authFormProps} />
			</CardBody>
			{footer ? (
				<CardFooter>
					<Text size="xs" tone="subtle">
						{footer}
					</Text>
				</CardFooter>
			) : null}
		</Card>
	);
}
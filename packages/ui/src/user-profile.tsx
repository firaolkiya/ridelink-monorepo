import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { Card, CardBody, CardFooter, CardHeader } from "./card.js";
import { Stack } from "./stack.js";
import { Text } from "./text.js";
import { cn } from "./internal/cn.js";

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	role: string;
	status: string;
	createdAt: string;
	updatedAt: string;
}

export interface UserProfileCardProps extends HTMLAttributes<HTMLDivElement> {
	user: UserProfile;
	label?: string;
	title?: string;
	subtitle?: string;
	footer?: string;
	actions?: ReactNode;
	children?: ReactNode;
}

const avatarStyle: CSSProperties = {
	alignItems: "center",
	background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
	borderRadius: 999,
	color: "#ffffff",
	display: "inline-flex",
	fontSize: "1rem",
	fontWeight: 700,
	height: 48,
	justifyContent: "center",
	width: 48,
};

const badgeBaseStyle: CSSProperties = {
	borderRadius: 999,
	border: "1px solid transparent",
	display: "inline-flex",
	fontSize: "0.75rem",
	fontWeight: 600,
	padding: "0.25rem 0.625rem",
	textTransform: "capitalize",
};

const roleBadgeStyles: Record<string, CSSProperties> = {
	admin: { backgroundColor: "#dbeafe", borderColor: "#93c5fd", color: "#1d4ed8" },
	member: { backgroundColor: "#ecfccb", borderColor: "#bef264", color: "#3f6212" },
};

const statusBadgeStyles: Record<string, CSSProperties> = {
	active: { backgroundColor: "#dcfce7", borderColor: "#86efac", color: "#166534" },
	inactive: { backgroundColor: "#fee2e2", borderColor: "#fca5a5", color: "#b91c1c" },
};

function formatDate(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}

function getInitials(name: string) {
	return name
		.split(/\s+/)
		.map((part) => part.trim().charAt(0))
		.filter(Boolean)
		.slice(0, 2)
		.join("")
		.toUpperCase();
}

function getBadgeStyle(kind: "role" | "status", value: string): CSSProperties {
	const styles = kind === "role" ? roleBadgeStyles : statusBadgeStyles;
	return styles[value] ?? { backgroundColor: "#f8fafc", borderColor: "#cbd5e1", color: "#475569" };
}

export function UserProfileCard({
	actions,
	children,
	className,
	footer,
	label = "User profile",
	style,
	subtitle,
	title,
	user,
	...props
}: UserProfileCardProps) {
	const resolvedTitle = title ?? user.name;
	const resolvedSubtitle = subtitle ?? user.email;

	return (
		<Card className={cn("cbd-user-profile-card", className)} style={{ width: "100%", ...style }} {...props}>
			<CardHeader>
				<Stack gap={12}>
					<Stack direction="row" gap={12} align="center" justify="between" wrap>
						<Stack direction="row" gap={12} align="center">
							<div aria-hidden="true" style={avatarStyle}>
								{getInitials(user.name) || "U"}
							</div>
							<Stack gap={4}>
								<Text as="span" size="xs" tone="subtle" weight="semibold">
									{label}
								</Text>
								<Text as="h2" size="xl" weight="semibold">
									{resolvedTitle}
								</Text>
								<Text size="sm" tone="subtle">
									{resolvedSubtitle}
								</Text>
							</Stack>
						</Stack>
						{actions ? <div>{actions}</div> : null}
					</Stack>
					<Stack direction="row" gap={8} wrap>
						<span style={{ ...badgeBaseStyle, ...getBadgeStyle("role", user.role) }}>{user.role}</span>
						<span style={{ ...badgeBaseStyle, ...getBadgeStyle("status", user.status) }}>{user.status}</span>
					</Stack>
				</Stack>
			</CardHeader>

			<CardBody>
				<Stack gap={16}>
					<div
						style={{
							display: "grid",
							gap: 12,
							gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
						}}
					>
						<Stack gap={4}>
							<Text as="span" size="xs" tone="subtle" weight="semibold">
								User ID
							</Text>
							<Text size="sm">{user.id}</Text>
						</Stack>
						<Stack gap={4}>
							<Text as="span" size="xs" tone="subtle" weight="semibold">
								Created
							</Text>
							<Text size="sm">{formatDate(user.createdAt)}</Text>
						</Stack>
						<Stack gap={4}>
							<Text as="span" size="xs" tone="subtle" weight="semibold">
								Updated
							</Text>
							<Text size="sm">{formatDate(user.updatedAt)}</Text>
						</Stack>
					</div>

					{children ? <div>{children}</div> : null}
				</Stack>
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
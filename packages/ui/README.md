# @cbd/ui

Composable React UI primitives and composites for the monorepo apps.

The package is intentionally small and headless-friendly: each component keeps a narrow responsibility so app-level screens can compose them into richer views later.

The app entry points use this package through the workspace dependency `@cbd/ui`, while app-specific data flow stays inside `apps/admin/src/features` and `apps/web/src/features`.

## Build

```bash
pnpm --filter @cbd/ui build
```

## Components

- `Button` for actions and form triggers
- `Card` with `CardHeader`, `CardBody`, and `CardFooter` sections
- `Stack` for vertical or horizontal layout spacing
- `Text` for reusable typography styling
- `AuthForm` for sign-in and sign-up forms
- `AuthCard` for a higher-level auth surface that combines `Card`, `Text`, `Stack`, and `AuthForm`

## Example

```tsx
import { AuthCard, Button, Card, CardBody, Stack, Text } from "@cbd/ui";

export function Example() {
	return (
		<Card>
			<CardBody>
				<Stack gap={16}>
					<Text as="h2" size="lg" weight="semibold">
						Welcome
					</Text>
					<Button>Continue</Button>
				</Stack>
			</CardBody>
		</Card>
	);
}
```

## Auth example

```tsx
import { AuthCard } from "@cbd/ui";

export function SignIn() {
	return (
		<AuthCard
			mode="sign-in"
			onSubmit={async (values) => {
				console.log(values);
			}}
			footer="Use the shared auth surface in any app."
		/>
	);
}
```

## Export surface

- prefer importing from `@cbd/ui` for app code
- use subpath imports like `@cbd/ui/auth-card` only when you need a focused package entry
- add new reusable primitives in `packages/ui/src` and export them from `packages/ui/src/index.ts`
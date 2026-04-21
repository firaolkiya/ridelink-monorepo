# @cbd/ui

Composable React UI primitives for the monorepo apps.

The package is intentionally small and headless-friendly: each component keeps a narrow responsibility so app-level screens can compose them into richer views later.

## Build

```bash
pnpm --filter @cbd/ui build
```

## Components

- `Button` for actions and form triggers
- `Card` with `CardHeader`, `CardBody`, and `CardFooter` sections
- `Stack` for vertical or horizontal layout spacing
- `Text` for reusable typography styling

## Example

```tsx
import { Button, Card, CardBody, Stack, Text } from "@cbd/ui";

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
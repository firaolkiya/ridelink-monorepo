import { useState } from 'react'

import { createBackendApiClient } from '@cbd/api-client'
import { AuthCard, Button, Stack, Text, UserProfileCard } from '@cbd/ui'

const client = createBackendApiClient({ baseUrl: '/api' })

export function AuthPage() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [user, setUser] = useState(null)

	async function handleSubmit(values) {
		setLoading(true)
		setError('')

		try {
			const result = await client.login({ email: values.email, password: values.password })
			setUser(result.user)
		} catch (caughtError) {
			console.error(caughtError)
			setError(caughtError instanceof Error ? caughtError.message : String(caughtError))
		} finally {
			setLoading(false)
		}
	}

	function handleSignOut() {
		setUser(null)
	}

	if (user) {
		return (
			<Stack gap={16} style={{ width: '100%', maxWidth: 640 }}>
				<UserProfileCard
					user={user}
					label="Web user profile"
					subtitle="Signed in through the shared backend API client"
					actions={<Button variant="secondary" onClick={handleSignOut}>Sign out</Button>}
					footer="This profile card comes from packages/ui and is shared with the admin app."
				>
					<Text size="sm" tone="muted">
						You are signed in with the demo member account and can reuse the same profile UI across the monorepo.
					</Text>
				</UserProfileCard>
			</Stack>
		)
	}

	return (
		<AuthCard
			mode="sign-in"
			onSubmit={handleSubmit}
			loading={loading}
			errorMessage={error}
			defaultEmail="member@example.com"
			footer="The same auth flow can be reused anywhere in the monorepo through the shared UI package."
		/>
	)
}
import { useState } from 'react'

import { createBackendApiClient } from '@cbd/api-client'
import { AuthCard, Button, Stack, Text, UserProfileCard } from '@cbd/ui'

const client = createBackendApiClient({ baseUrl: '/api' })

function deriveName(email) {
	const localPart = email.split('@')[0]?.trim()
	return localPart || 'New User'
}

export function AuthPage() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [user, setUser] = useState(null)

	async function handleSubmit(values) {
		setLoading(true)
		setError('')

		try {
			const result = await client.createUser({
				name: deriveName(values.email),
				email: values.email,
				password: values.password,
			})
			setUser(result.user)
		} catch (caughtError) {
			console.error(caughtError)
			setError(caughtError instanceof Error ? caughtError.message : String(caughtError))
		} finally {
			setLoading(false)
		}
	}

	function handleCreateAnother() {
		setUser(null)
	}

	if (user) {
		return (
			<Stack gap={16} style={{ width: '100%', maxWidth: 640 }}>
				<UserProfileCard
					user={user}
					label="Admin-created profile"
					subtitle="Created through the shared backend API client"
					actions={<Button variant="secondary" onClick={handleCreateAnother}>Create another user</Button>}
					footer="Admin and web now share the same profile component from packages/ui."
				>
					<Text size="sm" tone="muted">
						The new user has been created in the API store and is ready for admin workflows.
					</Text>
				</UserProfileCard>
			</Stack>
		)
	}

	return (
		<AuthCard
			mode="sign-up"
			onSubmit={handleSubmit}
			loading={loading}
			errorMessage={error}
			defaultEmail="admin@example.com"
			footer="Admin users can create or update members with the shared backend API client."
		/>
	)
}
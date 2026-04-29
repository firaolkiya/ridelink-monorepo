import { useState } from 'react'

import { createBackendApiClient } from '@cbd/api-client'
import { AuthCard } from '@cbd/ui'

const client = createBackendApiClient({ baseUrl: '/api' })

function deriveName(email) {
	const localPart = email.split('@')[0]?.trim()
	return localPart || 'New User'
}

export function AuthPage() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function handleSubmit(values) {
		setLoading(true)
		setError('')

		try {
			const result = await client.createUser({
				name: deriveName(values.email),
				email: values.email,
				password: values.password,
			})
			console.log('[admin] created user', result)
		} catch (caughtError) {
			console.error(caughtError)
			setError(caughtError instanceof Error ? caughtError.message : String(caughtError))
		} finally {
			setLoading(false)
		}
	}

	return (
		<AuthCard
			mode="sign-up"
			onSubmit={handleSubmit}
			loading={loading}
			errorMessage={error}
			footer="Admin users can create or update members with the shared backend API client."
		/>
	)
}
import { useState } from 'react'

import { createBackendApiClient } from '@cbd/api-client'
import { AuthCard } from '@cbd/ui'

const client = createBackendApiClient({ baseUrl: '/api' })

export function AuthPage() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function handleSubmit(values) {
		setLoading(true)
		setError('')

		try {
			const result = await client.login({ email: values.email, password: values.password })
			console.log('[web] login success', result)
		} catch (caughtError) {
			console.error(caughtError)
			setError(caughtError instanceof Error ? caughtError.message : String(caughtError))
		} finally {
			setLoading(false)
		}
	}

	return (
		<AuthCard
			mode="sign-in"
			onSubmit={handleSubmit}
			loading={loading}
			errorMessage={error}
			footer="The same auth flow can be reused anywhere in the monorepo through the shared UI package."
		/>
	)
}
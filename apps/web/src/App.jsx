import { AuthForm } from '@cbd/ui'
import './App.css'

function App() {
  function handleSubmit(values) {
    console.log('[web] auth submit', values)
  }

  return (
    <main className="app-shell">
      <AuthForm onSubmit={handleSubmit} mode="sign-in" />
    </main>
  )
}

export default App

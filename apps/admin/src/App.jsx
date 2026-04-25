import { AuthForm } from '@cbd/ui'
import './App.css'

function App() {
  function handleSubmit(values) {
    console.log('[admin] auth submit', values)
  }

  return (
    <main className="app-shell">
      <AuthForm onSubmit={handleSubmit} mode="sign-up" />
    </main>
  )
}

export default App

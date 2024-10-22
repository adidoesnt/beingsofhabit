import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="p-2">
      <h3>Login Page</h3>
    </div>
  )
}

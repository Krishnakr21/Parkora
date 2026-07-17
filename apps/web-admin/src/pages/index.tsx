import { Container } from '@parkora-org/ui/src/components/atoms/Container'
import { AuthLayoutSimple } from '@parkora-org/ui/src/components/molecules/AuthLayoutSimple'
import { Admin } from '@parkora-org/ui/src/components/templates/Admin'
import { IsLoggedIn } from '@parkora-org/ui/src/components/templates/IsLoggedIn'
import { LoginForm } from '@parkora-org/ui/src/components/templates/LoginForm'

export default function Home() {
  return (
    <main>
      <Container>
        <IsLoggedIn
          notLoggedIn={
            <AuthLayoutSimple title="Login">
              <LoginForm />
            </AuthLayoutSimple>
          }
        >
          <Admin />
        </IsLoggedIn>
      </Container>
    </main>
  )
}

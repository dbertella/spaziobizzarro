'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { loginAction } from './action'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function SubmitButton() {
  const status = useFormStatus()
  return (
    <Button disabled={status.pending} className="mt-2">
      {status.pending ? 'Loading...' : 'Login'}
    </Button>
  )
}

export default function Page() {
  const [state, formAction] = useFormState(loginAction, null)

  return (
    <>
      <h2>Login</h2>

      <form action={formAction} className="w-[400px] mx-auto">
        <fieldset>
          <label htmlFor="usernameEmail">Username or Email</label>
          <Input type="name" name="usernameEmail" />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" />
        </fieldset>

        <SubmitButton />

        {state?.error && <p dangerouslySetInnerHTML={{ __html: state.error }}></p>}
      </form>
    </>
  )
}

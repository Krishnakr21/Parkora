import { register as registerUser } from '@parkora-org/network/src/auth'
import Link from 'next/link'
import { Button } from '../../atoms/Button'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'

import { useFormRegister } from '@parkora-org/forms/src/register'
import { Form } from '../../atoms/Form'

import { notification$ } from '@parkora-org/util/subjects'
import { useRouter } from 'next/router'

import { useAsync } from '@parkora-org/hooks/src/fetcher'
import {
  useCreateAdminMutation,
  useCreateCustomerMutation,
} from '@parkora-org/network/src/generated'
import { Role } from '@parkora-org/types'
import { useEffect } from 'react'

export interface ISignupFormProps {
  className?: string
  role?: Role
}

export const RegisterForm = ({ className, role }: ISignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const { data, loading, error, success, callAsyncFn } = useAsync(
    registerUser,
    (err: any) => {
      console.log('err', err)
      if (err.code === 'auth/email-already-in-use') {
        return "Email already in use! Just kidding, or am I? Honestly, I'm not sure if that email exists or not. Maybe I've said too much. Forget I said anything!"
      }
      return 'Something went wrong. Please try again.'
    },
  )

  const router = useRouter()

  const [createCustomer] = useCreateCustomerMutation()
  const [createAdmin, { loading: adminLoading }] = useCreateAdminMutation()

  const onSubmit = async (values: any) => {
    if (role === 'admin') {
      try {
        const res = await createAdmin({
          variables: {
            createAdminInput: {
              email: values.email,
              password: values.password,
              displayName: values.displayName,
            },
          },
        })
        if (res.data?.createAdmin) {
          notification$.next({
            message: 'Admin account created successfully! Please log in.',
          })
          router.push('/login')
        }
      } catch (e: any) {
        notification$.next({ message: e.message || 'Failed to create admin.' })
      }
    } else {
      await callAsyncFn(values)
    }
  }

  useEffect(() => {
    if (role === 'customer' && data?.user.uid) {
      ;(async () => {
        await createCustomer({
          variables: {
            createCustomerInput: {
              displayName: data?.user.displayName || '',
              uid: data?.user.uid,
            },
          },
        })
      })()
    }

    if (success) router.push('/')
  }, [data, success, role, createCustomer, router])

  useEffect(() => {
    if (error) notification$.next({ message: error, duration: 8000 })
  }, [error])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          className="text-black"
          placeholder="Enter the email."
          {...register('email')}
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          className="text-black"
          type="password"
          placeholder="······"
          {...register('password')}
        />
      </HtmlLabel>
      <HtmlLabel title="Display name" error={errors.displayName?.message}>
        <HtmlInput
          className="text-black"
          placeholder="Enter your name."
          {...register('displayName')}
        />
      </HtmlLabel>
      {Object.keys(errors).length ? (
        <div className="text-xs text-gray-600">
          Please fix the above {Object.keys(errors).length} errors
        </div>
      ) : null}
      <Button
        type="submit"
        loading={role === 'admin' ? adminLoading : loading}
        fullWidth
      >
        Create account
      </Button>
      <div className="mt-4 text-sm ">
        Already have an parkora account?
        <br />
        <Link href="/login" className="font-bold underline underline-offset-4">
          Login
        </Link>{' '}
        now.
      </div>
    </Form>
  )
}

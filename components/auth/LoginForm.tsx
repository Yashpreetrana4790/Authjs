'use client'
import React, { useState } from 'react'
import { Card } from '../ui/card'
import CardWrapper from './CardWrapper'
import { LoginSchema } from "../../schemas/index"
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../ui/input'
import Formerror from '../Formerror'
import FormSuccess from '../Formsuccess'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'






const LoginForm = () => {
  const [ispending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with other Provider " : ""
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error)
        // setSuccess(data?.success)
      })
    }

    )
  }



  return (
    <>

      <CardWrapper

        headerLabel="Welcome Back?"
        backbuttonlabel="Don't have an account"
        backbuttonlabelhref="/auth/register"
        showSocial
      >

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className='space-y-4'>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="John.Doe@email.com" type="email" {...field}
                        disabled={ispending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*****" type='password' {...field}
                        disabled={ispending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Formerror message={error || urlError} />
              <FormSuccess message={success} />
              <Button type="submit" className='w-full'>Login</Button>
            </div>

          </form>
        </Form>

      </CardWrapper >
    </>
  )
}

export default LoginForm
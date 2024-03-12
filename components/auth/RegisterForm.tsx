'use client'
import React, { useState } from 'react'
import { Card } from '../ui/card'
import CardWrapper from './CardWrapper'
import { LoginSchema, RegisterSchema } from "../../schemas/index"
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
import { Register } from '@/actions/register'





const RegisterForm = () => {
  const [ispending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""

    },
  })

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError("")
    setSuccess("")
    startTransition(() => {
      Register(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    }

    )
  }



  return (
    <>

      <CardWrapper
        backbuttonlabel="Already have an account?"
        backbuttonlabelhref="/auth/login"
        headerLabel='Create an Account'
        showSocial
      >

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John.Doe"  {...field}
                        disabled={ispending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Formerror message={error} />
              <FormSuccess message={success} />
              <Button type="submit" className='w-full'>Register</Button>
            </div>

          </form>
        </Form>

      </CardWrapper>
    </>
  )
}

export default RegisterForm
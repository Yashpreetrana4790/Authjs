import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className='bg-blue-800 text-white h-screen flex items-center justify-center flex-col'>
      <h1 className='text-6xl'> Auth</h1>
      <LoginButton>

        <Button variant="secondary">Sign In</Button>
      </LoginButton>
    </div>
  )
}

export default page
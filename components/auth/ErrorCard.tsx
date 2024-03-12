


import React from 'react'
import { Card, CardFooter, CardHeader } from '../ui/card'
import Header from './Header'
import BackButton from './BackButton'

const ErrorCard = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Card className='w-[400px] shadow-md'>
        <CardHeader>
          <Header label="Opps something went wrong" />
        </CardHeader>
        <CardFooter>
          <BackButton label='Back to login' href='/auth/login'>

          </BackButton>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ErrorCard
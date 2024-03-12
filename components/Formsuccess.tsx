import React from 'react'
import { CheckCircledIcon } from "@radix-ui/react-icons"

interface FormErrorrops {
  message?: string;
}


const FormSuccess = ({ message }: FormErrorrops) => {

  if (!message) return null
  return (
    <div className='bg-emerald-500/15 p-3 rounded-md
    flex items-center gap-x-2 text-sm text-emerald-500'>
      <CheckCircledIcon />
      {message}
    </div>
  )
}

export default FormSuccess
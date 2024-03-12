import React from 'react'

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center justify-center h-full bg-sky-600'>{children}</div>
  )
}

export default Authlayout
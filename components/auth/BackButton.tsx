import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';


interface BackButonProps {
  label: string;
  href: string
}
const BackButton = ({ label, href }: BackButonProps) => {
  return (
    <>
      <Button variant="link"
        size="sm"
        asChild
      >
        <Link href={href}>
          {label}
        </Link>
      </Button>
    </>
  )
}

export default BackButton
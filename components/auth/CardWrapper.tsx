'use client'
import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card';
import Header from './Header';
import BackButton from './BackButton';
import { Social } from './Social';

interface CardWrapperrops {
  children: React.ReactNode
  headerLabel: string;
  backbuttonlabel: string;
  backbuttonlabelhref: string;
  showSocial?: boolean;
}
const CardWrapper = ({ children, showSocial, headerLabel, backbuttonlabelhref, backbuttonlabel }: CardWrapperrops) => {
  return (
    <Card className='w-[400px] shadow-lg p-4'>
      <Header label={headerLabel}>

      </Header>
      <CardContent>

        {children}
      </CardContent>
      {showSocial && (
        <CardFooter >
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backbuttonlabel}
          href={backbuttonlabelhref} />
      </CardFooter>
    </Card >
  )
}

export default CardWrapper
import React from 'react'
import { Subscribe } from './subscribe'
import { Abouttitle } from './abouttitle'
import { Aboutdisc } from './aboutdisc'
import { Choose } from './choose'

export const About = () => {
  return (
    <div>
    <Abouttitle/>
    <Aboutdisc/>
    <Choose/>
    <Subscribe/>
    </div>
    
  )
}

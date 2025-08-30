import React from 'react'
import { Hero } from './hero'
import { Latesttitile } from './latesttitle'
import { Latest } from './latest'
import { Best } from './best'
import { Bestseller } from './bestseller'
import { Policy } from './policy'
import { Subscribe } from './subscribe'

export const Home = () => {
  return (
    <div>
        <Hero/>
        <Latesttitile/>
        <Latest/>
        <Best/>
        <Bestseller/>
        <Policy/>
        <Subscribe/>
    </div>
  )
}

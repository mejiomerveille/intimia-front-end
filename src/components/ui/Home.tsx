'use client';
import Hero from '@/components/site/hero'
import Features from '@/components/site/features'
import FeaturesBlocks from '@/components/site/features-blocks'
import Testimonials from '@/components/site/testimonials'
import Newsletter from '@/components/site/newsletter'
import React from 'react'
import EvolutionGrossesseForm from '@/components/grossesse/HomeGrossesse'



class Home extends React.Component{
  constructor(props){
        super(props);
        this.state = {
          token: typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null
        };
      }
    
  render(){
    const token = this.state.token
    console.log(token)
    const el = token === null ? (
      <>
        <Hero />
        <Features />
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter />
      </>
      ):(
          <EvolutionGrossesseForm/>
        )

  return (
    el
  )
}
}
export default Home
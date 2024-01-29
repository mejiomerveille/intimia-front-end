export const metadata = {
    title: 'Home - Simple',
    description: 'Page description',
  }
  
  import Hero from '@/components/site/hero'
  import Features from '@/components/site/features'
  import FeaturesBlocks from '@/components/site/features-blocks'
  import Testimonials from '@/components/site/testimonials'
  import Newsletter from '@/components/site/newsletter'
  
  export default function Home() {
    return (
      <>
        <Hero />
        <Features />
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter />
      </>
    )
  }
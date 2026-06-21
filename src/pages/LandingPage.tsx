import { Navbar } from '../components/landing/Navbar'
import { HeroSection } from '../components/landing/HeroSection'
import { FeaturesSection } from '../components/landing/FeaturesSection'
import { HowItWorks } from '../components/landing/HowItWorks'
import { WhyQuickBill } from '../components/landing/WhyQuickBill'
import { ForStoreOwners } from '../components/landing/ForStoreOwners'
import { AboutSection } from '../components/landing/AboutSection'
import { Footer } from '../components/landing/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <WhyQuickBill />
      <ForStoreOwners />
      <AboutSection />
      <Footer />
    </div>
  )
}

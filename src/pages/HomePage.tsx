import { Suspense, lazy } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Footer from '../components/Footer';

const HowItWorks = lazy(() => import('../sections/HowItWorks'));
const ProblemSection = lazy(() => import('../sections/ProblemSection'));
const SolutionSection = lazy(() => import('../sections/SolutionSection'));
const PricingSection = lazy(() => import('../sections/PricingSection'));
const Channels = lazy(() => import('../sections/Channels'));
const DemoSection = lazy(() => import('../sections/DemoSection'));

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Suspense fallback={null}>
          <ProblemSection />
          <SolutionSection />
          <HowItWorks />
          <PricingSection />
          <Channels />
          <DemoSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

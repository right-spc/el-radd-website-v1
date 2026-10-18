import { Suspense, lazy } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Footer from '../components/Footer';

const HowItWorks = lazy(() => import('../sections/HowItWorks'));
const Channels = lazy(() => import('../sections/Channels'));
const DemoSection = lazy(() => import('../sections/DemoSection'));
const QuestionsSection = lazy(() => import('../sections/QuestionsSection'));
const FinalCta = lazy(() => import('../sections/FinalCta'));

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Suspense fallback={null}>
          <HowItWorks />
          <Channels />
          <DemoSection />
          <QuestionsSection />
          <FinalCta />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

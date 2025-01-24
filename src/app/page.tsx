import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from './testimonials/page'; // Relative import from the same level as your current file
import CTA from '@/components/CTA';

const Page: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Page;

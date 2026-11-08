import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicHeroVideo } from './components/CinematicHeroVideo';
import { HeroCardsBanner } from './components/HeroCardsBanner';
import { InteractiveModals } from './components/InteractiveModals';

export default function App() {
  const [activeNav, setActiveNav] = useState('explore');
  const [activeModal, setActiveModal] = useState<'buy' | 'get-started' | 'learn-more' | 'reviews' | null>(null);

  return (
    <div className="min-h-screen bg-[#eaf1f7] flex flex-col items-center justify-start selection:bg-cyan-500 selection:text-white pb-16">
      <header className="w-full max-w-[1440px] px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 flex flex-col gap-3 sm:gap-4">
        <Navbar
          activeNav={activeNav}
          onNavClick={setActiveNav}
          onGetStartedClick={() => { location.hash = 'register'; }}
        />
        <div
          id="header-16-9-frame"
          className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[580px] max-h-[720px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black"
        >
          <CinematicHeroVideo videoUrl="/hero.mp4" />
        </div>
      </header>

      <section className="w-full">
        <HeroCardsBanner
          onBuyNowClick={() => { location.hash = 'shop'; }}
          onLearnMoreClick={() => setActiveModal('learn-more')}
          onReviewsClick={() => setActiveModal('reviews')}
        />
      </section>

      <InteractiveModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}

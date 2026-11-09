import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Lightbulb } from 'lucide-react';
import { useI18n } from '../i18n';

interface HeroCardsBannerProps {
  onBuyNowClick: () => void;
  onLearnMoreClick: () => void;
  onReviewsClick: () => void;
}

export const HeroCardsBanner: React.FC<HeroCardsBannerProps> = ({
  onBuyNowClick,
  onLearnMoreClick,
  onReviewsClick,
}) => {
  const { t } = useI18n();

  return (
    <section
      id="floating-cards-section"
      className="relative z-30 w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 -mt-12 sm:-mt-14 lg:-mt-16"
    >
      {/* Floating "Buy Now $600" Badge Centered Over the Middle Card */}
      <div className="relative flex justify-center z-40 mb-[-18px] sm:mb-[-20px]">
        <motion.button
          id="btn-buy-now-pill"
          onClick={onBuyNowClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#0a0c10] text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.45)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.6)] transition-all cursor-pointer border border-slate-700/80 flex items-center justify-center gap-2"
        >
          <span className="font-semibold text-white tracking-normal">{t('buyNow')}</span>
        </motion.button>
      </div>

      {/*
        Horizontal 3-Card Row:
        Single horizontal row with equal height (items-stretch),
        smooth rectangular shape with subtle gaps or connected geometry,
        floating directly above the header boundary.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 items-stretch w-full">

        {/* ============================================================ */}
        {/* CARD 1 (LEFT): Empowering Businesses */}
        {/* ============================================================ */}
        <motion.div
          id="card-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-[0_12px_36px_rgba(15,23,42,0.12)] border border-white/80 hover:shadow-[0_16px_44px_rgba(15,23,42,0.18)] transition-all duration-300 flex flex-col justify-between group min-h-[220px] lg:min-h-[250px]"
        >
          {/* Top Icons */}
          <div className="flex items-center gap-3">
            {/* VR Headset pill shape */}
            <div className="w-10 h-6 rounded-full border-[1.5px] border-slate-800 bg-slate-50 flex items-center justify-center gap-1.5 px-2 shadow-2xs group-hover:scale-105 transition-transform">
              <div className="w-2 h-2 rounded-full bg-slate-900" />
              <div className="w-2 h-2 rounded-full bg-slate-900" />
            </div>

            {/* Lightbulb glyph */}
            <div className="w-6 h-6 flex items-center justify-center text-slate-800 group-hover:text-amber-500 transition-colors">
              <Lightbulb className="w-5 h-5 stroke-[1.8]" />
            </div>
          </div>

          {/* Body Text */}
          <div className="my-3">
            <h3 className="text-lg sm:text-[19px] lg:text-[20px] font-medium leading-[1.32] text-slate-900 tracking-tight font-sans">
              {t('leftA')}{' '}
              <span className="font-semibold">{t('leftB')}</span>
            </h3>
          </div>

          {/* Bottom Action */}
          <div className="pt-1">
            <button
              id="btn-learn-more"
              onClick={onLearnMoreClick}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-slate-900 underline underline-offset-4 decoration-slate-900/80 hover:text-cyan-800 hover:decoration-cyan-800 transition-colors cursor-pointer group/link"
            >
              <span>{t('learnMore')}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all rtl:rotate-180 rtl:translate-x-1 rtl:group-hover/link:translate-x-0" />
            </button>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* CARD 2 (CENTER): Discover Advanced VR Innovation */}
        {/* ============================================================ */}
        <motion.div
          id="card-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-[0_14px_40px_rgba(15,23,42,0.15)] border border-slate-100 hover:shadow-[0_18px_48px_rgba(15,23,42,0.2)] transition-all duration-300 flex flex-col items-center justify-center text-center group min-h-[220px] lg:min-h-[250px]"
        >
          <div className="space-y-3 max-w-sm mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 tracking-tight leading-[1.2] font-sans">
              {t('discover1')}
              <br />
              {t('discover2')}
            </h2>

            <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed max-w-[320px] mx-auto">
              {t('discoverBody')}
            </p>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* CARD 3 (RIGHT): 4.9 Rating & 750+ Reviews */}
        {/* ============================================================ */}
        <motion.div
          id="card-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-[0_12px_36px_rgba(15,23,42,0.12)] border border-white/80 hover:shadow-[0_16px_44px_rgba(15,23,42,0.18)] transition-all duration-300 flex flex-col justify-between group min-h-[220px] lg:min-h-[250px]"
        >
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
              4.9
            </span>
          </div>

          {/* User Avatars & 750+ Reviews */}
          <div
            id="hero-reviews-cluster"
            onClick={onReviewsClick}
            className="flex items-center gap-3 py-1 cursor-pointer group/rev"
          >
            {/* 3 Overlapping Avatar Images */}
            <div className="flex -space-x-2.5 items-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt={t('rev1Alt')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white ring-1 ring-slate-200 shadow-2xs"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt={t('rev2Alt')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white ring-1 ring-slate-200 shadow-2xs"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                alt={t('rev3Alt')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white ring-1 ring-slate-200 shadow-2xs"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Reviews Count */}
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                750+
              </span>
              <span className="text-xs font-normal text-slate-500">
                {t('reviewsWord')}
              </span>
            </div>
          </div>

          {/* Caption Subtext */}
          <div className="pt-1">
            <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed">
              {t('reviewsCaption')}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

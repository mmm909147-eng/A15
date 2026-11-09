import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Shield, Cpu, Glasses, Zap } from 'lucide-react';
import { useI18n } from '../i18n';

interface InteractiveModalsProps {
  activeModal: 'buy' | 'get-started' | 'learn-more' | 'reviews' | null;
  onClose: () => void;
}

export const InteractiveModals: React.FC<InteractiveModalsProps> = ({
  activeModal,
  onClose,
}) => {
  const { t } = useI18n();

  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="absolute top-5 end-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content: BUY NOW $600 */}
            {activeModal === 'buy' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                    VR
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
                      {t('buyBadge')}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">
                      {t('buyName')}
                    </h3>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{t('specOptics')}</span>
                    <span className="font-semibold text-slate-900">{t('specOpticsV')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{t('specTrack')}</span>
                    <span className="font-semibold text-slate-900">{t('specTrackV')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{t('specBattery')}</span>
                    <span className="font-semibold text-slate-900">{t('specBatteryV')}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between items-center">
                    <span className="font-medium text-slate-700">{t('launchPrice')}</span>
                    <span dir="ltr" className="text-2xl font-extrabold text-slate-900">$600 <span className="text-xs text-slate-400 line-through">$899</span></span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      alert(t('orderAlert'));
                      onClose();
                    }}
                    className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-center transition-all shadow-md active:scale-98"
                  >
                    {t('orderBtn')}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    {t('orderNote')}
                  </p>
                </div>
              </div>
            )}

            {/* Modal Content: GET STARTED */}
            {activeModal === 'get-started' && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
                    {t('gsBadge')}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 pt-2">
                    {t('gsTitle')}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {t('gsSub')}
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(t('gsAlert'));
                    onClose();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      {t('fullName')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('namePh')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      {t('bizEmail')}
                    </label>
                    <input
                      type="email"
                      required
                      dir="ltr"
                      placeholder={t('emailPh')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      {t('interest')}
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white">
                      <option>{t('int1')}</option>
                      <option>{t('int2')}</option>
                      <option>{t('int3')}</option>
                      <option>{t('int4')}</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
                  >
                    {t('gsBtn')}
                  </button>
                </form>
              </div>
            )}

            {/* Modal Content: LEARN MORE */}
            {activeModal === 'learn-more' && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
                    {t('lmBadge')}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    {t('lmTitle')}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {t('lmSub')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{t('f1t')}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{t('f1d')}</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{t('f2t')}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{t('f2d')}</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{t('f3t')}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{t('f3d')}</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <Glasses className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{t('f4t')}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{t('f4d')}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
                >
                  {t('lmClose')}
                </button>
              </div>
            )}

            {/* Modal Content: REVIEWS */}
            {activeModal === 'reviews' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{t('rvTitle')}</h3>
                    <p className="text-sm text-slate-500">{t('rvSub')}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span dir="ltr" className="font-bold text-lg text-slate-900">4.9 / 5</span>
                  </div>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pe-1">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">Elena Rostova</span>
                      <span className="text-xs text-slate-400">{t('rv1Role')}</span>
                    </div>
                    <p className="text-xs text-slate-600">{t('rv1Text')}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">Marcus Chen</span>
                      <span className="text-xs text-slate-400">{t('rv2Role')}</span>
                    </div>
                    <p className="text-xs text-slate-600">{t('rv2Text')}</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
                >
                  {t('rvClose')}
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

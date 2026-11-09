import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Lang = 'en' | 'ar';

const en = {
  // nav
  nav_explore: 'Explore',
  nav_experiences: 'Experiences',
  nav_technology: 'Technology',
  'nav_about-us': 'About Us',
  getStarted: 'Get Started',
  switchAria: 'Switch language to Arabic',
  switchLabel: 'العربية',
  menuAria: 'Toggle navigation menu',
  // hero video
  futureVision: 'FUTURE VISION',
  hotspotTitle: 'Hover to view Oculus details',
  oculusTag: 'Oculus Vision Pro',
  oculusBadge: '8K Micro-OLED',
  oculusHead: 'Spatial Neural Display',
  foveated: 'Foveated Optic',
  latency: '12ms Latency',
  lidar: 'LiDAR Eye-Tracking',
  active: 'Active',
  pauseVideo: 'Pause Video',
  playVideo: 'Play Video',
  restartVideo: 'Restart Video',
  // cards
  buyNow: 'Buy Now $600',
  leftA: 'Empowering Businesses With',
  leftB: 'Next-Generation VR Technology.',
  learnMore: 'Learn More',
  discover1: 'Discover Advanced VR',
  discover2: 'Innovation',
  discoverBody:
    'Step Into Immersive Virtual Worlds And Experience Next-Generation Innovation Through Cutting-Edge VR',
  reviewsWord: 'Reviews',
  reviewsCaption: 'The perfect VR team to build immersive worlds you can truly experience.',
  rev1Alt: 'Customer Reviewer 1',
  rev2Alt: 'Customer Reviewer 2',
  rev3Alt: 'Customer Reviewer 3',
  // buy modal
  buyBadge: 'Next-Gen System',
  buyName: 'Visor Vision X1',
  specOptics: 'Spatial Optics',
  specOpticsV: '4K Micro-OLED / Eye',
  specTrack: 'Tracking Engine',
  specTrackV: '6DoF Sub-Millimeter',
  specBattery: 'Battery Life',
  specBatteryV: 'Up to 4.5 Hours',
  launchPrice: 'Special Launch Price',
  orderBtn: 'Complete Pre-Order ($600)',
  orderNote: 'Includes 2-year warranty & free worldwide expedited shipping.',
  orderAlert: 'Thank you for ordering Visor VR! Order confirmed.',
  // get started modal
  gsBadge: 'Welcome to Visor',
  gsTitle: 'Get Started With Visor VR',
  gsSub: 'Experience the future of enterprise spatial computing and collaboration.',
  fullName: 'Full Name',
  namePh: 'e.g. Alex Morgan',
  bizEmail: 'Business Email',
  emailPh: 'alex@company.com',
  interest: 'Interest Area',
  int1: 'Enterprise Simulation & Training',
  int2: 'Industrial 3D Design & CAD',
  int3: 'Medical & Healthcare VR',
  int4: 'Visor Hardware Purchase',
  gsBtn: 'Request Guided Demo',
  gsAlert: 'Request received! A Visor specialist will contact you shortly.',
  // learn more modal
  lmBadge: 'Technology Overview',
  lmTitle: 'Empowering Businesses With Next-Gen VR',
  lmSub: 'Visor blends neural optics, zero-latency spatial audio, and haptic feedback.',
  f1t: 'Neural Co-Processor',
  f1d: 'Real-time eye-tracking & foveated rendering',
  f2t: 'Enterprise Security',
  f2d: 'SOC2 & end-to-end encrypted spatial streams',
  f3t: 'Ultra-low Latency',
  f3d: 'Sub-5ms photon-to-motion latency response',
  f4t: 'Ultralight Chassis',
  f4d: 'Only 290g balanced ergonomic fit',
  lmClose: 'Close Overview',
  // reviews modal
  rvTitle: 'Customer Reviews',
  rvSub: 'Over 750+ verified enterprise teams',
  rv1Role: 'CTO, HoloDesign',
  rv1Text:
    '“Visor reduced our collaborative prototyping cycle by 70%. The clarity and tracking precision are completely unmatched.”',
  rv2Role: 'Head of VR, AeroSim',
  rv2Text:
    '“The lightweight form factor allows our engineers to work in virtual spaces for hours with zero fatigue.”',
  rvClose: 'Close Reviews',
};

export type Key = keyof typeof en;

const ar: Record<Key, string> = {
  nav_explore: 'استكشف',
  nav_experiences: 'التجارب',
  nav_technology: 'التقنية',
  'nav_about-us': 'من نحن',
  getStarted: 'ابدأ الآن',
  switchAria: 'Switch language to English',
  switchLabel: 'English',
  menuAria: 'تبديل قائمة التنقل',
  futureVision: 'رؤية المستقبل',
  hotspotTitle: 'مرّر المؤشر لعرض تفاصيل أوكولوس',
  oculusTag: 'أوكولوس فيجن برو',
  oculusBadge: '8K مايكرو-أوليد',
  oculusHead: 'شاشة عصبية مكانية',
  foveated: 'بصريات مركّزة',
  latency: 'زمن استجابة 12 مللي ثانية',
  lidar: 'تتبّع العين بالليدار',
  active: 'نشط',
  pauseVideo: 'إيقاف الفيديو مؤقتًا',
  playVideo: 'تشغيل الفيديو',
  restartVideo: 'إعادة تشغيل الفيديو',
  buyNow: 'اشترِ الآن $600',
  leftA: 'نمكّن الأعمال بواسطة',
  leftB: 'تقنية الواقع الافتراضي من الجيل الجديد.',
  learnMore: 'اعرف المزيد',
  discover1: 'اكتشف ابتكارات',
  discover2: 'الواقع الافتراضي المتقدم',
  discoverBody:
    'ادخل إلى عوالم افتراضية غامرة واختبر ابتكار الجيل الجديد عبر أحدث تقنيات الواقع الافتراضي',
  reviewsWord: 'تقييم',
  reviewsCaption: 'فريق الواقع الافتراضي المثالي لبناء عوالم غامرة يمكنك عيشها حقًا.',
  rev1Alt: 'العميل المراجِع 1',
  rev2Alt: 'العميل المراجِع 2',
  rev3Alt: 'العميل المراجِع 3',
  buyBadge: 'نظام الجيل الجديد',
  buyName: 'فايزر فيجن X1',
  specOptics: 'البصريات المكانية',
  specOpticsV: '4K مايكرو-أوليد / لكل عين',
  specTrack: 'محرك التتبّع',
  specTrackV: '6DoF بدقة أقل من الملّيمتر',
  specBattery: 'عمر البطارية',
  specBatteryV: 'حتى 4.5 ساعات',
  launchPrice: 'سعر الإطلاق الخاص',
  orderBtn: 'إتمام الطلب المسبق ($600)',
  orderNote: 'يشمل ضمان سنتين وشحنًا سريعًا مجانيًا إلى جميع أنحاء العالم.',
  orderAlert: 'شكرًا لطلبك Visor VR! تم تأكيد الطلب.',
  gsBadge: 'مرحبًا بك في Visor',
  gsTitle: 'ابدأ مع Visor VR',
  gsSub: 'اختبر مستقبل الحوسبة المكانية والتعاون للمؤسسات.',
  fullName: 'الاسم الكامل',
  namePh: 'مثال: أحمد العلي',
  bizEmail: 'البريد الإلكتروني للعمل',
  emailPh: 'ahmed@company.com',
  interest: 'مجال الاهتمام',
  int1: 'المحاكاة والتدريب للمؤسسات',
  int2: 'التصميم الصناعي ثلاثي الأبعاد وCAD',
  int3: 'الواقع الافتراضي الطبي والرعاية الصحية',
  int4: 'شراء أجهزة Visor',
  gsBtn: 'اطلب عرضًا توضيحيًا',
  gsAlert: 'تم استلام طلبك! سيتواصل معك أحد مختصي Visor قريبًا.',
  lmBadge: 'نظرة على التقنية',
  lmTitle: 'نمكّن الأعمال بواقع افتراضي من الجيل الجديد',
  lmSub: 'يجمع Visor بين البصريات العصبية والصوت المكاني بلا تأخير والملاحظات اللمسية.',
  f1t: 'معالج مساعد عصبي',
  f1d: 'تتبّع العين فوريًا وعرض مركّز',
  f2t: 'أمان المؤسسات',
  f2d: 'SOC2 وبثّ مكاني مشفّر من طرف إلى طرف',
  f3t: 'زمن استجابة فائق الانخفاض',
  f3d: 'استجابة من الحركة إلى الصورة بأقل من 5 مللي ثانية',
  f4t: 'هيكل خفيف الوزن',
  f4d: 'وزن 290 غرامًا فقط وتوازن مريح',
  lmClose: 'إغلاق النظرة العامة',
  rvTitle: 'تقييمات العملاء',
  rvSub: 'أكثر من 750 فريق مؤسسي موثّق',
  rv1Role: 'المدير التقني، HoloDesign',
  rv1Text:
    '«قلّص Visor دورة النمذجة التعاونية لدينا بنسبة 70%. الوضوح ودقة التتبّع لا مثيل لهما.»',
  rv2Role: 'رئيس الواقع الافتراضي، AeroSim',
  rv2Text:
    '«الشكل الخفيف يتيح لمهندسينا العمل في المساحات الافتراضية لساعات دون أي إرهاق.»',
  rvClose: 'إغلاق التقييمات',
};

const dict: Record<Lang, Record<Key, string>> = { en, ar };

interface I18nValue {
  lang: Lang;
  t: (key: Key) => string;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem('visor-lang') === 'ar' ? 'ar' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('visor-lang', lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  const t = useCallback((key: Key) => dict[lang][key], [lang]);
  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'ar' : 'en')), []);

  return <I18nContext.Provider value={{ lang, t, toggleLang }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider');
  return ctx;
};

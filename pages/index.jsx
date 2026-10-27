import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* القسم الافتتاحي (Hero Section) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            مقرر تقنية المعلومات — الصف الأول الثانوي
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            عالم <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">النظام الثنائي</span> وكمية البيانات
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            منصتك التعليمية التفاعلية لاكتشاف أسرار لغة الكمبيوتر، والفرق بين البيانات التناظرية والرقمية، وكيفية تدوين ومعالجة المعلومات بالأرقام الثنائية <span className="dir-ltr inline-block font-mono text-cyan-300">(0 و 1)</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/lesson"
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5"
            >
              ابدأ الدرس التعليمي
            </Link>
            <Link
              href="/quiz"
              className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-base transition-all hover:-translate-y-0.5"
            >
              اختبر معلوماتك الآن
            </Link>
          </div>
        </div>
      </section>

      {/* قسم تمثيل بصري تعليمي مبسط للثنائي */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">تمثيل بصري مبسط</h3>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">كيف يفهم الكمبيوتر العالم؟</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm text-right">
              <span className="text-2xl font-black text-slate-400 block mb-2 dir-ltr">0</span>
              <h4 className="font-bold text-slate-900 mb-1">حالة الإيقاف (OFF)</h4>
              <p className="text-sm text-slate-600">جهد منخفض، مفتاح مغلق، أو إشارة غير مفعلة.</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 shadow-sm text-right">
              <span className="text-2xl font-black text-blue-600 block mb-2 dir-ltr">1</span>
              <h4 className="font-bold text-slate-900 mb-1">حالة التشغيل (ON)</h4>
              <p className="text-sm text-slate-600">جهد مرتفع، مفتاح مفتوح، أو إشارة مفعلة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* محاور الدرس الرئيسية */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">محاور التعلم الأساسية</h2>
          <p className="text-slate-600 text-lg">محتوى منهجي دقيق مستخرج حصرياً من كتاب المدرسي للصف الأول الثانوي.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* المحور الأول */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-6">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">التناظري والرقمي</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-6">
                التعرف على مفهوم البيانات التناظرية <span className="dir-ltr inline-block">(Analog)</span> والقمية <span className="dir-ltr inline-block">(Digital)</span>، وعمليات التحويل المتبادلة <span className="dir-ltr inline-block">A/D</span> و <span className="dir-ltr inline-block">D/A</span>، ومزايا البيانات الرقمية في النسخ والتعديل.
              </p>
            </div>
            <Link href="/lesson#analog-digital" className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1">
              استكشف المحور ←
            </Link>
          </div>

          {/* المحور الثاني */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-lg mb-6">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">وحدات قياس البيانات</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-6">
                فهم البت <span className="dir-ltr inline-block">(bit)</span> باعتباره أصغر وحدة للمعلومات، والبايت <span className="dir-ltr inline-block">(Byte)</span>، وتصاعد الوحدات التخزينية <span className="dir-ltr inline-block">KB, MB, GB, TB</span> وفق مضاعفات <span className="dir-ltr inline-block">1024</span>.
              </p>
            </div>
            <Link href="/lesson#units" className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1">
              استكشف المحور ←
            </Link>
          </div>

          {/* المحور الثالث */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg mb-6">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">الأنظمة العددية والتحويلات</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-6">
                إتقان التحويل بين النظام العشري <span className="dir-ltr inline-block">(Decimal)</span> والنظام الثنائي <span className="dir-ltr inline-block">(Binary)</span> باستخدام قوى العدد <span className="dir-ltr inline-block">2</span> والقسمة المتكررة.
              </p>
            </div>
            <Link href="/lesson#conversion" className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1">
              استكشف المحور ←
            </Link>
          </div>

        </div>
      </section>

      {/* قسم دور المنصة للطالب والمعلم */}
      <section className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">ط</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">كيف تساعد المنصة الطالب؟</h3>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>تبسيط المفاهيم النظرية المعقدة بأسلوب تفاعلي مريح.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>تقديم خطوات الحل الرياضي والتحويلات بوضوح تام دون غموض.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>اختبار الفهم الذاتي عبر أسئلة تقييمية فورية التغذية الراجعة.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold mb-4">م</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">دعم المعلم في الشرح</h3>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>توفير أمثلة تنظيمية وأنشطة جاهزة للعرض الصفي.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>تسليط الضوء على الأخطاء الشائعة التي يقع فيها الطلاب لمعالجتها مسبقاً.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>الالتزام الكامل بالمحتوى العلمي والمعياري للمنهج الدراسي المعتمد.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* دعوة نهائية للعمل */}
      <section className="py-20 bg-blue-600 text-white text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">جاهز لبدء رحلة التعلم؟</h2>
          <p className="text-blue-100 mb-8 text-lg">انتقل الآن إلى الدرس لتستعرض المفاهيم، أو توجه مباشرة للاختبارات لتقييم مستواك.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/lesson"
              className="px-8 py-4 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-bold text-base shadow-lg transition-all"
            >
              ابدأ الدرس الآن
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* رأس الصفحة ومسار التنقل */}
        <div className="mb-10 text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-500 mb-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">عن المشروع</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            عن منصة النظام الثنائي (Binary System)
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            منصة تعليمية عربية تفاعلية مصممة خصيصاً للطلاب والمعلمين لتبسيط مفاهيم تقنية المعلومات للصف الأول الثانوي.
          </p>
        </div>

        {/* بطاقة المطور / صاحب المشروع */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md mb-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 border-4 border-blue-50 shadow-inner bg-slate-100">
            {/* عرض الصورة الشخصية من مجلد public */}
            <img 
              src="/Me.jpg" 
              alt="صورة مطور المشروع" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-right">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-2 inline-block">
              مطور ومشرف المنصة
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">عمرو أحمد مصطفى</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              طالب بكلية التربية النوعية (قسم تكنولوجيا التعليم)، وقمت بتصميم وتطوير هذه المنصة التعليمية بالكامل لتكون مرجعاً رقمياً متميزاً ومبتكراً يدمج البرمجة وتكنولوجيا التعليم لخدمة الطلاب والمعلمين.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-mono dir-ltr">
              <span>📞</span>
              <a href="tel:01007515059" className="hover:text-cyan-400 transition-colors">01007515059</a>
            </div>
          </div>
        </div>

        {/* فكرة المشروع والأهداف */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
              💡
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">فكرة المشروع</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              تعتمد منصة <strong className="text-slate-900">Binary System</strong> على تحويل المحتوى النظري والرياضي لدرس تقنية المعلومات (المحور الأول والثاني من المنهج المدرسي) إلى تجربة رقمية تفاعلية ومنظمة، تربط المفاهيم بالأمثلة والتدريبات العملية.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-lg mb-4">
              🎯
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">الهدف الأساسي</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              مساعدة الطلاب على استيعاب طبيعة البيانات التناظرية والرقمية، إتقان وحدات قياس التخزين (بت، بايت، ومضاعفاتها)، والتمكن من التحويلات الرياضية بين النظامين العشري والثنائي بدقة وسهولة.
            </p>
          </div>

        </div>

        {/* الفئة المستهدفة */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-8 rounded-2xl shadow-md mb-10">
          <h3 className="text-xl font-bold mb-3 text-cyan-300">الفئة المستهدفة</h3>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            المشروع موجه بشكل أساسي لطلاب الصف الأول الثانوي ومعلمي مواد تقنية المعلومات والحاسب الآلي، ليكون مرجعاً رقمياً مكملاً للكتاب المدرسي، يتيح التعلم الذاتي والتقييم المستمر.
          </p>
        </div>

        {/* كيف تساعد المنصة الطالب والمعلم */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              دور المنصة للطالب
            </h4>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• تبسيط المفاهيم الصعبة عبر أمثلة محلولة خطوة بخطوة.</li>
              <li>• التدرب التفاعلي الفوري مع تغذية راجعة تشرح أسباب الإجابات.</li>
              <li>• اختبار مدى الاستيعاب ذاتياً وبناء الثقة في المسائل الحسابية.</li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-600"></span>
              استفادة المعلم في الشرح
            </h4>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• توفير أمثلة تنظيمية وأنشطة جاهزة للعرض داخل الفصل.</li>
              <li>• تسليط الضوء على الأخطاء الشائعة لمعالجتها مسبقاً لدى الطلاب.</li>
              <li>• الالتزام التام بالمنهج الرسمي والمعايير الدراسية المعتمدة.</li>
            </ul>
          </div>

        </div>

        {/* أقسام الموقع وروابط الوصول */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
          <h3 className="text-xl font-bold text-slate-900 mb-4">أقسام المنصة وخدماتها</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <Link href="/" className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 transition-all group">
              <h5 className="font-bold text-slate-900 group-hover:text-blue-600 mb-1">الصفحة الرئيسية</h5>
              <p className="text-xs text-slate-500">نظرة عامة ومسار التنقل للمحاور.</p>
            </Link>

            <Link href="/lesson" className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 transition-all group">
              <h5 className="font-bold text-slate-900 group-hover:text-blue-600 mb-1">الدرس التعليمي</h5>
              <p className="text-xs text-slate-500">الشرح المفصل والأمثلة خطوة بخطوة.</p>
            </Link>

            <Link href="/quiz" className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 transition-all group">
              <h5 className="font-bold text-slate-900 group-hover:text-blue-600 mb-1">الاختبارات التفاعلية</h5>
              <p className="text-xs text-slate-500">أسئلة تقييم وتغذية راجعة فورية.</p>
            </Link>

          </div>
        </div>

        {/* زر العودة */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
          >
            العودة إلى الصفحة الرئيسية ➔
          </Link>
        </div>

      </div>
    </div>
  );
}
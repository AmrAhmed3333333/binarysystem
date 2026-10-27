import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-between">
          
          {/* معلومات المشروع */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                <span className="dir-ltr">01</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">منصة النظام الثنائي التعليمية</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              منصة تفاعلية مخصصة لطلاب الصف الأول الثانوي لتبسيط مفاهيم تقنية المعلومات، الأنظمة العددية، وكمية البيانات وفق المنهج الدراسي الرسمي.
            </p>
          </div>

          {/* روابط سريعة */}
          <div className="flex flex-col md:items-center">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">روابط سريعة</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">الرئيسية</Link>
              <Link href="/lesson" className="text-slate-400 hover:text-white transition-colors">الدرس التعليمي</Link>
              <Link href="/quiz" className="text-slate-400 hover:text-white transition-colors">الاختبارات</Link>
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">عن المشروع</Link>
            </div>
          </div>

          {/* الحقوق */}
          <div className="md:text-left text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Binary System Platform.</p>
            <p className="mt-1">جميع الحقوق محفوظة للمنهج التعليمي المصري - الصف الأول الثانوي.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
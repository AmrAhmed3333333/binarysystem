import { useState } from 'react';
import Link from 'next/link';

// قائمة الأسئلة المستخرجة بدقة من محتوى الدرس والتدريبات الرسمية في الكتاب
const quizQuestions = [
  {
    id: 1,
    category: 'التناظري والرقمي',
    question: 'أي من العبارات التالية تصف بدقة طبيعة "البيانات الرقمية" (Digital Data)؟',
    options: [
      'كميات تتغير تدريجيًا وبشكل مستمر مثل عمود الزئبق في ميزان الحرارة.',
      'بيانات يمكن تجميعها، استنساخها، وتعديلها دون أي إهدار، ويسهل تصحيح التشوه فيها.',
      'كميات لا يمكن تمثيلها باستخدام الرقمين 0 و 1 بأي حال من الأحوال.',
      'إشارات كهربائية مستمرة تتغير بلا توقف عبر الزمن.'
    ],
    correctIndex: 1,
    explanation: 'البيانات الرقمية تتميز بأنها تتغير في خطوات محددة ومنفصلة، ويمكن استنساخها وتعديلها ونقلها بكفاءة دون إهدار، وتصحيح تشوهاتها بسهولة، بخلاف البيانات التناظرية المستمرة[cite: 1, 2].'
  },
  {
    id: 2,
    category: 'التناظري والرقمي',
    question: 'ما هو المصطلح العلمي لعملية "تحويل البيانات التناظرية إلى بيانات رقمية"؟',
    options: [
      'تحويل D/A conversion',
      'التحويل الثنائي Binary System',
      'تحويل A/D conversion (Digitization)',
      'الترميز العشري Decimal Encoding'
    ],
    correctIndex: 2,
    explanation: 'عملية تحويل البيانات من الشكل التناظري (Analog) إلى الرقمي (Digital) تُعرف بـ A/D conversion أو الترقيم (Digitization)، والعكس هو D/A[cite: 1].'
  },
  {
    id: 3,
    category: 'وحدات البيانات والاحتمالات',
    question: 'كم عدد الاحتمالات المختلفة التي يمكن تمثيلها باستخدام 4 bits من البيانات؟',
    options: [
      '8 احتمالات',
      '16 احتمالاً',
      '32 احتمالاً',
      '256 احتمالاً'
    ],
    correctIndex: 1,
    explanation: 'باستخدام قانون عدد الاحتمالات بـ n من الـ bits وهو (2ⁿ)، فإن 4 bits تعطي (2⁴ = 16) احتمالاً مختلفاً[cite: 3, 5].'
  },
  {
    id: 4,
    category: 'وحدات البيانات والاحتمالات',
    question: 'إذا كان لديك 3 بايت (Bytes)، فكم يبلغ عدد الـ bits المكافئ لها؟',
    options: [
      '16 bit',
      '24 bit',
      '32 bit',
      '256 bit'
    ],
    correctIndex: 1,
    explanation: 'بما أن البايت الواحد يتكون من 8 bits، إذن (3 Bytes × 8 = 24 bits)[cite: 3, 4].'
  },
  {
    id: 5,
    category: 'التحويلات العددية',
    question: 'ما هي القيمة العشرية المكافئة للعدد الثنائي (10111)₂ ؟',
    options: [
      'العدد 19',
      'العدد 21',
      'العدد 23',
      'العدد 27'
    ],
    correctIndex: 2,
    explanation: 'يتم حسابها بقوى العدد 2 من اليمين: (1×2⁰ + 1×2¹ + 1×2² + 0×2³ + 1×2⁴) = (1 + 2 + 4 + 0 + 16) = 23[cite: 3].'
  },
  {
    id: 6,
    category: 'التحويلات العددية',
    question: 'عند تحويل الرقم العشري 6 إلى النظام الثنائي باستخدام القسمة المتكررة على 2، ما هي النتيجة الصحيحة؟',
    options: [
      '(110)₂',
      '(101)₂',
      '(111)₂',
      '(1000)₂'
    ],
    correctIndex: 0,
    explanation: 'بقسمة 6 ÷ 2 = 3 والباقي 0، ثم 3 ÷ 2 = 1 والباقي 1، ثم 1 ÷ 2 = 0 والباقي 1. قراءة البواقي من الأخير للأول تعطي (110)₂[cite: 4].'
  }
];

export default function QuizPage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ = quizQuestions[currentIndex];

  const handleOptionSelect = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswersHistory((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        category: currentQ.category,
        questionText: currentQ.question,
        selectedOption: currentQ.options[selectedOption],
        correctOption: currentQ.options[currentQ.correctIndex],
        isCorrect,
        explanation: currentQ.explanation
      }
    ]);

    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnswersHistory([]);
    setIsQuizCompleted(false);
  };

  // تحديد مستوى الأداء بناءً على النتيجة
  const getPerformanceLevel = (percentage) => {
    if (percentage === 100) return { title: 'خبير النظام الثنائي 🏆', desc: 'إنجاز مذهل! إتقان كامل لشفرات ومفاهيم البيانات الرقمية.' };
    if (percentage >= 75) return { title: 'متمكن 🌟', desc: 'أداء ممتاز جداً! استيعاب قوي لمعظم مفاهيم المنهج.' };
    if (percentage >= 50) return { title: 'متقدم في الفهم 📈', desc: 'بداية رائعة ومستوى جيد، وتحتاج لمراجعة بسيطة لبعض التحويلات.' };
    return { title: 'بداية التعلم 💡', desc: 'ننصحك بمراجعة الدرس التعليمي مرة أخرى لتثبيت المعلومات الأساسية.' };
  };

  // استخراج الموضوعات التي تحتاج لمراجعة بناءً على الأخطاء
  const getWeakCategories = () => {
    const failedCategories = answersHistory
      .filter(item => !item.isCorrect)
      .map(item => item.category);
    return Array.from(new Set(failedCategories));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* شاشة البداية: Binary Challenge Lab */}
        {!quizStarted ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center animate-fadeIn">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#111827] to-[#2563EB] text-[#22D3EE] mx-auto flex items-center justify-center font-mono font-black text-2xl mb-6 shadow-lg shadow-blue-500/20 dir-ltr">
              01
            </div>

            <span className="px-4 py-1.5 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold tracking-wider uppercase mb-4 inline-block">
              BINARY CHALLENGE LAB
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight mb-4">
              تحدّي النظام الثنائي
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
              اختبر معلوماتك، فك الشفرة، واكتشف مستواك في عالم البيانات الرقمية والنظام الثنائي لطلاب الصف الأول الثانوي.
            </p>

            {/* تفاصيل التحدي */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-right">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">عدد التحديات</span>
                <span className="font-bold text-lg text-[#111827]">6 أسئلة دقيقة</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">المحاور المستهدفة</span>
                <span className="font-bold text-sm text-[#2563EB]">التناظري، الوحدات، والتحويلات</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">التغذية الراجعة</span>
                <span className="font-bold text-sm text-emerald-600">تفسير فوري لكل إجابة</span>
              </div>
            </div>

            <button
              onClick={() => setQuizStarted(true)}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              ابدأ التحدي الآن 🚀
            </button>
          </div>
        ) : !isQuizCompleted ? (
          /* واجهة الأسئلة النشطة */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 animate-fadeIn">
            
            {/* شريط معلومات التحدي العلوي */}
            <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-slate-100 gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold">
                {currentQ.category}
              </span>
              <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">
                <span>الإجابات الصحيحة: <strong className="text-emerald-600 font-bold">{score}</strong></span>
                <span>السؤال <strong className="text-[#111827] font-bold">{currentIndex + 1}</strong> من {quizQuestions.length}</span>
              </div>
            </div>

            {/* شريط التقدم البصري */}
            <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-[#2563EB] transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>

            {/* نص السؤال */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-8 leading-relaxed">
              {currentQ.question}
            </h2>

            {/* خيارات الإجابة */}
            <div className="space-y-4 mb-8">
              {currentQ.options.map((option, index) => {
                let optionStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                
                if (selectedOption === index) {
                  optionStyle = 'border-[#2563EB] bg-blue-50/50 text-[#111827] ring-2 ring-blue-500/20 font-semibold';
                }

                if (isAnswerSubmitted) {
                  if (index === currentQ.correctIndex) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  } else if (selectedOption === index && index !== currentQ.correctIndex) {
                    optionStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                  } else {
                    optionStyle = 'border-slate-200 opacity-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-right p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-base sm:text-lg cursor-pointer ${optionStyle}`}
                  >
                    <span>{option}</span>
                    <span className="w-8 h-8 rounded-xl border border-slate-300 flex items-center justify-center text-sm font-bold shrink-0 font-mono">
                      {index + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* زر التأكيد أو صندوق التغذية الراجعة */}
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-md cursor-pointer ${
                  selectedOption !== null
                    ? 'bg-[#2563EB] hover:bg-blue-600 text-white shadow-blue-600/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                تأكيد الإجابة
              </button>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                <div className={`p-6 rounded-2xl border ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50/70 border-rose-200 text-rose-900'
                }`}>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    {selectedOption === currentQ.correctIndex ? '✅ إجابة موفقة وصحيحة!' : '💡 مش مشكلة، خلينا نفهمها مع بعض:'}
                  </h4>
                  <p className="text-base leading-relaxed text-slate-700 mt-2">
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full py-4 rounded-2xl bg-[#111827] hover:bg-slate-800 text-white font-bold text-lg transition-all shadow-md cursor-pointer"
                >
                  {currentIndex + 1 < quizQuestions.length ? 'السؤال التالي ➔' : 'عرض النتيجة النهائية 🏆'}
                </button>
              </div>
            )}

          </div>
        ) : (
          /* شاشة النتيجة النهائية الاحترافية وملخص الإجابات والمراجعة */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 animate-fadeIn">
            
            <div className="text-center mb-10">
              <div className="w-24 h-24 rounded-3xl bg-blue-50 text-[#2563EB] mx-auto flex items-center justify-center font-black text-3xl mb-6 shadow-inner font-mono">
                {Math.round((score / quizQuestions.length) * 100)}%
              </div>

              <span className="px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                {getPerformanceLevel(Math.round((score / quizQuestions.length) * 100)).title}
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-[#111827] mb-2">أتممت التحدي بنجاح!</h2>
              <p className="text-slate-600 text-lg mb-6">
                {getPerformanceLevel(Math.round((score / quizQuestions.length) * 100)).desc}
              </p>
              <p className="text-sm font-semibold text-slate-500">
                أجبت بشكل صحيح على <strong className="text-[#2563EB] font-bold text-lg">{score}</strong> من أصل <strong className="text-[#111827] font-bold text-lg">{quizQuestions.length}</strong> أسئلة.
              </p>
            </div>

            {/* التوصية بالمراجعة إن وجدت أخطاء */}
            {getWeakCategories().length > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 mb-8 text-sm">
                <span className="font-bold block mb-1">💡 توصية للمراجعة الذكية:</span>
                راجع المحاور المتعلقة بـ (<strong className="underline">{getWeakCategories().join('، ')}</strong>) لتعزيز مستواك في المحاولة القادمة.
              </div>
            )}

            {/* أزرار التحكم النهائية */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <button
                onClick={handleRestartQuiz}
                className="px-8 py-4 rounded-2xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                إعادة التحدي 🔄
              </button>
              <Link
                href="/lesson"
                className="px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base transition-colors"
              >
                مراجعة الدرس التعليمي 📖
              </Link>
            </div>

            {/* ملخص الإجابات الشامل */}
            <div className="text-right border-t border-slate-200 pt-8">
              <h3 className="font-bold text-[#111827] mb-6 text-xl">مراجعة شاملة لإجاباتك:</h3>
              <div className="space-y-4">
                {answersHistory.map((ans, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border text-sm sm:text-base ${ans.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-900">سؤال {idx + 1}: {ans.questionText}</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 ${ans.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                        {ans.isCorrect ? 'صحيح' : 'خطأ'}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-1">إجابتك المختارة: <span className="font-semibold">{ans.selectedOption}</span></p>
                    {!ans.isCorrect && (
                      <p className="text-emerald-700 mb-2">الإجابة الصحيحة: <span className="font-semibold">{ans.correctOption}</span></p>
                    )}
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 bg-white/90 p-3 rounded-xl border border-slate-200/60 leading-relaxed">{ans.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
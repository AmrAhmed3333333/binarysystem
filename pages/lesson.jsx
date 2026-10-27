import { useState } from 'react';
import Link from 'next/link';

export default function LessonPage() {
  // حالات تفاعلية للأنشطة والأسئلة
  const [showAns1, setShowAns1] = useState(false);
  const [userBinaryInput, setUserBinaryInput] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  
  // حالة تفاعلية لحاسبة وحدات التخزين
  const [storageUnit, setStorageUnit] = useState('KB');
  const [storageAmount, setStorageAmount] = useState(1);

  // حالة تفاعلية لمُحاكي خطوات القسمة من عشري إلى ثنائي
  const [decimalInput, setDecimalInput] = useState(6);

  // ================= حالات التفاعل للمحور الأول الجديد ================= //
  // 1. Slider درجة الحرارة (البيانات التناظرية)
  const [tempValue, setTempValue] = useState(22.5);

  // 2. زر الإشارة الرقمية (0 و 1)
  const [digitalState, setDigitalState] = useState(0); // 0 أو 1

  // 3. نشاط تصنيف الأمثلة الحياتية
  const [selectedExampleType, setSelectedExampleType] = useState({});
  const [exampleFeedback, setExampleFeedback] = useState({});

  // 4. اختبار الفهم القصير (3 أسئلة)
  const [quizStep, setQuizStep] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const lessonQuizQuestions = [
    {
      id: 1,
      question: 'لماذا يُعد تغير درجة الحرارة مثالًا مناسبًا لفهم التغير التناظري؟',
      options: [
        'لأنه يتغير بصورة مستمرة وتدريجية ويمر بقيم كسرية مختلفة دون قفزات مفاجئة.',
        'لأنه يعتمد حصرياً على الرقمين 0 و 1 في الحاسوب.',
        'لأنه لا يمكن قياسه بأي وسيلة رقمية مطلقا.'
      ],
      correct: 0,
      explanation: 'صحيح! درجة الحرارة كمية تتغير باستمرار بتدرج ناعم بين القيم المختلفة (مثل القيم الكسرية)، وهو جوهر البيانات التناظرية.'
    },
    {
      id: 2,
      question: 'إذا انتقلت إشارة بين حالتي 0 و1 فقط، فما الذي يصف طبيعتها؟',
      options: [
        'إشارة تناظرية مستمرة.',
        'إشارة رقمية ثنائية (Binary Digital).',
        'مقياس حرارة بعمود زئبق.'
      ],
      correct: 1,
      explanation: 'أحسنت! الانتقال بين مستويات محددة ومنفصلة (مثل حالتي 0 و 1 في النظام الثنائي) يمثل إشارة رقمية.'
    },
    {
      id: 3,
      question: 'لديك رسومان: أحدهما منحنى ناعم متصل، والآخر درجات سلمية منفصلة؛ أيهما يمثل البيانات الرقمية ولماذا؟',
      options: [
        'المنحنى المتصل، لأنه يغير قيمته بسرعة.',
        'الدرجات المنفصلة، لأنها تُمثل القيم في خطوات وحالات محددة ومنفصلة.',
        'كلاهما يمثلان بيانات تناظرية.'
      ],
      correct: 1,
      explanation: 'ممتاز! الرسم ذو الدرجات المنفصلة يعبر بدقة عن البيانات الرقمية التي تتغير في خطوات محددة ومنفصلة.'
    }
  ];

  const handleQuizAnswer = (optionIdx) => {
    if (quizSubmitted) return;
    setQuizSelectedOption(optionIdx);
  };

  const handleQuizSubmit = () => {
    if (quizSelectedOption === null) return;
    const isCorrect = quizSelectedOption === lessonQuizQuestions[quizStep].correct;
    if (isCorrect) setQuizScore(prev => prev + 1);
    setQuizSubmitted(true);
  };

  const handleNextQuizQuestion = () => {
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
    if (quizStep + 1 < lessonQuizQuestions.length) {
      setQuizStep(prev => prev + 1);
    } else {
      setQuizStep(lessonQuizQuestions.length); // نهاية الاختبار
    }
  };

  // دالة تحقق التدريب العشري إلى ثنائي
  const handleConversionCheck = (e) => {
    e.preventDefault();
    if (userBinaryInput.trim() === '110') {
      setConversionResult({ correct: true, msg: 'أحسنت! الإجابة صحيحة. الرقم 6 في النظام العشري يساوي (110) في النظام الثنائي.' });
    } else {
      setConversionResult({ correct: false, msg: 'حاول مرة أخرى! تذكر: اقسم العدد على 2 بشكل متكرر وخذ البواقي من الأسفل للأعلى.' });
    }
  };

  // حساب تقديري لوحدات التخزين
  const getBytesText = () => {
    if (storageUnit === 'KB') return `${storageAmount * 1024} بايت (${storageAmount * 1024 * 8} بت)`;
    if (storageUnit === 'MB') return `${storageAmount * 1024} كيلوبايت (${storageAmount * 1024 * 1024} بايت)`;
    if (storageUnit === 'GB') return `${storageAmount * 1024} ميجابايت`;
    if (storageUnit === 'TB') return `${storageAmount * 1024} جيجابايت`;
    return '';
  };

  // دالة توليد خطوات القسمة المتكررة للرقم العشري
  const generateBinarySteps = (num) => {
    let current = parseInt(num, 10);
    if (isNaN(current) || current < 0) return { steps: [], binaryResult: '0' };
    if (current === 0) return { steps: [{ number: 0, quotient: 0, remainder: 0 }], binaryResult: '0' };

    const steps = [];
    let remainders = [];

    while (current > 0) {
      const quotient = Math.floor(current / 2);
      const remainder = current % 2;
      steps.push({
        number: current,
        quotient: quotient,
        remainder: remainder
      });
      remainders.push(remainder);
      current = quotient;
    }

    const binaryResult = remainders.reverse().join('');
    return { steps, binaryResult };
  };

  const { steps: divisionSteps, binaryResult: simulatedBinary } = generateBinarySteps(decimalInput);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* رأس الصفحة ومسار التنقل */}
        <div className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <Link href="/" className="hover:text-[#2563EB] transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-[#0F172A] font-semibold">الدرس التعليمي الشامل</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[38px] font-black text-[#111827] tracking-tight mb-4 leading-tight">
            مقرر تقنية المعلومات: النظام الثنائي وكمية البيانات
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl leading-[1.8]">
            مرحباً بك في مختبر <span className="text-[#2563EB] font-bold">Binary Lab</span> التعليمي. استكشف المفاهيم بعمق من خلال التجارب البصرية التفاعلية أدناه.
          </p>
        </div>

        {/* شريط التنقل السريع بين المحاور */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-10 flex flex-wrap gap-3 items-center justify-between">
          <span className="text-sm font-bold text-slate-700">التنقل السريع:</span>
          <div className="flex flex-wrap gap-2">
            <a href="#analog-digital" className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#2563EB] text-sm font-semibold hover:bg-blue-100 transition-colors">1. التناظري والرقمي</a>
            <a href="#units-binary" className="px-3 py-1.5 rounded-lg bg-cyan-50 text-cyan-700 text-sm font-semibold hover:bg-cyan-100 transition-colors">2. النظام الثنائي وكمية البيانات</a>
            <a href="#division-simulator" className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 text-sm font-bold hover:bg-blue-200 transition-colors">⚡ محاكي القسمة</a>
            <a href="#interactive-calc" className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-semibold hover:bg-indigo-100 transition-colors">3. حاسبة السعات</a>
            <a href="#common-mistakes" className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-sm font-semibold hover:bg-amber-100 transition-colors">4. أخطاء شائعة</a>
          </div>
        </div>

        {/* ================= المحور الأول المُعاد تصميمه بالكامل ================= */}
        <section id="analog-digital" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-12">
          
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20">01</div>
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-black text-[#111827]">المحور الأول: التناظري والرقمي</h2>
              <span className="text-sm text-[#2563EB] font-bold dir-ltr block">Analog & Digital Data</span>
            </div>
          </div>

          <div className="space-y-10">
            
            {/* ثانياً: ابدأ بسؤال من الحياة اليومية */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50/70 to-slate-50 border border-blue-100">
              <h3 className="text-[22px] sm:text-[25px] font-bold text-[#111827] mb-4">
                «هل كل شيء في العالم يتغير بنفس الطريقة؟»
              </h3>
              <p className="text-lg sm:text-xl text-slate-700 leading-[1.8] mb-6">
                تأمل من حولك: عندما تشرق الشمس، ترتفع درجة الحرارة تدريجياً وبشكل متصل من <span className="dir-ltr font-mono font-bold text-[#2563EB]">20°C</span> إلى <span className="dir-ltr font-mono font-bold text-[#2563EB]">21°C</span> دون قفزات مفاجئة. هذه هي الطبيعة <strong className="text-[#111827]">التناظرية</strong>. أما في أجهزة الكمبيوتر، تُعالج البيانات في صورة حالات واضحة ومنفصلة باستخدام النظام الثنائي <span className="dir-ltr font-mono font-bold text-[#22D3EE] bg-slate-900 px-2 py-0.5 rounded">0 و 1</span>.
              </p>
            </div>

            {/* ثالثاً: أنشئ مقارنة بصرية تفاعلية */}
            <div>
              <h3 className="text-[24px] sm:text-[28px] font-bold text-[#111827] mb-6 text-center">
                شاهد الفرق بنفسك ⚡
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* البطاقة الأولى: البيانات التناظرية */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#2563EB] text-xs font-bold mb-3">التغير مستمر</div>
                    <h4 className="text-[22px] font-bold text-[#111827] mb-2">البيانات التناظرية (Analog)</h4>
                    <p className="text-base sm:text-lg text-slate-600 leading-[1.7] mb-6">
                      يمكن أن تتغير القيمة تدريجياً بلا انقطاع، مثل تغير درجة الحرارة أو تدفق الصوت الصوتي البشري.
                    </p>
                  </div>

                  {/* تفاعل حقيقي بالسلايدر */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">حرك مؤشر درجة الحرارة:</label>
                    <input 
                      type="range" 
                      min="15" 
                      max="35" 
                      step="0.5"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-full accent-[#2563EB] cursor-pointer mb-3"
                    />
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-slate-500">15°C</span>
                      <span className="text-xl font-mono text-[#2563EB] dir-ltr bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">{tempValue} °C</span>
                      <span className="text-slate-500">35°C</span>
                    </div>
                  </div>
                </div>

                {/* البطاقة الثانية: البيانات الرقمية */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold mb-3">التغير في حالات منفصلة</div>
                    <h4 className="text-[22px] font-bold text-[#111827] mb-2">البيانات الرقمية (Digital)</h4>
                    <p className="text-base sm:text-lg text-slate-600 leading-[1.7] mb-6">
                      تُمثّل القيم في حالات منفصلة ومحددة، ويستخدم الحاسوب النظام الثنائي المبني على الحالتين <span className="dir-ltr font-mono font-bold">0 و 1</span>.
                    </p>
                  </div>

                  {/* تفاعل حقيقي بأزرار التبديل */}
                  <div className="p-5 rounded-xl bg-slate-900 text-white border border-slate-800 text-center">
                    <span className="text-xs text-cyan-400 font-bold block mb-2">محاكي الإشارة الثنائية (Binary State):</span>
                    <div className="flex justify-center gap-4 mb-4">
                      <button 
                        onClick={() => setDigitalState(0)}
                        className={`px-6 py-3 rounded-xl font-mono text-xl font-bold transition-all ${digitalState === 0 ? 'bg-cyan-500 text-slate-950 shadow-lg scale-105' : 'bg-slate-800 text-slate-400'}`}
                      >
                        0 (OFF)
                      </button>
                      <button 
                        onClick={() => setDigitalState(1)}
                        className={`px-6 py-3 rounded-xl font-mono text-xl font-bold transition-all ${digitalState === 1 ? 'bg-[#22D3EE] text-slate-950 shadow-lg scale-105' : 'bg-slate-800 text-slate-400'}`}
                      >
                        1 (ON)
                      </button>
                    </div>
                    <div className="text-sm text-slate-300">
                      الحالة الحالية: <strong className="text-cyan-300 font-mono text-lg">{digitalState}</strong> ({digitalState === 0 ? 'مفتاح مغلق / جهد منخفض' : 'مفتاح مفتوح / جهد مرتفع'})
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* رابعاً: تجربة جرّب بنفسك */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-dashed border-slate-300">
              <h3 className="text-[22px] sm:text-[25px] font-bold text-[#111827] mb-4">
                جرّب أن تشرح الفرق بنفسك 🎯
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-[1.7]">
                اختبر استيعابك عبر تصنيف الأمثلة التالية في مكانها الصحيح:
              </p>

              <div className="space-y-4">
                {[
                  { id: 'ex1', title: 'ساعة ذات عقارب متصلة الحركة', type: 'analog', desc: 'تتحرك العقارب بسلاسة وبدون قفزات.' },
                  { id: 'ex2', title: 'ساعة رقمية تعرِض الأرقام مباشرة', type: 'digital', desc: 'تتغير القيمة الدقيقة بشكل رقمي منفصل.' }
                ].map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h5 className="font-bold text-[#0F172A] text-lg">{item.title}</h5>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedExampleType(prev => ({ ...prev, [item.id]: 'analog' }));
                          setExampleFeedback(prev => ({ ...prev, [item.id]: item.type === 'analog' }));
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedExampleType[item.id] === 'analog' ? 'bg-[#2563EB] text-white' : 'bg-white text-slate-700 border border-slate-300'}`}
                      >
                        تناظري
                      </button>
                      <button
                        onClick={() => {
                          setSelectedExampleType(prev => ({ ...prev, [item.id]: 'digital' }));
                          setExampleFeedback(prev => ({ ...prev, [item.id]: item.type === 'digital' }));
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedExampleType[item.id] === 'digital' ? 'bg-cyan-600 text-white' : 'bg-white text-slate-700 border border-slate-300'}`}
                      >
                        رقمي
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* سادساً: المفاهيم الأساسية والجدول المقارن */}
            <div>
              <h3 className="text-[24px] font-bold text-[#111827] mb-6">المفاهيم الأساسية والتعريفات الرسمية</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <h4 className="text-xl font-bold text-[#2563EB] mb-2">البيانات التناظرية (Analog Data)</h4>
                  <p className="text-base sm:text-lg text-slate-700 leading-[1.8]">بيانات تتغير بصورة مستمرة ضمن نطاق من القيم، مثل قياس الوقت أو درجة الحرارة.</p>
                </div>
                <div className="p-6 rounded-2xl bg-cyan-50/50 border border-cyan-100">
                  <h4 className="text-xl font-bold text-cyan-800 mb-2">البيانات الرقمية (Digital Data)</h4>
                  <p className="text-base sm:text-lg text-slate-700 leading-[1.8]">بيانات تُمثّل بقيم أو حالات منفصلة، ويستخدم النظام الثنائي لتمثيلها عبر 0 و 1.</p>
                </div>
              </div>

              {/* جدول المقارنة */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-right border-collapse text-base">
                  <thead>
                    <tr className="bg-[#111827] text-white">
                      <th className="p-4">وجه المقارنة</th>
                      <th className="p-4">البيانات التناظرية (Analog)</th>
                      <th className="p-4">البيانات الرقمية (Digital)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="p-4 font-bold text-slate-900">طبيعة التغير</td>
                      <td className="p-4 text-slate-700">مستمر وتدريجي بلا انقطاع</td>
                      <td className="p-4 text-slate-700">منفصل في خطوات وحالات محددة</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">طريقة التمثيل</td>
                      <td className="p-4 text-slate-700">كميات فيزيائية متصلة</td>
                      <td className="p-4 text-slate-700">أرقام ونظام ثنائي (0 و 1)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">أمثلة توضيحية</td>
                      <td className="p-4 text-slate-700">درجة الحرارة، الوقت المستمر</td>
                      <td className="p-4 text-slate-700">الأجهزة الرقمية، الحاسوب</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* سابعاً: اختبار فهم قصير للمحور الأول */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                  اختبار فهم المحور الأول
                </span>
                <span className="text-sm font-semibold text-slate-400">
                  السؤال <span className="text-white font-bold">{quizStep + 1}</span> من {lessonQuizQuestions.length}
                </span>
              </div>

              {quizStep < lessonQuizQuestions.length ? (
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-6 leading-relaxed">
                    {lessonQuizQuestions[quizStep].question}
                  </h4>

                  <div className="space-y-3 mb-6">
                    {lessonQuizQuestions[quizStep].options.map((opt, idx) => {
                      let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700';
                      if (quizSelectedOption === idx) {
                        btnStyle = 'bg-blue-600 border-blue-500 text-white ring-2 ring-blue-400/30';
                      }
                      if (quizSubmitted) {
                        if (idx === lessonQuizQuestions[quizStep].correct) {
                          btnStyle = 'bg-emerald-900/80 border-emerald-500 text-emerald-100 font-bold';
                        } else if (quizSelectedOption === idx && idx !== lessonQuizQuestions[quizStep].correct) {
                          btnStyle = 'bg-rose-900/80 border-rose-500 text-rose-100';
                        }
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(idx)}
                          disabled={quizSubmitted}
                          className={`w-full text-right p-4 rounded-xl border-2 transition-all flex justify-between items-center text-base sm:text-lg ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          <span className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                            {idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={quizSelectedOption === null}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md ${quizSelectedOption !== null ? 'bg-[#2563EB] hover:bg-blue-500 text-white cursor-pointer' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                    >
                      تأكيد الإجابة
                    </button>
                  ) : (
                    <div className="space-y-4 animate-fadeIn">
                      <div className={`p-4 rounded-xl border ${quizSelectedOption === lessonQuizQuestions[quizStep].correct ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-rose-950/60 border-rose-800 text-rose-200'}`}>
                        <h5 className="font-bold mb-1">
                          {quizSelectedOption === lessonQuizQuestions[quizStep].correct ? '✅ إجابة صحيحة!' : '❌ إجابة غير صحيحة!'}
                        </h5>
                        <p className="text-sm leading-relaxed text-slate-300 mt-2">
                          {lessonQuizQuestions[quizStep].explanation}
                        </p>
                      </div>
                      <button
                        onClick={handleNextQuizQuestion}
                        className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg transition-all shadow-md"
                      >
                        السؤال التالي ➔
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 animate-fadeIn">
                  <div className="text-4xl font-black text-cyan-400 mb-2">🎉 أحسنت الانتهاء!</div>
                  <p className="text-lg text-slate-300 mb-6">لقد أجريت اختبار الفهم بنجاح وأحرزت {quizScore} من {lessonQuizQuestions.length}.</p>
                  <button
                    onClick={() => { setQuizStep(0); setQuizScore(0); setQuizSubmitted(false); setQuizSelectedOption(null); }}
                    className="px-8 py-3 rounded-xl bg-[#2563EB] text-white font-bold text-base"
                  >
                    إعادة الاختبار 🔄
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>


        {/* ================= المحور الثاني (كما هو دون تغيير) ================= */}
        <section id="units-binary" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-12">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-600/20">02</div>
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-black text-[#111827]">المحور الثاني: النظام الثنائي وكمية البيانات</h2>
              <span className="text-sm text-cyan-600 font-semibold dir-ltr block">Bits, Bytes & Number Systems</span>
            </div>
          </div>

          <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-[#111827] mb-3 text-xl">1. وحدات البيانات واحتمالات التمثيل <span className="dir-ltr font-mono text-base">(2ⁿ)</span></h3>
              <ul className="space-y-3 text-base sm:text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <div>
                    <strong className="text-[#111827]">البت <span className="dir-ltr font-mono text-cyan-600">(bit)</span>:</strong> أصغر وحدة للمعلومات، لها حالتان فقط <span className="dir-ltr font-mono font-bold">0</span> أو <span className="dir-ltr font-mono font-bold">1</span>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <div>
                    <strong className="text-[#111827]">عدد الاحتمالات:</strong> باستخدام <span className="dir-ltr font-mono text-cyan-600">n</span> من الـ <span className="dir-ltr font-mono">bits</span>، يمكن تمثيل <span className="dir-ltr font-mono font-bold text-cyan-600">2ⁿ</span> احتمالاً مختلفاً.
                    <div className="mt-1 text-sm text-slate-500 dir-ltr text-right">
                      مثال: 1 bit = 2 احتمالات | 2 bits = 4 احتمالات (00, 01, 10, 11) | 3 bits = 8 احتمالات.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <div>
                    <strong className="text-[#111827]">البايت <span className="dir-ltr font-mono text-cyan-600">(Byte)</span>:</strong> وحدة تتكون من <span className="dir-ltr font-mono font-bold">8 bits</span>، ويمكنها تمثيل <span className="dir-ltr font-mono font-bold text-cyan-600">256</span> احتمالاً (<span className="dir-ltr font-mono">2⁸ = 256</span>).
                  </div>
                </li>
              </ul>
            </div>

            {/* جدول الوحدات التخزينية */}
            <div>
              <h4 className="font-bold text-[#111827] mb-3 text-xl">وحدات التخزين الرقمية (تتغير كل 1,024 مرة):</h4>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-right border-collapse text-base">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <th className="p-4">الوحدة الكبرى</th>
                      <th className="p-4">تساوي بالعلاقة المدرسية</th>
                      <th className="p-4 dir-ltr">Symbol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr><td className="p-4 font-semibold">كيلوبايت (KB)</td><td className="p-4 dir-ltr">1,024 Bytes</td><td className="p-4 dir-ltr text-cyan-600 font-mono">KB</td></tr>
                    <tr><td className="p-4 font-semibold">ميجابايت (MB)</td><td className="p-4 dir-ltr">1,024 KB</td><td className="p-4 dir-ltr text-cyan-600 font-mono">MB</td></tr>
                    <tr><td className="p-4 font-semibold">جيجابايت (GB)</td><td className="p-4 dir-ltr">1,024 MB</td><td className="p-4 dir-ltr text-cyan-600 font-mono">GB</td></tr>
                    <tr><td className="p-4 font-semibold">تيرابايت (TB)</td><td className="p-4 dir-ltr">1,024 GB</td><td className="p-4 dir-ltr text-cyan-600 font-mono">TB</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ================= محاكي خطوات القسمة التفاعلي الجديد ================= */}
            <div id="division-simulator" className="p-6 sm:p-8 rounded-2xl bg-blue-50/60 border border-blue-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">⚡</div>
                <h3 className="font-bold text-blue-950 text-xl">مُحاكي خطوات التحويل بالقسمة المتكررة على 2</h3>
              </div>
              <p className="text-base text-slate-600 mb-4 leading-relaxed">
                ادخل أي رقم عشري لترى كيف يقسمه الكمبيوتر بشكل متكرر على 2 ويأخذ البواقي <span className="font-bold text-blue-700">(0 أو 1)</span> ليحصل على النتيجة الثنائية:
              </p>

              <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-xl border border-blue-200 max-w-sm">
                <label className="text-base font-bold text-slate-700 whitespace-nowrap">الرقم العشري:</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={decimalInput}
                  onChange={(e) => setDecimalInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 font-mono text-center font-bold text-blue-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="overflow-x-auto mb-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                <table className="w-full text-center text-base">
                  <thead>
                    <tr className="bg-[#2563EB] text-white">
                      <th className="p-3">الخطوة</th>
                      <th className="p-3">العملية (العدد ÷ 2)</th>
                      <th className="p-3">ناتج القسمة الصحيح</th>
                      <th className="p-3 bg-cyan-600 text-white">باقي القسمة (البت)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-base">
                    {divisionSteps.map((step, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                        <td className="p-3 text-slate-500 font-sans">الخطوة {idx + 1}</td>
                        <td className="p-3 dir-ltr">{step.number} ÷ 2</td>
                        <td className="p-3 font-bold text-slate-800">{step.quotient}</td>
                        <td className="p-3 font-black text-blue-700 bg-cyan-50">{step.remainder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-5 rounded-xl bg-white border border-blue-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                <span className="text-sm text-slate-600">
                  💡 تجميع البواقي من الأسفل إلى الأعلى (من الأخير للأول):
                </span>
                <div className="text-lg font-bold text-[#111827] flex items-center gap-2">
                  <span>النتيجة الثنائية:</span>
                  <span className="px-4 py-1.5 rounded-xl bg-[#2563EB] text-white font-mono dir-ltr text-xl shadow">
                    ({simulatedBinary})₂
                  </span>
                </div>
              </div>
            </div>

            {/* تدريب تفاعلي للتحويل */}
            <div className="p-6 rounded-2xl border border-cyan-200 bg-cyan-50/30">
              <h4 className="font-bold text-[#111827] mb-2 text-xl">تدريب تفاعلي فوري:</h4>
              <p className="text-base text-slate-600 mb-4">اكتب الصيغة الثنائية للرقم العشري <strong className="text-cyan-700">6</strong> في المربع أدناه واضغط تحقق:</p>
              
              <form onSubmit={handleConversionCheck} className="flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  placeholder="مثال: 110"
                  value={userBinaryInput}
                  onChange={(e) => setUserBinaryInput(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono dir-ltr text-center w-48 text-xl shadow-inner"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-base transition-all shadow-md shadow-cyan-600/20"
                >
                  تحقق من الحل
                </button>
              </form>

              {conversionResult && (
                <div className={`mt-4 p-4 rounded-xl text-base animate-fadeIn ${conversionResult.correct ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                  {conversionResult.msg}
                </div>
              )}
            </div>

          </div>
        </section>


        {/* ================= الحاسبة التفاعلية لسعات التخزين ================= */}
        <section id="interactive-calc" className="bg-gradient-to-br from-[#111827] to-[#1e293b] text-white rounded-3xl shadow-xl p-6 sm:p-10 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#22D3EE] text-slate-950 flex items-center justify-center font-black text-xl">💾</div>
            <div>
              <h2 className="text-[26px] sm:text-[30px] font-bold text-white">حاسبة سعات التخزين التفاعلية</h2>
              <span className="text-xs text-[#22D3EE] font-semibold dir-ltr block">Interactive Storage Lab</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <label className="block text-base text-slate-300 font-medium">اختر قيمة وسعة الوحدة:</label>
              <div className="flex gap-4">
                <input 
                  type="number" 
                  min="1" 
                  max="1024" 
                  value={storageAmount} 
                  onChange={(e) => setStorageAmount(e.target.value)}
                  className="w-32 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-center text-lg"
                />
                <select 
                  value={storageUnit} 
                  onChange={(e) => setStorageUnit(e.target.value)}
                  className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-base"
                >
                  <option value="KB">كيلوبايت (KB)</option>
                  <option value="MB">ميجابايت (MB)</option>
                  <option value="GB">جيجابايت (GB)</option>
                  <option value="TB">تيرابايت (TB)</option>
                </select>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-center shadow-inner">
              <span className="text-xs text-[#22D3EE] font-semibold uppercase tracking-wider block mb-2">التقدير التقريبي للوحدة الأدنى:</span>
              <div className="text-xl sm:text-2xl font-bold text-white dir-ltr font-mono mb-2">{storageAmount} {storageUnit} =</div>
              <div className="text-base text-slate-300 font-semibold">{getBytesText()}</div>
            </div>
          </div>
        </section>


        {/* ================= الأخطاء الشائعة ================= */}
        <section id="common-mistakes" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl">⚠️</div>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827]">الأخطاء الشائعة التي يقع فيها الطلاب</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200">
              <h4 className="font-bold text-amber-900 text-xl mb-2">الخلط بين bit و Byte</h4>
              <p className="text-base text-slate-700 leading-relaxed">
                يعتقد البعض أن البت الواحد يساوي بايت، والصحيح أن البايت الواحد يتكون من <span className="dir-ltr font-mono font-bold">8 bits</span>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200">
              <h4 className="font-bold text-amber-900 text-xl mb-2">الخلط بين قيمة العدد وعدد الاحتمالات</h4>
              <p className="text-base text-slate-700 leading-relaxed">
                عند حساب الاحتمالات باستخدام <span className="dir-ltr font-mono">n bits</span>، يجب تطبيق الأس في العلاقة <span className="dir-ltr font-mono font-bold">2ⁿ</span> وليس الضرب في 2.
              </p>
            </div>
          </div>
        </section>


        {/* ================= إرشادات المعلم ================= */}
        <section id="teacher-guide" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-xl">💡</div>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827]">إرشادات للمعلم أثناء الشرح الصفي</h2>
          </div>

          <ul className="space-y-4 text-slate-700 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold mt-1">•</span>
              <span>ربط المفاهيم النظرية (التناظري والرقمي) بأمثلة من حياة الطالب اليومية (الساعات الرقمية مقابل الساعات التقليدية).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">•</span>
              <span>التركيز على إتقان الطلاب لعملية القسمة المتكررة على 2 وتجميع البواقي بترتيب عكسي.</span>
            </li>
          </ul>
        </section>


        {/* أزرار الانتقال والانهاء */}
        <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <Link
            href="/"
            className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base transition-colors"
          >
            ← العودة إلى الرئيسية
          </Link>
          <Link
            href="/quiz"
            className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5"
          >
            الانتقال إلى الاختبارات التفاعلية ➔
          </Link>
        </div>

      </div>
    </div>
  );
}
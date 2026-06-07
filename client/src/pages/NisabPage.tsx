import Header from "../components/layout/header/Header";
import { Link } from "@tanstack/react-router";

export default function NisabPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 py-16 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4 animate-fade-in-down">
            Islamic Ruling
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up delay-100">
            Understanding <span className="text-yellow-200">Nisab</span>
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto animate-fade-in-up delay-200">
            The minimum threshold of wealth that makes Zakah obligatory upon a Muslim
          </p>
        </div>
      </section>

      {/* What is Nisab */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Nisab?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nisab is the minimum amount of wealth a Muslim must possess before they become eligible to pay Zakah. 
                It is a threshold set by Islamic law (Shariah) that determines whether a person's wealth has reached 
                the level at which Zakah becomes obligatory.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The concept of Nisab ensures that only those who have sufficient wealth beyond their basic needs 
                are required to pay Zakah. This protects the poor from being burdened with this obligation while 
                ensuring the wealthy fulfill their duty to purify their wealth.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The Prophet Muhammad (ﷺ) established the Nisab thresholds, and they remain the standard 
                used by scholars throughout Islamic history to this day.
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
              <div className="text-center mb-6">
                <img src="/assets/images/resources/about-three-img-1.png" alt="Nisab" className="w-48 h-48 object-contain mx-auto" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 text-center">Key Principle</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  "No Zakah is due on wealth until one full lunar year (Hawl) has passed while 
                  the wealth remains at or above the Nisab threshold."
                </p>
                <p className="text-amber-700 text-center text-sm font-medium mt-2">— Agreed upon by scholars</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nisab Thresholds */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Nisab Thresholds</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Gold Nisab */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-amber-200 transition-colors">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gold (Dhahab)</h3>
              <div className="bg-amber-50 rounded-lg p-4 mb-4">
                <p className="text-2xl font-bold text-amber-700">85 grams</p>
                <p className="text-sm text-amber-600">or 7.5 tola / 20 Mithqal</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                The Nisab for gold is 20 Mithqal (approximately 85 grams of pure gold). 
                If a person possesses gold equal to or exceeding this amount for one lunar year, 
                Zakah of 2.5% becomes obligatory.
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 italic">
                  "There is no Zakah on less than twenty Mithqal of gold." — Hadith (Abu Dawud)
                </p>
              </div>
            </div>

            {/* Silver Nisab */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-amber-200 transition-colors">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Silver (Fiddah)</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-2xl font-bold text-gray-700">595 grams</p>
                <p className="text-sm text-gray-500">or 52.5 tola / 200 Dirhams</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                The Nisab for silver is 200 Dirhams (approximately 595 grams of pure silver). 
                Most scholars recommend using the silver Nisab for cash and monetary assets 
                as it benefits more recipients.
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 italic">
                  "There is no Zakah on less than five Awaq of silver." — Sahih Bukhari & Muslim
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Types of Nisab */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Nisab for Other Wealth Types</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Livestock */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 text-sm">🐪</span>
                Livestock
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span><strong>Camels:</strong> 5 camels minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span><strong>Cattle:</strong> 30 head minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span><strong>Sheep/Goats:</strong> 40 head minimum</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-4 italic">
                Must be free-grazing (Sa'imah) for most of the year
              </p>
            </div>

            {/* Crops */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-sm">🌾</span>
                Crops & Produce
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span><strong>Nisab:</strong> 5 Wasq (approximately 653 kg)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span><strong>Rain-fed:</strong> 10% (Ushr)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span><strong>Irrigated:</strong> 5% (Half Ushr)</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-4 italic">
                Due at harvest time, no Hawl requirement
              </p>
            </div>

            {/* Business & Trade */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">💼</span>
                Business & Trade
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Uses gold or silver Nisab equivalent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Includes inventory, receivables, cash</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span><strong>Rate:</strong> 2.5% of net zakatable assets</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-4 italic">
                Deduct liabilities before calculating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions for Zakah */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Conditions for Zakah to be Obligatory</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Islam", desc: "The person must be Muslim" },
              { title: "Freedom", desc: "Must be a free person (not enslaved)" },
              { title: "Full Ownership", desc: "Must have complete ownership of the wealth" },
              { title: "Reaching Nisab", desc: "Wealth must reach the minimum threshold" },
              { title: "Passage of Hawl", desc: "One full lunar year must pass (except crops)" },
              { title: "Beyond Basic Needs", desc: "Wealth must be beyond one's basic necessities" },
            ].map((condition, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="text-white font-bold mb-2">{condition.title}</h3>
                <p className="text-amber-100 text-sm">{condition.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarly References */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Evidence from Quran & Sunnah</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-2">
                "And establish prayer and give Zakah, and whatever good you put forward for yourselves – 
                you will find it with Allah."
              </p>
              <p className="text-amber-700 font-medium text-sm">— Quran 2:110</p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-2">
                "There is no Zakah on property mounting to less than five Uqiyas (of silver), 
                and no Zakah on less than five camels, and there is no Zakah on less than five Wasqs."
              </p>
              <p className="text-amber-700 font-medium text-sm">— Sahih Bukhari, Hadith 1459</p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-2">
                "When you possess two hundred dirhams and one year passes on them, five dirhams is 
                to be paid on them. You are not liable for anything until you possess twenty dinars 
                and one year passes on them, in which case half a dinar is due."
              </p>
              <p className="text-amber-700 font-medium text-sm">— Abu Dawud, Hadith 1573</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Calculate Your Zakah?</h2>
          <p className="text-gray-600 mb-8">
            Now that you understand Nisab, use our calculator to determine your exact Zakah obligation.
          </p>
          <Link
            to="/zakahcalculator"
            className="inline-block px-8 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-lg shadow-amber-200"
          >
            Calculate Zakah Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/assets/images/resources/logo-1.png" alt="ZakahFlow" className="h-10 w-auto" />
              </div>
              <p className="text-sm leading-relaxed">
                A transparent platform for Zakah calculation, collection, and distribution.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/zakahcalculator" className="hover:text-amber-400 transition-colors">Zakah Calculator</Link></li>
                <li><Link to="/quran-hadith" className="hover:text-amber-400 transition-colors">Quran & Hadith</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">About</h4>
              <p className="text-sm leading-relaxed">
                ZakahFlow helps mosques and communities manage Zakah distribution 
                with full transparency and accountability.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
            <p>&copy; 2026 ZakahFlow. All rights reserved.</p>
            <p className="mt-2 text-gray-500">Developed by <span className="text-amber-400 font-medium">Yusra Mohammed</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

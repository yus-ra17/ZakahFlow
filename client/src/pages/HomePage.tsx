import Header from "../components/layout/header/Header";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const quranHadithSlides = [
  { text: "Take from their wealth a charity by which you purify them and cause them increase", ref: "Quran 9:103" },
  { text: "And establish prayer and give Zakah, and whatever good you put forward for yourselves – you will find it with Allah", ref: "Quran 2:110" },
  { text: "The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is a hundred grains", ref: "Quran 2:261" },
  { text: "Charity does not decrease wealth. No one forgives another except that Allah increases his honor", ref: "Sahih Muslim" },
  { text: "Protect yourselves from the Fire even if it is with half a date given in charity", ref: "Sahih Bukhari" },
  { text: "The upper hand is better than the lower hand. The upper hand is the one that gives", ref: "Sahih Bukhari & Muslim" },
];

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % quranHadithSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100 rounded-full opacity-50 animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-100 rounded-full opacity-40 animate-float delay-500"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-6 animate-fade-in-up">Islamic Zakah Management</span>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 animate-fade-in-up delay-100">
                Simplify Your <span className="text-amber-600 relative">Zakah
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none"><path d="M2 8C50 2 150 2 198 8" stroke="#d97706" strokeWidth="3" strokeLinecap="round" opacity="0.4"/></svg>
                </span> Journey
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up delay-200">
                Calculate, donate, and track your Zakah with ease. ZakahFlow connects donors with those in need through a transparent and efficient platform.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                <Link to="/zakahcalculator" className="px-7 py-3.5 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 transition-all shadow-lg shadow-amber-200 hover:shadow-xl hover:-translate-y-0.5">Calculate Zakah</Link>
                <Link to="/quran-hadith" className="px-7 py-3.5 bg-white text-amber-700 font-medium rounded-xl border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-all hover:-translate-y-0.5">Quran & Hadith</Link>
              </div>
              <div className="flex gap-8 mt-10 animate-fade-in-up delay-400">
                <div><p className="text-2xl font-bold text-amber-600">2.5%</p><p className="text-xs text-gray-500">Standard Rate</p></div>
                <div><p className="text-2xl font-bold text-amber-600">85g</p><p className="text-xs text-gray-500">Gold Nisab</p></div>
                <div><p className="text-2xl font-bold text-amber-600">8</p><p className="text-xs text-gray-500">Recipients</p></div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center animate-fade-in-right delay-300">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-200 rounded-3xl rotate-6 opacity-30"></div>
                <img src="/assets/images/resources/about-three-img-1.png" alt="Zakah" className="relative w-96 h-auto object-contain animate-float" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quran & Hadith Slider */}
      <section className="py-12 bg-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/images/shapes/pattern-1.jpg')] bg-cover"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <svg className="w-8 h-8 text-amber-200 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <div className="min-h-[100px] flex flex-col items-center justify-center">
            <p className="text-lg lg:text-xl text-white font-medium leading-relaxed mb-3 transition-opacity duration-500">"{quranHadithSlides[currentSlide].text}"</p>
            <p className="text-amber-200 font-medium text-sm">— {quranHadithSlides[currentSlide].ref}</p>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {quranHadithSlides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? "bg-white w-5" : "bg-white/40 hover:bg-white/60"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ZakahFlow Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A complete platform for managing Zakah from calculation to distribution</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>, title: "Calculate", description: "Use our Zakah calculator to determine your obligation based on gold, silver, livestock, crops, and business assets." },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Donate", description: "Submit your Zakah donation securely. Track your contributions and see the impact of your generosity." },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: "Distribute", description: "Zakah reaches verified beneficiaries through mosque administrators and trusted distributors." },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all group hover-lift animate-fade-in-up">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-5 group-hover:bg-amber-600 group-hover:text-white transition-colors">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nisab */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">Islamic Ruling</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Nisab</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Nisab is the minimum amount of wealth a Muslim must possess before Zakah becomes obligatory. It is set at 85 grams of gold or 595 grams of silver.</p>
              <ul className="space-y-3 mb-6">
                {["Gold Nisab: 85 grams (20 Mithqal)", "Silver Nisab: 595 grams (200 Dirhams)", "One full lunar year (Hawl) must pass"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/nisab" className="inline-flex items-center gap-2 text-amber-700 font-medium hover:text-amber-800 transition-colors group">
                Learn more about Nisab <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="animate-fade-in-right">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift">
                <img src="/assets/images/resources/who-we-are-img-1.jpg" alt="Nisab" className="w-full h-72 object-contain rounded-xl mb-6" />
                <div className="text-center">
                  <p className="text-gray-600 text-sm italic">"There is no Zakah on less than five Awaq of silver, and no Zakah on less than five camels."</p>
                  <p className="text-amber-700 font-medium text-sm mt-2">— Sahih Bukhari & Muslim</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Receives Zakah */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Receives Zakah?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Allah has specified eight categories of people eligible to receive Zakah in Surah At-Tawbah (9:60)</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "The Poor (Al-Fuqara)", desc: "Those who lack basic necessities" },
              { title: "The Needy (Al-Masakin)", desc: "Those with insufficient means" },
              { title: "Zakah Administrators", desc: "Those employed to collect it" },
              { title: "New Muslims", desc: "Those whose hearts are reconciled" },
              { title: "Freeing Captives", desc: "Those in bondage or slavery" },
              { title: "Those in Debt", desc: "Overwhelmed by financial burden" },
              { title: "In Allah's Cause", desc: "Striving in the path of Allah" },
              { title: "The Traveller", desc: "Stranded wayfarers in need" },
            ].map((cat, i) => (
              <div key={i} className="p-5 rounded-xl bg-amber-50 border border-amber-100 hover:shadow-lg transition-all hover-lift animate-fade-in-up">
                <div className="w-8 h-8 bg-amber-200 rounded-lg flex items-center justify-center mb-3"><span className="text-amber-800 font-bold text-sm">{i + 1}</span></div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{cat.title}</h3>
                <p className="text-gray-500 text-xs">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Zakah */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Zakatable Wealth</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Zakah is due on different categories of wealth, each with its own Nisab and rate</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Gold & Silver", rate: "2.5%", icon: "💰", desc: "85g gold or 595g silver minimum" },
              { title: "Cash & Savings", rate: "2.5%", icon: "🏦", desc: "Bank balances reaching Nisab" },
              { title: "Livestock", rate: "Varies", icon: "🐪", desc: "Camels, cattle, sheep, goats" },
              { title: "Crops & Produce", rate: "5-10%", icon: "🌾", desc: "At harvest, 653kg minimum" },
              { title: "Business Assets", rate: "2.5%", icon: "📊", desc: "Inventory and trade goods" },
              { title: "Rikaz (Treasures)", rate: "20%", icon: "⛏️", desc: "Buried treasures found" },
            ].map((type, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all hover-lift animate-fade-in-up">
                <span className="text-3xl">{type.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{type.title}</h3>
                  <p className="text-amber-700 font-bold text-sm mb-1">Rate: {type.rate}</p>
                  <p className="text-gray-500 text-xs">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <img src="/assets/images/Ramadan 2025 in UAE_ How to calculate Zakat with the online calculator.jpg" alt="About ZakahFlow" className="w-full h-auto object-contain rounded-2xl shadow-lg hover-lift" />
            </div>
            <div className="animate-fade-in-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Together We Can Make a Difference</h2>
              <p className="text-gray-600 leading-relaxed mb-4">We are dedicated to empowering communities through the principles of Zakah. Our mission is to facilitate the calculation and distribution of Zakah, ensuring that those in need receive the support they deserve.</p>
              <p className="text-gray-600 leading-relaxed mb-6">Join us in our journey to create a more equitable and compassionate world where every Muslim can fulfill their obligation with confidence and transparency.</p>
              <ul className="space-y-3">
                {["Purifying Hearts, Healing Communities", "Accurate Zakah Calculations", "Small Acts, Big Impact"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Fulfill Your Obligation?</h2>
          <p className="text-gray-600 mb-8 text-lg">Join thousands of Muslims who use ZakahFlow to manage their Zakah efficiently.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 transition-all shadow-lg shadow-amber-200 hover:-translate-y-0.5">Get Started</Link>
            <Link to="/zakahcalculator" className="px-8 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-amber-300 transition-all hover:-translate-y-0.5">Try Calculator</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4"><img src="/assets/images/resources/logo-1.png" alt="ZakahFlow" className="h-10 w-auto" /></div>
              <p className="text-sm leading-relaxed">A transparent platform for Zakah calculation, collection, and distribution.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/zakahcalculator" className="hover:text-amber-400 transition-colors">Zakah Calculator</Link></li>
                <li><Link to="/nisab" className="hover:text-amber-400 transition-colors">Nisab</Link></li>
                <li><Link to="/login" className="hover:text-amber-400 transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/nisab" className="hover:text-amber-400 transition-colors">Nisab</Link></li>
                <li><Link to="/quran-hadith" className="hover:text-amber-400 transition-colors">Quran & Hadith</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">About</h4>
              <p className="text-sm leading-relaxed">ZakahFlow helps mosques and communities manage Zakah distribution with full transparency and accountability.</p>
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

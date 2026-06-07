import { useState } from "react";
import Header from "../components/layout/header/Header";
import { Link } from "@tanstack/react-router";

type TabType = "quran" | "hadith" | "types" | "recipients" | "history" | "sadaqah";

export default function QuranHadithPage() {
  const [activeTab, setActiveTab] = useState<TabType>("quran");

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "quran", label: "Quran Verses", icon: "📖" },
    { id: "hadith", label: "Hadith", icon: "🕌" },
    { id: "types", label: "Zakah Types", icon: "💰" },
    { id: "recipients", label: "Recipients", icon: "🤲" },
    { id: "history", label: "History", icon: "📜" },
    { id: "sadaqah", label: "Sadaqah", icon: "🤲" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 py-16 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4 animate-fade-in-down">
            Sacred Knowledge
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up delay-100">
            Quran & Hadith on <span className="text-yellow-200">Zakah</span>
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Comprehensive collection of Quranic verses and Prophetic narrations
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-100 text-amber-800 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {activeTab === "quran" && <QuranSection />}
          {activeTab === "hadith" && <HadithSection />}
          {activeTab === "types" && <TypesSection />}
          {activeTab === "recipients" && <RecipientsSection />}
          {activeTab === "history" && <HistorySection />}
          {activeTab === "sadaqah" && <SadaqahSection />}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/assets/images/resources/logo-1.png" alt="ZakahFlow" className="h-10 w-auto" />
          </div>
          <p className="text-sm mb-4">A transparent platform for Zakah management.</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <Link to="/zakahcalculator" className="hover:text-amber-400 transition-colors">Calculator</Link>
            <Link to="/nisab" className="hover:text-amber-400 transition-colors">Nisab</Link>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-xs">
            <p>&copy; 2026 ZakahFlow. All rights reserved.</p>
            <p className="mt-2 text-gray-500">Developed by <span className="text-amber-400 font-medium">Yusra Mohammed</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function QuranSection() {
  const verses = [
    {
      arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ",
      translation: "And establish prayer and give Zakah, and whatever good you put forward for yourselves – you will find it with Allah. Indeed, Allah of what you do, is Seeing.",
      reference: "Surah Al-Baqarah 2:110"
    },
    {
      arabic: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا",
      translation: "Take from their wealth a charity by which you purify them and cause them increase, and invoke Allah's blessings upon them.",
      reference: "Surah At-Tawbah 9:103"
    },
    {
      arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ",
      translation: "Zakah expenditures are only for the poor and the needy, for those employed to administer it, for those whose hearts are attracted to the faith, for freeing slaves, for those in debt, for Allah's cause, and for the needy traveller.",
      reference: "Surah At-Tawbah 9:60"
    },
    {
      arabic: "وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنفِقُونَهَا فِي سَبِيلِ اللَّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ",
      translation: "And those who hoard gold and silver and spend it not in the way of Allah – give them tidings of a painful punishment.",
      reference: "Surah At-Tawbah 9:34"
    },
    {
      arabic: "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ",
      translation: "Never will you attain the good [reward] until you spend [in the way of Allah] from that which you love.",
      reference: "Surah Aal-Imran 3:92"
    },
    {
      arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ",
      translation: "The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains. And Allah multiplies His reward for whom He wills.",
      reference: "Surah Al-Baqarah 2:261"
    },
    {
      arabic: "الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً",
      translation: "Those who spend their wealth by night and by day, secretly and publicly – they will have their reward with their Lord. And no fear will there be concerning them, nor will they grieve.",
      reference: "Surah Al-Baqarah 2:274"
    },
    {
      arabic: "وَمَا آتَيْتُم مِّن زَكَاةٍ تُرِيدُونَ وَجْهَ اللَّهِ فَأُولَٰئِكَ هُمُ الْمُضْعِفُونَ",
      translation: "And what you give in Zakah, desiring the countenance of Allah – those are the multipliers.",
      reference: "Surah Ar-Rum 30:39"
    },
  ];

  return (
    <div>
      <div className="text-center mb-10 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Quranic Verses on Zakah</h2>
        <p className="text-gray-600">Allah (SWT) mentions Zakah over 30 times in the Holy Quran</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {verses.map((verse, i) => (
          <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all hover-lift animate-fade-in-up delay-${(i % 4 + 1) * 100}`}>
            <div className="bg-amber-50 rounded-xl p-4 mb-4">
              <p className="text-right text-lg text-gray-800 leading-loose" dir="rtl">
                {verse.arabic}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3 text-sm italic">
              "{verse.translation}"
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              <p className="text-amber-700 font-medium text-sm">{verse.reference}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HadithSection() {
  const hadiths = [
    {
      text: "Islam is built upon five pillars: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, paying the Zakah, making the pilgrimage to the House, and fasting in Ramadan.",
      narrator: "Ibn Umar (RA)",
      source: "Sahih Bukhari & Muslim"
    },
    {
      text: "Whoever is made wealthy by Allah and does not pay the Zakah of his wealth, then on the Day of Resurrection his wealth will be made like a bald-headed poisonous male snake with two black spots over the eyes.",
      narrator: "Abu Hurairah (RA)",
      source: "Sahih Bukhari"
    },
    {
      text: "Charity does not decrease wealth. No one forgives another except that Allah increases his honor. And no one humbles himself for the sake of Allah except that Allah raises his status.",
      narrator: "Abu Hurairah (RA)",
      source: "Sahih Muslim"
    },
    {
      text: "The upper hand is better than the lower hand. The upper hand is the one that gives, and the lower hand is the one that receives.",
      narrator: "Ibn Umar (RA)",
      source: "Sahih Bukhari & Muslim"
    },
    {
      text: "Protect yourselves from the Fire even if it is with half a date given in charity. And if you cannot find that, then with a kind word.",
      narrator: "Adi ibn Hatim (RA)",
      source: "Sahih Bukhari & Muslim"
    },
    {
      text: "There is no day upon which the servants wake except that two angels descend. One says: O Allah, give to the one who spends a replacement. The other says: O Allah, give to the one who withholds destruction.",
      narrator: "Abu Hurairah (RA)",
      source: "Sahih Bukhari & Muslim"
    },
    {
      text: "When a man dies, his deeds come to an end except for three things: Sadaqah Jariyah (ongoing charity), knowledge which is beneficial, or a virtuous descendant who prays for him.",
      narrator: "Abu Hurairah (RA)",
      source: "Sahih Muslim"
    },
    {
      text: "Give the Zakah of your wealth, for it is a purifier that purifies you. Maintain ties of kinship with your relatives, and acknowledge the rights of the beggar, the neighbor, and the one who asks.",
      narrator: "Anas ibn Malik (RA)",
      source: "Ahmad & At-Tabarani"
    },
  ];

  return (
    <div>
      <div className="text-center mb-10 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Hadith on Zakah</h2>
        <p className="text-gray-600">Prophetic narrations about the obligation and virtues of Zakah</p>
      </div>
      <div className="space-y-4">
        {hadiths.map((hadith, i) => (
          <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 border-amber-400 hover:shadow-xl transition-all hover-lift animate-fade-in-up delay-${(i % 4 + 1) * 100}`}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-700 font-bold text-sm">{i + 1}</span>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed mb-3">"{hadith.text}"</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">{hadith.narrator}</span>
                  <span className="px-3 py-1 bg-amber-50 rounded-full text-amber-700 font-medium">{hadith.source}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypesSection() {
  const types = [
    { title: "Zakah on Gold & Silver", desc: "2.5% on gold (85g+) and silver (595g+) held for one lunar year. Includes jewelry not regularly worn.", icon: "💰", rate: "2.5%", color: "from-amber-400 to-yellow-500" },
    { title: "Zakah on Cash & Savings", desc: "2.5% on cash, bank savings, and monetary assets that reach the Nisab equivalent held for one year.", icon: "🏦", rate: "2.5%", color: "from-blue-400 to-indigo-500" },
    { title: "Zakah on Livestock", desc: "Varies by animal type and quantity. Camels (5+), cattle (30+), sheep/goats (40+) that graze freely.", icon: "🐪", rate: "Varies", color: "from-green-400 to-emerald-500" },
    { title: "Zakah on Crops (Ushr)", desc: "10% for rain-fed crops, 5% for irrigated crops. Due at harvest when reaching 5 Wasq (653 kg).", icon: "🌾", rate: "5-10%", color: "from-lime-400 to-green-500" },
    { title: "Zakah on Business", desc: "2.5% on net business assets including inventory, receivables, and cash minus liabilities.", icon: "📊", rate: "2.5%", color: "from-purple-400 to-violet-500" },
    { title: "Zakah on Rikaz", desc: "20% (one-fifth) on buried treasures and minerals found. No Hawl requirement.", icon: "⛏️", rate: "20%", color: "from-orange-400 to-red-500" },
  ];

  return (
    <div>
      <div className="text-center mb-10 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Types of Zakah</h2>
        <p className="text-gray-600">Different categories of wealth subject to Zakah</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map((type, i) => (
          <div key={i} className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover-lift animate-fade-in-up delay-${(i % 3 + 1) * 200}`}>
            <div className={`h-2 bg-gradient-to-r ${type.color}`}></div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{type.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{type.title}</h3>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Rate: {type.rate}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{type.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecipientsSection() {
  const recipients = [
    { title: "Al-Fuqara", subtitle: "The Poor", desc: "Those who do not have enough to meet their basic needs of food, clothing, and shelter.", icon: "🏚️" },
    { title: "Al-Masakin", subtitle: "The Needy", desc: "Those who have some means but not enough to fully sustain themselves and their families.", icon: "🤲" },
    { title: "Al-Amileen Alayha", subtitle: "Zakah Collectors", desc: "Those employed to collect, manage, and distribute Zakah funds on behalf of the community.", icon: "📋" },
    { title: "Al-Mu'allafah Qulubuhum", subtitle: "New Muslims / Hearts to Reconcile", desc: "Those who have recently embraced Islam or whose hearts need to be strengthened in faith.", icon: "💚" },
    { title: "Fir-Riqab", subtitle: "Freeing Captives", desc: "For freeing slaves, those in bondage, or helping those trapped in exploitative situations.", icon: "⛓️" },
    { title: "Al-Gharimeen", subtitle: "Those in Debt", desc: "People burdened with overwhelming debt they cannot repay, incurred for permissible reasons.", icon: "📉" },
    { title: "Fi Sabilillah", subtitle: "In Allah's Cause", desc: "Those striving in the path of Allah — scholars, students of knowledge, and those defending Islam.", icon: "🌟" },
    { title: "Ibn As-Sabil", subtitle: "The Stranded Traveller", desc: "Travelers who are stranded and in need of assistance, even if they are wealthy back home.", icon: "🧳" },
  ];

  return (
    <div>
      <div className="text-center mb-10 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">The Eight Recipients of Zakah</h2>
        <p className="text-gray-600">As specified in Surah At-Tawbah 9:60</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {recipients.map((r, i) => (
          <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all hover-lift animate-fade-in-up delay-${(i % 4 + 1) * 100}`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {r.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <h3 className="font-bold text-gray-900">{r.title}</h3>
                </div>
                <p className="text-amber-700 text-sm font-medium mb-2">{r.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-amber-50 rounded-2xl p-6 border border-amber-100 animate-fade-in-up delay-500">
        <p className="text-center text-gray-700 italic leading-relaxed">
          "Zakah expenditures are only for the poor and the needy, for those employed to administer it, for those whose hearts are attracted to the faith, for freeing slaves, for those in debt, for Allah's cause, and for the needy traveller. This is an obligation from Allah. And Allah is All-Knowing, All-Wise."
        </p>
        <p className="text-center text-amber-700 font-medium mt-3">— Surah At-Tawbah 9:60</p>
      </div>
    </div>
  );
}

function HistorySection() {
  const timeline = [
    { era: "Makkah Period", year: "Before Hijrah", desc: "Charity was encouraged in general terms without specific amounts. Verses established the principle of sharing wealth with those in need." },
    { era: "2 AH - Zakah Made Obligatory", year: "624 CE", desc: "Zakah was made a formal obligation with specific rates and Nisab thresholds. The Prophet (ﷺ) appointed collectors and established the distribution system." },
    { era: "Era of Abu Bakr (RA)", year: "632 CE", desc: "Some tribes refused to pay Zakah after the Prophet's death. Abu Bakr declared: 'By Allah, I will fight whoever differentiates between prayer and Zakah.'" },
    { era: "Era of Umar (RA)", year: "634-644 CE", desc: "Umar expanded the Zakah system, establishing a treasury (Bayt al-Mal) and systematic collection across the growing Islamic state." },
    { era: "Era of Uthman (RA)", year: "644-656 CE", desc: "The Zakah system continued to grow. Uthman introduced the concept of apparent and non-apparent wealth for collection purposes." },
    { era: "Era of Umar ibn Abdul Aziz", year: "717-720 CE", desc: "Zakah was so effectively collected and distributed that it became difficult to find eligible recipients — demonstrating its transformative power." },
  ];

  return (
    <div>
      <div className="text-center mb-10 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">History of Zakah in Islam</h2>
        <p className="text-gray-600">The evolution of Zakah from revelation to implementation</p>
      </div>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber-200 hidden md:block"></div>
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <div key={i} className={`relative flex gap-6 animate-fade-in-left delay-${(i % 4 + 1) * 200}`}>
              <div className="hidden md:flex flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full items-center justify-center z-10 shadow-lg">
                <span className="text-white font-bold text-sm">{i + 1}</span>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all hover-lift flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{item.era}</h3>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">{item.year}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SadaqahSection() {
  return (
    <div>
      <div className="text-center mb-10 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Sadaqah: Voluntary Charity</h2>
        <p className="text-gray-600">While Zakah is obligatory, Sadaqah is voluntary charity that brings immense rewards</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift animate-fade-in-left">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">⚖️</span>
            Zakah vs Sadaqah
          </h3>
          <div className="space-y-3">
            {[
              "Zakah is obligatory; Sadaqah is voluntary",
              "Zakah has fixed rates; Sadaqah has no limits",
              "Zakah has specific recipients; Sadaqah can be given to anyone",
              "Zakah is monetary; Sadaqah can be a smile or kind word",
              "Denying Zakah is a major sin; Sadaqah is highly recommended",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-gray-600 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift animate-fade-in-right">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-500">❤️</span>
            Forms of Sadaqah
          </h3>
          <div className="space-y-3">
            {[
              "Giving money or food to the needy",
              "Smiling at your brother/sister in Islam",
              "Removing harm from the road",
              "Speaking a good word",
              "Teaching beneficial knowledge",
              "Planting a tree or providing water",
              "Sadaqah Jariyah (building a well or mesjid)",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">•</span>
                <p className="text-gray-600 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="animate-fade-in-up delay-300">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Wisdom & Benefits of Zakah</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Purification of Wealth", desc: "Cleanses wealth from impurities and blesses the remainder", icon: "✨" },
            { title: "Purification of Soul", desc: "Removes greed, selfishness, and worldly attachment", icon: "🕊️" },
            { title: "Social Solidarity", desc: "Creates bonds between rich and poor, fostering unity", icon: "🤝" },
            { title: "Economic Balance", desc: "Prevents wealth concentration and promotes circulation", icon: "⚖️" },
            { title: "Poverty Reduction", desc: "Systematically addresses poverty when properly implemented", icon: "🏡" },
            { title: "Divine Reward", desc: "Allah promises multiplication of reward for sincere givers", icon: "🌟" },
          ].map((benefit, i) => (
            <div key={i} className={`bg-white rounded-xl p-5 border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all hover-lift`}>
              <span className="text-2xl mb-3 block">{benefit.icon}</span>
              <h4 className="font-bold text-gray-900 mb-1 text-sm">{benefit.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

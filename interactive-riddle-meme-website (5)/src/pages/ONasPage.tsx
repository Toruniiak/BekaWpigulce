import { Helmet } from 'react-helmet-async'
import { Users, Heart, Target, Award, Smile, Zap } from 'lucide-react'
import AdBanner from '../components/AdBanner'
import Newsletter from '../components/Newsletter'

export default function ONasPage() {
  return (
    <>
      <Helmet>
        <title>O Nas | Beka w Pigułce</title>
        <meta name="description" content="Poznaj zespół Beka w Pigułce. Tworzymy najlepsze zagadki, memy i łamigłówki od 2024 roku!" />
      </Helmet>

      <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 md:p-16 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Users size={20} />
            <span className="font-medium">Poznaj naszą historię</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            O nas - Beka w Pigułce
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Twoja codzienna dawka śmiechu od 2024 roku! Tworzymy zagadki, memy i łamigłówki, 
            które rozwijają umysł i wywołują uśmiech.
          </p>
        </div>
      </section>

      <AdBanner position="top" />

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
            <Target className="w-7 h-7 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nasza Misja</h2>
          <p className="text-gray-600 leading-relaxed">
            Wierzymy, że śmiech to najlepsze lekarstwo! Naszą misją jest rozśmieszanie ludzi 
            i jednoczesne trenowanie ich umysłów poprzez inteligentne zagadki i łamigłówki. 
            Każdego dnia staramy się dostarczyć Ci chwilę radości i satysfakcji z rozwiązywania 
            naszych zadań.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-4">
            <Heart className="w-7 h-7 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nasza Pasja</h2>
          <p className="text-gray-600 leading-relaxed">
            Beka w Pigułce to nie tylko strona - to społeczność ludzi, którzy kochają 
            dobrą zabawę intelektualną. Tworzymy treści, które łączą edukację z rozrywką. 
            Nasze zagadki są odpowiednie dla wszystkich grup wiekowych!
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-8">Nasze liczby</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <StatCard icon={<Smile size={32} />} number="50+" label="Zagadek" />
          <StatCard icon={<Zap size={32} />} number="200+" label="Memów" />
          <StatCard icon={<Users size={32} />} number="10k+" label="Fanów" />
          <StatCard icon={<Award size={32} />} number="1M+" label="Wyświetleń" />
        </div>
      </section>

      <AdBanner position="middle" />

      {/* Why Us Section */}
      <section className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Dlaczego warto nas obserwować?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureBox 
            icon="🧠"
            title="Rozwijaj umysł"
            description="Nasze zagadki trenują spostrzegawczość, logiczne myślenie i kreatywność."
          />
          <FeatureBox 
            icon="😂"
            title="Śmiej się codziennie"
            description="Nowe memy każdego dnia! Najlepszy humor zebrany w jednym miejscu."
          />
          <FeatureBox 
            icon="👥"
            title="Społeczność"
            description="Dołącz do tysięcy fanów na Facebooku. Dziel się odpowiedziami i rywalizuj!"
          />
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Twórcy Beka w Pigułce
        </h2>
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 text-center">
          <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <img src="/images/logo.png" alt="Logo" className="w-24 h-24 object-contain" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Zespół Beka w Pigułce</h3>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Jesteśmy grupą pasjonatów zagadek, łamigłówek i dobrego humoru. 
            Każdego dnia pracujemy nad nowymi treściami, aby dostarczyć Ci 
            najlepszej rozrywki w sieci!
          </p>
        </div>
      </section>

      <Newsletter />

      <AdBanner position="bottom" />
      </div>
    </>
  )
}

function StatCard({ icon, number, label }: { icon: React.ReactNode; number: string; label: string }) {
  return (
    <div className="p-4">
      <div className="text-yellow-400 mb-2 flex justify-center">{icon}</div>
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}

function FeatureBox({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
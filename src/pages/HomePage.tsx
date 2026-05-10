import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Brain, MessageCircle, Image, ArrowRight, Sparkles, Laugh, Star, TrendingUp, Clock } from 'lucide-react'
import AdBanner from '../components/AdBanner'
import RiddleCard from '../components/RiddleCard'
import MemeCard from '../components/MemeCard'
import Newsletter from '../components/Newsletter'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Beka w Pigułce - Memy, Zagadki i Łamigłówki | Codzienna Dawka Śmiechu</title>
        <meta name="description" content="Beka w Pigułce to najlepsze memy, zagadki i łamigłówki w jednym miejscu. Sprawdź odpowiedzi, pobierz memy i śmiej się codziennie!" />
        <meta name="keywords" content="memy, zagadki, łamigłówki, śmiech, humor, odpowiedzi do zagadek, memy do pobrania" />
        <link rel="canonical" href="https://bekawpigulce.pl/" />
        <meta property="og:title" content="Beka w Pigułce - Memy, Zagadki i Łamigłówki" />
        <meta property="og:description" content="Najlepsze memy i zagadki. Sprawdź odpowiedzi i pośmiej się!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bekawpigulce.pl/" />
        <meta property="og:image" content="https://bekawpigulce.pl/images/hero-banner.jpg" />
      </Helmet>

      <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="/images/hero-banner.jpg" 
          alt="Beka w Pigułce - Banner" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
          <div className="p-6 md:p-10 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              BEKA W PIGUŁCE
            </h1>
            <p className="text-lg md:text-xl text-yellow-300 font-semibold drop-shadow-md">
              😂 Twoja codzienna dawka śmiechu! 💊
            </p>
          </div>
        </div>
      </section>

      {/* Top Ad Banner */}
      <AdBanner position="top" />

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Brain size={40} className="text-purple-500" />}
          title="Zagadki"
          description="Sprawdź się w naszych trudnych zagadkach i łamigłówkach!"
          link="/zagadki"
          color="from-purple-400 to-pink-500"
        />
        <FeatureCard 
          icon={<MessageCircle size={40} className="text-blue-500" />}
          title="Odpowiedzi"
          description="Sprawdź odpowiedzi do zagadek i zobacz czy miałeś rację!"
          link="/odpowiedzi"
          color="from-blue-400 to-cyan-500"
        />
        <FeatureCard 
          icon={<Image size={40} className="text-orange-500" />}
          title="Memy"
          description="Najlepsze memy zebrane w jednym miejscu. Ubijesz się ze śmiechu!"
          link="/memy"
          color="from-orange-400 to-red-500"
        />
      </section>

      {/* Middle Ad Banner */}
      <AdBanner position="middle" />

      {/* Latest Riddles Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="text-yellow-500" size={28} />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Najnowsze Zagadki</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RiddleCard 
            id={1}
            title="Zagadka #1: Ile zwierząt widzisz?"
            image="/images/riddle-animals.jpg"
            description="Sprawdź swoją spostrzegawczość! Widzisz wszystkie zwierzęta ukryte na obrazku?"
            answer="Na obrazku ukrytych jest 12 zwierząt: słoń, żyrafa, małpa, ptak, wąż, kot, pies, koń, ryba, motyl, żaba i lis!"
            meme="/images/meme-answer-1.jpg"
          />
          <RiddleCard 
            id={2}
            title="Zagadka #2: Matematyczna łamigłówka"
            image="/images/riddle-math.jpg"
            description="Czy potrafisz rozwiązać tę zagadkę matematyczną? Uważaj na podchwytliwe pytanie!"
            answer="Odpowiedź to 30! Wielu ludzi zapomina o kolejności działań matematycznych."
            meme="/images/meme-laugh.jpg"
          />
        </div>
        <div className="text-center mt-6">
          <Link 
            to="/zagadki"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Zobacz wszystkie zagadki
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Memes Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Laugh className="text-orange-500" size={28} />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Najlepsze Memy</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MemeCard 
            image="/images/meme-answer-1.jpg"
            title="Kiedy widzisz odpowiedź"
            likes={234}
          />
          <MemeCard 
            image="/images/meme-laugh.jpg"
            title="Ja po zobaczeniu zagadki"
            likes={189}
          />
          <MemeCard 
            image="/images/riddle-animals.jpg"
            title="Sprawdź czy widzisz wszystkie!"
            likes={567}
          />
        </div>
        <div className="text-center mt-6">
          <Link 
            to="/memy"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Zobacz więcej memów
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Bottom Ad Banner */}
      <AdBanner position="bottom" />

      {/* Newsletter */}
      <Newsletter />

      {/* Features Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard icon={<Star className="w-6 h-6" />} value="50+" label="Zagadek" />
        <StatsCard icon={<Image className="w-6 h-6" />} value="200+" label="Memów" />
        <StatsCard icon={<TrendingUp className="w-6 h-6" />} value="10k+" label="Fanów" />
        <StatsCard icon={<Clock className="w-6 h-6" />} value="24/7" label="Dostępność" />
      </section>
      </div>
    </>
  )
}

function StatsCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl mb-3">
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description, link, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  link: string;
  color: string;
}) {
  return (
    <Link 
      to={link}
      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="mt-4 flex items-center text-sm font-semibold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
        Sprawdź teraz <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
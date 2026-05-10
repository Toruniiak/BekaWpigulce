import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Brain, Eye, Lock, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import AdBanner from '../components/AdBanner'

interface Riddle {
  id: number
  title: string
  image: string
  description: string
  question: string
  hint: string
}

const riddles: Riddle[] = [
  {
    id: 1,
    title: "Zagadka #1: Ile zwierząt widzisz?",
    image: "/images/riddle-animals.jpg",
    description: "Na tym obrazku ukryte są różne zwierzęta. Twoim zadaniem jest znalezienie wszystkich!",
    question: "Ile zwierząt potrafisz dostrzec na obrazku?",
    hint: "Szukaj dokładnie - niektóre zwierzęta są dobrze ukryte w innych!"
  },
  {
    id: 2,
    title: "Zagadka #2: Matematyczna łamigłówka",
    image: "/images/riddle-math.jpg",
    description: "Rozwiąż to równanie matematyczne. Uważaj na kolejność działań!",
    question: "Ile wynosi: 8 ÷ 2(2 + 2) = ?",
    hint: "Pamiętaj o kolejności działań - najpierw nawiasy!"
  },
  {
    id: 3,
    title: "Zagadka #3: Co to jest?",
    image: "/images/riddle-math.jpg",
    description: "Mam miasto, ale nie mam domów. Mam góry, ale nie mam drzew. Mam wodę, ale nie mam ryb. Co to jest?",
    question: "Zgadnij co to jest!",
    hint: "To coś, co masz w domu lub w szkole..."
  },
  {
    id: 4,
    title: "Zagadka #4: Logiczna łamigłówka",
    image: "/images/riddle-animals.jpg",
    description: "Trzech braci ma po jednej siostrze. Ile razem jest dzieci w rodzinie?",
    question: "Podaj odpowiedź:",
    hint: "Czytaj uważnie - mają wspólną siostrę!"
  }
]

export default function ZagadkiPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <>
      <Helmet>
        <title>Zagadki i Łamigłówki | Beka w Pigułce</title>
        <meta name="description" content="Rozwiązuj trudne zagadki i łamigłówki. Sprawdź swoją spostrzegawczość i inteligencję!" />
      </Helmet>

      <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-lg">
          <Brain size={32} />
          <h1 className="text-3xl md:text-4xl font-bold">Zagadki i Łamigłówki</h1>
        </div>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Sprawdź się w naszych zagadkach! Kliknij "Zobacz odpowiedź" aby sprawdzić czy dobrze odpowiedziałeś.
        </p>
      </div>

      {/* Ad Banner Top */}
      <AdBanner position="top" />

      {/* Riddles List */}
      <div className="space-y-6">
        {riddles.map((riddle, index) => (
          <div key={riddle.id}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-auto">
                  <img 
                    src={riddle.image} 
                    alt={riddle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    Zagadka #{riddle.id}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{riddle.title}</h2>
                  <p className="text-gray-600 mb-4">{riddle.description}</p>
                  
                  <div className="bg-purple-50 rounded-xl p-4 mb-4">
                    <p className="font-semibold text-purple-800">{riddle.question}</p>
                  </div>

                  {/* Hint Section */}
                  <div className="mb-4">
                    <button 
                      onClick={() => toggleExpand(riddle.id)}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-medium"
                    >
                      <Sparkles size={16} />
                      {expandedId === riddle.id ? 'Ukryj podpowiedź' : 'Pokaż podpowiedź'}
                      {expandedId === riddle.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {expandedId === riddle.id && (
                      <div className="mt-2 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800 animate-fadeIn">
                        💡 {riddle.hint}
                      </div>
                    )}
                  </div>

                  {/* Check Answer Button */}
                  <a 
                    href={`/odpowiedzi#riddle-${riddle.id}`}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <Eye size={20} />
                    Zobacz odpowiedź
                  </a>
                </div>
              </div>
            </div>

            {/* Ad between riddles */}
            {(index + 1) % 2 === 0 && <AdBanner position="middle" />}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-8 text-center text-white">
        <Lock size={48} className="mx-auto mb-4 opacity-80" />
        <h2 className="text-2xl font-bold mb-2">Więcej zagadek wkrótce!</h2>
        <p className="text-white/90">
          Obserwuj nas na Facebooku, aby być na bieżąco z nowymi zagadkami!
        </p>
      </div>

      {/* Ad Banner Bottom */}
      <AdBanner position="bottom" />
      </div>
    </>
  )
}
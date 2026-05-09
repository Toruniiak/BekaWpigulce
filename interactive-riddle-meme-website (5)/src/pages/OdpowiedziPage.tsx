import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { MessageCircle, Eye, EyeOff, Laugh, Share2, ThumbsUp } from 'lucide-react'
import AdBanner from '../components/AdBanner'

interface Answer {
  id: number
  title: string
  riddleImage: string
  answer: string
  explanation: string
  memeImage: string
  likes: number
}

const answers: Answer[] = [
  {
    id: 1,
    title: "Zagadka #1: Ile zwierząt widzisz?",
    riddleImage: "/images/riddle-animals.jpg",
    answer: "12 zwierząt! 🦁",
    explanation: "Na obrazku ukrytych jest 12 zwierząt: słoń, żyrafa, małpa, ptak, wąż, kot, pies, koń, ryba, motyl, żaba i lis. Większość ludzi znajduje tylko 8-9 zwierząt!",
    memeImage: "/images/meme-answer-1.jpg",
    likes: 1234
  },
  {
    id: 2,
    title: "Zagadka #2: Matematyczna łamigłówka",
    riddleImage: "/images/riddle-math.jpg",
    answer: "Odpowiedź to 16! 🔢",
    explanation: "Kolejność działań: najpierw nawiasy (2+2=4), potem dzielenie i mnożenie od lewej do prawej. Czyli: 8 ÷ 2 × 4 = 4 × 4 = 16. Wielu ludzi odpowiada 1, zapominając o kolejności działań!",
    memeImage: "/images/meme-laugh.jpg",
    likes: 892
  },
  {
    id: 3,
    title: "Zagadka #3: Co to jest?",
    riddleImage: "/images/riddle-math.jpg",
    answer: "Mapa! 🗺️",
    explanation: "Mapa ma miasta (zaznaczone kropkami), góry (zaznaczone trójkątami) i wodę (niebieski kolor), ale nie ma prawdziwych domów, drzew ani ryb!",
    memeImage: "/images/meme-answer-1.jpg",
    likes: 567
  },
  {
    id: 4,
    title: "Zagadka #4: Logiczna łamigłówka",
    riddleImage: "/images/riddle-animals.jpg",
    answer: "4 dzieci! 👨‍👩‍👧‍👦",
    explanation: "Trzech braci ma wspólną JEDNĄ siostrę. Czyli: 3 braci + 1 siostra = 4 dzieci. Większość odpowiada 6, myśląc że każdy brat ma osobną siostrę!",
    memeImage: "/images/meme-laugh.jpg",
    likes: 1456
  }
]

export default function OdpowiedziPage() {
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set())
  const [likes, setLikes] = useState<Record<number, number>>(
    answers.reduce((acc, a) => ({ ...acc, [a.id]: a.likes }), {})
  )

  const toggleAnswer = (id: number) => {
    const newRevealed = new Set(revealedAnswers)
    if (newRevealed.has(id)) {
      newRevealed.delete(id)
    } else {
      newRevealed.add(id)
    }
    setRevealedAnswers(newRevealed)
  }

  const handleLike = (id: number) => {
    setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }))
  }

  const handleShare = async (title: string, answer: string) => {
    const shareData = {
      title: 'Beka w Pigułce - Odpowiedź!',
      text: `${title} - ${answer}`,
      url: window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`)
      alert('Skopiowano do schowka!')
    }
  }

  return (
    <>
      <Helmet>
        <title>Odpowiedzi do Zagadek | Beka w Pigułce</title>
        <meta name="description" content="Sprawdź odpowiedzi do naszych zagadek i łamigłówek. Zobacz czy miałeś rację!" />
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full shadow-lg">
            <MessageCircle size={32} />
            <h1 className="text-3xl md:text-4xl font-bold">Odpowiedzi</h1>
          </div>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Sprawdź czy dobrze odpowiedziałeś! Kliknij "Pokaż odpowiedź" aby zobaczyć rozwiązanie i wyjaśnienie.
          </p>
        </div>

        {/* Ad Banner Top */}
        <AdBanner position="top" />

        {/* Answers List */}
        <div className="grid gap-8">
          {answers.map((item, index) => (
            <div key={item.id}>
              <div id={`riddle-${item.id}`} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Riddle Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-0">
                  {/* Riddle Image */}
                  <div className="relative">
                    <img 
                      src={item.riddleImage} 
                      alt={item.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      Zagadka
                    </div>
                  </div>

                  {/* Answer Section */}
                  <div className="p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
                    {!revealedAnswers.has(item.id) ? (
                      <div className="text-center py-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <Eye size={40} className="text-white" />
                        </div>
                        <p className="text-gray-600 mb-6">Odpowiedź jest ukryta!</p>
                        <button 
                          onClick={() => toggleAnswer(item.id)}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                          <Eye size={24} />
                          Pokaż odpowiedź
                        </button>
                      </div>
                    ) : (
                      <div className="animate-fadeIn">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <Laugh size={24} className="text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-green-700">Odpowiedź:</h3>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-md mb-4">
                          <p className="text-2xl font-bold text-gray-800 mb-2">{item.answer}</p>
                          <p className="text-gray-600">{item.explanation}</p>
                        </div>

                        {/* Meme */}
                        <div className="rounded-xl overflow-hidden shadow-lg mb-4">
                          <img 
                            src={item.memeImage} 
                            alt="Meme"
                            className="w-full h-48 object-cover"
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleLike(item.id)}
                            className="flex items-center gap-2 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-lg transition"
                          >
                            <ThumbsUp size={18} />
                            <span>{likes[item.id]}</span>
                          </button>
                          <button 
                            onClick={() => handleShare(item.title, item.answer)}
                            className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition"
                          >
                            <Share2 size={18} />
                            <span>Udostępnij</span>
                          </button>
                          <button 
                            onClick={() => toggleAnswer(item.id)}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition ml-auto"
                          >
                            <EyeOff size={18} />
                            <span className="hidden sm:inline">Ukryj</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ad between items */}
              {(index + 1) % 2 === 0 && <AdBanner position="middle" />}
            </div>
          ))}
        </div>

        {/* Ad Banner Bottom */}
        <AdBanner position="bottom" />
      </div>
    </>
  )
}
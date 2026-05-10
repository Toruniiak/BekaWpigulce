import { useState } from 'react'
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface RiddleCardProps {
  id: number
  title: string
  image: string
  description: string
  answer: string
  meme: string
}

export default function RiddleCard({ id, title, image, description, answer, meme }: RiddleCardProps) {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          <Sparkles size={14} className="inline mr-1" />
          NOWOŚĆ
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        {/* Answer Section */}
        {!showAnswer ? (
          <button 
            onClick={() => setShowAnswer(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <Eye size={18} />
            Zobacz odpowiedź
          </button>
        ) : (
          <div className="animate-fadeIn">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-3 border border-green-200">
              <p className="text-green-800 font-semibold mb-1">Odpowiedź:</p>
              <p className="text-gray-700 text-sm">{answer}</p>
            </div>
            <div className="rounded-lg overflow-hidden mb-3">
              <img src={meme} alt="Meme" className="w-full h-32 object-cover" />
            </div>
            <button 
              onClick={() => setShowAnswer(false)}
              className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 py-2 text-sm"
            >
              <EyeOff size={16} />
              Ukryj odpowiedź
            </button>
          </div>
        )}

        {/* Full Page Link */}
        <Link 
          to={`/odpowiedzi#riddle-${id}`}
          className="mt-3 flex items-center justify-center gap-1 text-sm text-purple-600 hover:text-purple-800 font-medium"
        >
          Zobacz więcej
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
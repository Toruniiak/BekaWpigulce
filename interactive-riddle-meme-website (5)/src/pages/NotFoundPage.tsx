import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Home, Search, Frown } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Strona nie znaleziona | Beka w Pigułce</title>
        <meta name="description" content="Strona, której szukasz nie istnieje. Wróć na stronę główną Beka w Pigułce." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          {/* 404 Graphic */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-9xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                404
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center animate-bounce">
                <Frown size={32} className="text-yellow-700" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Ups! Strona nie znaleziona
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Wygląda na to, że zaginęliśmy w labiryncie zagadek! 
            Strona, której szukasz, nie istnieje lub została przeniesiona.
          </p>

          {/* Suggestions */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Search size={20} />
              Może szukałeś:
            </h2>
            <ul className="space-y-2 text-left">
              <li>
                <Link to="/zagadki" className="text-purple-600 hover:underline flex items-center gap-2">
                  → Najnowsze zagadki
                </Link>
              </li>
              <li>
                <Link to="/odpowiedzi" className="text-purple-600 hover:underline flex items-center gap-2">
                  → Odpowiedzi do zagadek
                </Link>
              </li>
              <li>
                <Link to="/memy" className="text-purple-600 hover:underline flex items-center gap-2">
                  → Najlepsze memy
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Home size={24} />
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </>
  )
}
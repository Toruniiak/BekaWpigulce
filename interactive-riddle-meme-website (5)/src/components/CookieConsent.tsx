import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { X, Cookie, Shield } from 'lucide-react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = Cookies.get('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 })
    setShowBanner(false)
  }

  const declineCookies = () => {
    Cookies.set('cookie-consent', 'declined', { expires: 365 })
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-yellow-400 shadow-2xl z-50 animate-slideUp">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Ta strona używa plików cookies</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Używamy plików cookies i podobnych technologii, aby zapewnić najlepsze doświadczenia użytkownika. 
                Niektóre są niezbędne do działania strony, inne pomagają nam analizować ruch i wyświetlać reklamy. 
                Klikając "Akceptuję", zgadzasz się na użycie wszystkich cookies. 
                <a href="/polityka-prywatnosci" className="text-blue-600 hover:underline ml-1 font-medium">
                  Dowiedz się więcej
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={declineCookies}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition"
            >
              Odrzuć
            </button>
            <button 
              onClick={acceptCookies}
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Shield size={16} />
              Akceptuję
            </button>
            <button 
              onClick={() => setShowBanner(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition"
              aria-label="Zamknij"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
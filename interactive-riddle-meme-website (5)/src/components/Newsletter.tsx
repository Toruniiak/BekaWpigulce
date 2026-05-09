import { useState } from 'react'
import { Mail, Send, CheckCircle, Sparkles } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
    }
  }

  return (
    <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
          <Sparkles size={18} />
          <span className="text-sm font-medium">Bądź na bieżąco!</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Zapisz się do newslettera!
        </h2>
        <p className="text-white/90 text-lg mb-8">
          Otrzymuj najnowsze zagadki, memy i łamigłówki prosto na swoją skrzynkę email. 
          Zero spamu, same śmieszne treści! 😂
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <CheckCircle className="w-8 h-8 text-green-300" />
            <div className="text-left">
              <p className="font-bold">Hura! Zapisano pomyślnie! 🎉</p>
              <p className="text-sm text-white/80">Sprawdź swoją skrzynkę email</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Twój adres email"
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Send size={18} />
              Zapisz się
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-red-200 text-sm">
            Wprowadź prawidłowy adres email
          </p>
        )}

        <p className="mt-4 text-sm text-white/70">
          Zapisując się, akceptujesz naszą{' '}
          <a href="/polityka-prywatnosci" className="underline hover:text-white">
            Politykę Prywatności
          </a>
        </p>
      </div>
    </section>
  )
}
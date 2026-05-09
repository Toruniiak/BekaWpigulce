import { useState } from 'react'
import { Mail, MapPin, Send, Clock, CheckCircle } from 'lucide-react'
import AdBanner from '../components/AdBanner'

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Tutaj logika wysyłki formularza
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full shadow-lg">
          <Mail size={32} />
          <h1 className="text-3xl md:text-4xl font-bold">Kontakt</h1>
        </div>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Masz pytanie, sugestię lub chcesz nawiązać współpracę? 
          Skontaktuj się z nami! Odpisujemy na wszystkie wiadomości.
        </p>
      </div>

      <AdBanner position="top" />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-4">
          <ContactCard 
            icon={<Mail className="w-6 h-6" />}
            title="Email"
            content="kontakt@bekawpigulce.pl"
            link="mailto:kontakt@bekawpigulce.pl"
            color="bg-blue-100 text-blue-600"
          />
          <ContactCard 
            icon={(
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            )}
            title="Facebook"
            content="Beka w Pigułce"
            link="https://facebook.com/bekawpigulce"
            external
            color="bg-blue-100 text-blue-600"
          />
          <ContactCard 
            icon={<Clock className="w-6 h-6" />}
            title="Godziny pracy"
            content="Pon-Pt: 9:00 - 17:00"
            color="bg-green-100 text-green-600"
          />
          <ContactCard 
            icon={<MapPin className="w-6 h-6" />}
            title="Lokalizacja"
            content="Polska"
            color="bg-purple-100 text-purple-600"
          />

          {/* Quick Info */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6">
            <h3 className="font-bold text-gray-800 mb-3">Szybka odpowiedź</h3>
            <p className="text-gray-600 text-sm">
              Staramy się odpowiadać na wszystkie wiadomości w ciągu 24-48 godzin. 
              W przypadku pilnych spraw, napisz do nas na Facebooku!
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Napisz do nas</h2>
            
            {isSubmitted ? (
              <div className="flex items-center justify-center gap-3 bg-green-50 rounded-2xl p-8">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <div>
                  <p className="font-bold text-green-800 text-lg">Wiadomość wysłana!</p>
                  <p className="text-green-600">Odpiszemy najszybciej jak to możliwe.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Twoje imię *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                      placeholder="jan@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Temat *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  >
                    <option value="">Wybierz temat</option>
                    <option value="suggestion">Sugestia / Pomysł</option>
                    <option value="cooperation">Współpraca</option>
                    <option value="report">Zgłoszenie problemu</option>
                    <option value="other">Inne</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition resize-none"
                    placeholder="Napisz swoją wiadomość tutaj..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{' '}
                    <a href="/polityka-prywatnosci" className="text-purple-600 hover:underline">
                      Polityką Prywatności
                    </a>
                    . *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Wyślij wiadomość
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <AdBanner position="bottom" />
    </div>
  )
}

function ContactCard({ 
  icon, 
  title, 
  content, 
  link, 
  external,
  color 
}: { 
  icon: React.ReactNode
  title: string
  content: string
  link?: string
  external?: boolean
  color: string
}) {
  const contentElement = (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  )

  if (link) {
    return (
      <a 
        href={link} 
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block"
      >
        {contentElement}
      </a>
    )
  }

  return contentElement
}
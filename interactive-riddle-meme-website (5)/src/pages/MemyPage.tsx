import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Download, Share2, Heart, Laugh, RefreshCw } from 'lucide-react'
import AdBanner from '../components/AdBanner'

interface Meme {
  id: number
  image: string
  title: string
  category: string
  likes: number
  downloads: number
}

const memes: Meme[] = [
  { id: 1, image: "/images/meme-answer-1.jpg", title: "Kiedy widzisz odpowiedź", category: "Zagadki", likes: 234, downloads: 89 },
  { id: 2, image: "/images/meme-laugh.jpg", title: "Ja po zobaczeniu zagadki", category: "Śmieszne", likes: 189, downloads: 56 },
  { id: 3, image: "/images/riddle-animals.jpg", title: "Sprawdź czy widzisz wszystkie!", category: "Zagadki", likes: 567, downloads: 234 },
  { id: 4, image: "/images/meme-confused.jpg", title: "Moja mina po złej odpowiedzi", category: "Śmieszne", likes: 445, downloads: 123 },
  { id: 5, image: "/images/meme-mindblown.jpg", title: "Kiedy wreszcie zgadłeś", category: "Sukces", likes: 678, downloads: 345 },
  { id: 6, image: "/images/riddle-animals.jpg", title: "Poziom trudności: Expert", category: "Zagadki", likes: 892, downloads: 456 },
]

const categories = ["Wszystkie", "Zagadki", "Śmieszne", "Sukces"]

export default function MemyPage() {
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie")
  const [likedMemes, setLikedMemes] = useState<Set<number>>(new Set())

  const filteredMemes = selectedCategory === "Wszystkie" 
    ? memes 
    : memes.filter(m => m.category === selectedCategory)

  const handleLike = (id: number) => {
    const newLiked = new Set(likedMemes)
    if (newLiked.has(id)) {
      newLiked.delete(id)
    } else {
      newLiked.add(id)
    }
    setLikedMemes(newLiked)
  }

  const handleDownload = (image: string, title: string) => {
    const link = document.createElement('a')
    link.href = image
    link.download = `${title.replace(/\s+/g, '_')}.jpg`
    link.click()
  }

  const handleShare = async (meme: Meme) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: meme.title,
          text: `Sprawdź ten mem z Beka w Pigułce! 😂`,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(`${meme.title} - ${window.location.href}`)
      alert('Skopiowano do schowka!')
    }
  }

  return (
    <>
      <Helmet>
        <title>Memy do Pobrania | Beka w Pigułce</title>
        <meta name="description" content="Najlepsze memy do pobrania i udostępniania. Śmieszne obrazki z zagadek i odpowiedzi!" />
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full shadow-lg">
            <Laugh size={32} />
            <h1 className="text-3xl md:text-4xl font-bold">Memy</h1>
          </div>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Najlepsze memy do pobrania i udostępniania. Śmieszne obrazki zebrane w jednym miejscu!
          </p>
        </div>

        {/* Ad Banner Top */}
        <AdBanner position="top" />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Memes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemes.map((meme, index) => (
            <div key={meme.id}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={meme.image} 
                    alt={meme.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {meme.category}
                    </span>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => handleDownload(meme.image, meme.title)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                      title="Pobierz"
                    >
                      <Download size={20} className="text-gray-800" />
                    </button>
                    <button 
                      onClick={() => handleShare(meme)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                      title="Udostępnij"
                    >
                      <Share2 size={20} className="text-gray-800" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-3">{meme.title}</h3>
                  
                  {/* Stats & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <RefreshCw size={14} />
                        {meme.downloads}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => handleLike(meme.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full transition ${
                        likedMemes.has(meme.id)
                          ? 'bg-pink-100 text-pink-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                      }`}
                    >
                      <Heart size={16} className={likedMemes.has(meme.id) ? 'fill-current' : ''} />
                      <span className="text-sm font-medium">
                        {meme.likes + (likedMemes.has(meme.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Ad after every 3 memes */}
              {(index + 1) % 3 === 0 && (
                <div className="md:col-span-2 lg:col-span-3 mt-6">
                  <AdBanner position="middle" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all">
            <RefreshCw size={20} />
            Załaduj więcej memów
          </button>
        </div>

        {/* Bottom Ad Banner */}
        <AdBanner position="bottom" />
      </div>
    </>
  )
}
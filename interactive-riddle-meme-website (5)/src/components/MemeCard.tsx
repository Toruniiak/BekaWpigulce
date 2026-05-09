import { useState } from 'react'
import { Heart, Share2, Download } from 'lucide-react'

interface MemeCardProps {
  image: string
  title: string
  likes: number
}

export default function MemeCard({ image, title, likes: initialLikes }: MemeCardProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = image
    link.download = `beka-w-pigulce-mem.jpg`
    link.click()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: 'Sprawdź ten mem z Beka w Pigułce! 😂',
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(`${title} - ${window.location.href}`)
      alert('Skopiowano do schowka!')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={handleDownload}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            title="Pobierz"
          >
            <Download size={18} className="text-gray-800" />
          </button>
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            title="Udostępnij"
          >
            <Share2 size={18} className="text-gray-800" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-3 truncate">{title}</h3>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition ${
              isLiked
                ? 'bg-pink-100 text-pink-600'
                : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-500'
            }`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            <span className="text-sm font-medium">{likes}</span>
          </button>
          
          <span className="text-xs text-gray-400">Beka w Pigułce</span>
        </div>
      </div>
    </div>
  )
}
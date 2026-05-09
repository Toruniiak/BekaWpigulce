interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom' | 'sidebar'
}

export default function AdBanner({ position }: AdBannerProps) {
  const getAdSize = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return 'h-24 md:h-32' // Leaderboard style
      case 'middle':
        return 'h-48 md:h-64' // Medium rectangle
      case 'sidebar':
        return 'h-96' // Skyscraper
      default:
        return 'h-32'
    }
  }

  const getLabel = () => {
    switch (position) {
      case 'top':
        return 'Reklama - Top'
      case 'bottom':
        return 'Reklama - Bottom'
      case 'middle':
        return 'Reklama'
      case 'sidebar':
        return 'Reklama'
      default:
        return 'Reklama'
    }
  }

  return (
    <div className={`w-full ${getAdSize()} my-6 relative group`}>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center">
          <p className="text-gray-400 font-medium">{getLabel()}</p>
          <p className="text-gray-300 text-sm mt-1">Google AdSense</p>
          
          {/* AdSense Placeholder - Replace with actual ad code */}
          <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={`slot-${position}`}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
      
      {/* Real AdSense Script Container */}
      <div className="absolute inset-0 opacity-0">
        {/* Tutaj wklej prawdziwy kod AdSense po akceptacji konta */}
      </div>
    </div>
  )
}
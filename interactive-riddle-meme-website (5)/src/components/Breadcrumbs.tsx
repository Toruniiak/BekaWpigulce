import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const routeNames: Record<string, string> = {
  '': 'Strona główna',
  'zagadki': 'Zagadki',
  'odpowiedzi': 'Odpowiedzi',
  'memy': 'Memy',
  'o-nas': 'O nas',
  'kontakt': 'Kontakt',
  'polityka-prywatnosci': 'Polityka Prywatności',
  'regulamin': 'Regulamin',
  'blog': 'Blog'
}

export default function Breadcrumbs() {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(Boolean)

  if (paths.length === 0) return null

  return (
    <nav className="py-4 mb-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-purple-600 transition">
            <Home size={14} />
            <span>Home</span>
          </Link>
        </li>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1
          const to = '/' + paths.slice(0, index + 1).join('/')
          
          return (
            <li key={path} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-gray-400" />
              {isLast ? (
                <span className="font-medium text-gray-800">{routeNames[path] || path}</span>
              ) : (
                <Link to={to} className="text-gray-500 hover:text-purple-600 transition">
                  {routeNames[path] || path}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
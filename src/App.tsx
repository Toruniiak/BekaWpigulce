import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, Brain, MessageCircle, Image, Menu, X, Users, Mail, FileText, Shield } from 'lucide-react'
import { useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'

// Pages
import HomePage from './pages/HomePage'
import ZagadkiPage from './pages/ZagadkiPage'
import OdpowiedziPage from './pages/OdpowiedziPage'
import MemyPage from './pages/MemyPage'
import ONasPage from './pages/ONasPage'
import KontaktPage from './pages/KontaktPage'
import PolitykaPrywatnosciPage from './pages/PolitykaPrywatnosciPage'
import RegulaminPage from './pages/RegulaminPage'
import NotFoundPage from './pages/NotFoundPage'

// Components
import CookieConsent from './components/CookieConsent'
import Breadcrumbs from './components/Breadcrumbs'
import AdBanner from './components/AdBanner'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-purple-50 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                  <img 
                    src="/images/logo.png" 
                    alt="Beka w Pigułce" 
                    className="w-14 h-14 object-contain group-hover:scale-110 transition-transform"
                  />
                  <div className="hidden sm:block">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                      Beka w Pigułce
                    </h1>
                    <p className="text-xs text-gray-500">Twoja codzienna dawka śmiechu! 😂</p>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                  <NavLink to="/" icon={<Home size={18} />} label="HOME" />
                  <NavLink to="/zagadki" icon={<Brain size={18} />} label="ZAGADKI" />
                  <NavLink to="/odpowiedzi" icon={<MessageCircle size={18} />} label="ODPOWIEDZI" />
                  <NavLink to="/memy" icon={<Image size={18} />} label="MEMY" />
                  <NavLink to="/o-nas" icon={<Users size={18} />} label="O NAS" />
                  <NavLink to="/kontakt" icon={<Mail size={18} />} label="KONTAKT" />
                </nav>

                {/* Mobile Menu Button */}
                <button 
                  onClick={toggleMenu}
                  className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                  aria-label="Menu"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <nav className="lg:hidden bg-gray-900 text-white py-4 border-t border-gray-800">
                <div className="flex flex-col">
                  <MobileNavLink to="/" icon={<Home size={20} />} label="HOME" onClick={toggleMenu} />
                  <MobileNavLink to="/zagadki" icon={<Brain size={20} />} label="ZAGADKI" onClick={toggleMenu} />
                  <MobileNavLink to="/odpowiedzi" icon={<MessageCircle size={20} />} label="ODPOWIEDZI" onClick={toggleMenu} />
                  <MobileNavLink to="/memy" icon={<Image size={20} />} label="MEMY" onClick={toggleMenu} />
                  <MobileNavLink to="/o-nas" icon={<Users size={20} />} label="O NAS" onClick={toggleMenu} />
                  <MobileNavLink to="/kontakt" icon={<Mail size={20} />} label="KONTAKT" onClick={toggleMenu} />
                </div>
              </nav>
            )}
          </header>

          {/* Breadcrumbs */}
          <div className="container mx-auto px-4">
            <Breadcrumbs />
          </div>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8 flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/zagadki" element={<ZagadkiPage />} />
              <Route path="/odpowiedzi" element={<OdpowiedziPage />} />
              <Route path="/memy" element={<MemyPage />} />
              <Route path="/o-nas" element={<ONasPage />} />
              <Route path="/kontakt" element={<KontaktPage />} />
              <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosciPage />} />
              <Route path="/regulamin" element={<RegulaminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white mt-16">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="/images/logo.png" alt="Logo" className="w-12 h-12" />
                    <h3 className="text-xl font-bold text-yellow-400">Beka w Pigułce</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Twoja codzienna dawka śmiechu! Najlepsze memy, zagadki i łamigłówki w jednym miejscu. 
                    Rozwijaj umysł i śmiej się razem z nami!
                  </p>
                  {/* Social Links */}
                  <div className="flex gap-3 mt-4">
                    <SocialLink href="https://facebook.com/bekawpigulce" label="Facebook">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </SocialLink>
                    <SocialLink href="https://instagram.com/bekawpigulce" label="Instagram">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </SocialLink>
                    <SocialLink href="https://youtube.com/bekawpigulce" label="YouTube">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </SocialLink>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-orange-400">Szybkie linki</h4>
                  <ul className="space-y-2">
                    <li><FooterLink to="/">Strona główna</FooterLink></li>
                    <li><FooterLink to="/zagadki">Zagadki</FooterLink></li>
                    <li><FooterLink to="/odpowiedzi">Odpowiedzi</FooterLink></li>
                    <li><FooterLink to="/memy">Memy</FooterLink></li>
                    <li><FooterLink to="/o-nas">O nas</FooterLink></li>
                    <li><FooterLink to="/kontakt">Kontakt</FooterLink></li>
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-pink-400">Informacje prawne</h4>
                  <ul className="space-y-2">
                    <li>
                      <FooterLink to="/regulamin">
                        <FileText size={16} className="inline mr-2" />
                        Regulamin
                      </FooterLink>
                    </li>
                    <li>
                      <FooterLink to="/polityka-prywatnosci">
                        <Shield size={16} className="inline mr-2" />
                        Polityka Prywatności
                      </FooterLink>
                    </li>
                  </ul>
                </div>

                {/* Ad in Footer */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-yellow-400">Reklama</h4>
                  <AdBanner position="sidebar" />
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} Beka w Pigułce. Wszelkie prawa zastrzeżone.
                </p>
                <p className="text-gray-600 text-xs mt-2">
                  Strona wykorzystuje pliki cookies. Korzystając ze strony, akceptujesz naszą{' '}
                  <Link to="/polityka-prywatnosci" className="text-gray-400 hover:text-white">
                    Politykę Prywatności
                  </Link>.
                </p>
              </div>
            </div>
          </footer>

          {/* Cookie Consent */}
          <CookieConsent />
        </div>
      </Router>
    </HelmetProvider>
  )
}

// NavLink Component
function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-2 px-3 py-2 mx-0.5 rounded-lg font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-white transition-all duration-300 text-sm"
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

// Mobile NavLink Component
function MobileNavLink({ to, icon, label, onClick }: { to: string; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
    >
      {icon}
      <span className="font-semibold">{label}</span>
    </Link>
  )
}

// Footer Link Component
function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-gray-400 hover:text-white transition text-sm"
    >
      {children}
    </Link>
  )
}

// Social Link Component
function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition"
    >
      {children}
    </a>
  )
}

export default App
import { Shield, Lock, Eye, UserCheck, Trash2, Cookie } from 'lucide-react'
import AdBanner from '../components/AdBanner'

export default function PolitykaPrywatnosciPage() {
  const lastUpdated = "15 stycznia 2025"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 md:p-12 text-white text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
          <Shield size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Polityka Prywatności</h1>
        <p className="text-white/90">
          Ostatnia aktualizacja: {lastUpdated}
        </p>
      </div>

      <AdBanner position="top" />

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="prose prose-lg max-w-none text-gray-600">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-purple-600" />
              1. Informacje ogólne
            </h2>
            <p className="mb-4">
              Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
              przekazanych przez Użytkowników w związku z korzystaniem ze strony internetowej 
              „Beka w Pigułce" dostępnej pod adresem www.bekawpigulce.pl.
            </p>
            <p className="mb-4">
              Administratorem danych osobowych jest właściciel strony „Beka w Pigułce". 
              Kontakt z administratorem jest możliwy pod adresem email: kontakt@bekawpigulce.pl.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-purple-600" />
              2. Jakie dane zbieramy?
            </h2>
            <p className="mb-4">Możemy zbierać następujące dane:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Dane kontaktowe:</strong> adres email podany przy zapisywaniu do newslettera</li>
              <li><strong>Dane z formularza kontaktowego:</strong> imię, email, treść wiadomości</li>
              <li><strong>Dane techniczne:</strong> adres IP, typ przeglądarki, system operacyjny</li>
              <li><strong>Dane o aktywności:</strong> odwiedzone podstrony, czas spędzony na stronie</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-purple-600" />
              3. Cel przetwarzania danych
            </h2>
            <p className="mb-4">Twoje dane przetwarzamy w następujących celach:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Wysyłka newslettera z nowymi zagadkami i memami</li>
              <li>Odpowiedź na zapytania z formularza kontaktowego</li>
              <li>Analiza ruchu na stronie (Google Analytics)</li>
              <li>Wyświetlanie spersonalizowanych reklam (Google AdSense)</li>
              <li>Poprawa jakości naszych usług</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Cookie className="w-6 h-6 text-purple-600" />
              4. Pliki cookies
            </h2>
            <p className="mb-4">
              Nasza strona używa plików cookies (ciasteczek) w celu zapewnienia prawidłowego 
              działania strony, analizy ruchu i personalizacji treści oraz reklam.
            </p>
            <p className="mb-4"><strong>Rodzaje cookies:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Niezbędne:</strong> wymagane do prawidłowego działania strony</li>
              <li><strong>Analityczne:</strong> pomagają nam analizować ruch (Google Analytics)</li>
              <li><strong>Reklamowe:</strong> używane do wyświetlania reklam (Google AdSense)</li>
              <li><strong>Funkcjonalne:</strong> zapamiętują Twoje preferencje</li>
            </ul>
            <p className="mb-4">
              Możesz zarządzać plikami cookies w ustawieniach swojej przeglądarki. 
              Pamiętaj jednak, że wyłączenie niektórych cookies może wpłynąć na funkcjonalność strony.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Google AdSense i Analytics</h2>
            <p className="mb-4">
              Korzystamy z usług Google AdSense do wyświetlania reklam oraz Google Analytics 
              do analizy ruchu na stronie. Te usługi mogą używać plików cookies i podobnych 
              technologii do zbierania informacji o Twoich odwiedzinach.
            </p>
            <p className="mb-4">
              Więcej informacji o polityce prywatności Google znajdziesz na stronie:{' '}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                policies.google.com/privacy
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Twoje prawa</h2>
            <p className="mb-4">Masz prawo do:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Dostępu do swoich danych osobowych</li>
              <li>Sprostowania (poprawienia) swoich danych</li>
              <li>Usunięcia danych ("prawo do bycia zapomnianym")</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania</li>
              <li>Wycofania zgody w dowolnym momencie</li>
            </ul>
            <p className="mb-4">
              Aby skorzystać ze swoich praw, skontaktuj się z nami pod adresem:{' '}
              <a href="mailto:kontakt@bekawpigulce.pl" className="text-purple-600 hover:underline">
                kontakt@bekawpigulce.pl
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Trash2 className="w-6 h-6 text-purple-600" />
              7. Okres przechowywania danych
            </h2>
            <p className="mb-4">
              Dane osobowe przechowujemy tylko tak długo, jak jest to niezbędne do realizacji 
              celów, dla których zostały zebrane:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Dane newsletterowe: do momentu wypisania się</li>
              <li>Dane z formularza kontaktowego: 2 lata</li>
              <li>Dane analityczne: 26 miesięcy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Bezpieczeństwo danych</h2>
            <p className="mb-4">
              Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane 
              osobowe przed nieautoryzowanym dostępem, utratą czy zniszczeniem. Korzystamy 
              z szyfrowania SSL i regularnie aktualizujemy nasze zabezpieczenia.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Zmiany w polityce prywatności</h2>
            <p className="mb-4">
              Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. 
              O wszelkich zmianach będziemy informować na tej stronie, a w przypadku istotnych 
              zmian - również drogą mailową.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Kontakt</h2>
            <p className="mb-4">
              W razie pytań dotyczących niniejszej Polityki Prywatności prosimy o kontakt:
            </p>
            <p className="mb-4">
              <strong>Email:</strong>{' '}
              <a href="mailto:kontakt@bekawpigulce.pl" className="text-purple-600 hover:underline">
                kontakt@bekawpigulce.pl
              </a>
            </p>
            <p>
              <strong>Strona:</strong>{' '}
              <a href="/kontakt" className="text-purple-600 hover:underline">
                Formularz kontaktowy
              </a>
            </p>
          </section>

        </div>
      </div>

      <AdBanner position="bottom" />
    </div>
  )
}
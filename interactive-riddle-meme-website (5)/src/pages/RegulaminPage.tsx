import { FileText, Scale, AlertCircle, Copyright, Gavel } from 'lucide-react'
import AdBanner from '../components/AdBanner'

export default function RegulaminPage() {
  const lastUpdated = "15 stycznia 2025"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 text-white text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
          <Scale size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Regulamin</h1>
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
              <FileText className="w-6 h-6 text-purple-600" />
              §1. Postanowienia ogólne
            </h2>
            <p className="mb-4">
              1. Niniejszy Regulamin określa zasady korzystania ze strony internetowej 
              „Beka w Pigułce" dostępnej pod adresem www.bekawpigulce.pl (dalej: „Strona").
            </p>
            <p className="mb-4">
              2. Właścicielem i administratorem Strony jest zespół „Beka w Pigułce" 
              (dalej: „Administrator").
            </p>
            <p className="mb-4">
              3. Korzystanie ze Strony jest dobrowolne i bezpłatne.
            </p>
            <p className="mb-4">
              4. Korzystając ze Strony, Użytkownik akceptuje niniejszy Regulamin oraz 
              Politykę Prywatności.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§2. Definicje</h2>
            <p className="mb-4">Użyte w Regulaminie terminy oznaczają:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Strona</strong> - serwis internetowy „Beka w Pigułce"</li>
              <li><strong>Użytkownik</strong> - osoba korzystająca ze Strony</li>
              <li><strong>Treści</strong> - wszystkie materiały dostępne na Stronie (teksty, obrazy, zagadki, memy)</li>
              <li><strong>Newsletter</strong> - bezpłatny serwis informacyjny wysyłany drogą elektroniczną</li>
              <li><strong>Cookies</strong> - pliki tekstowe zapisywane na urządzeniu Użytkownika</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§3. Zasady korzystania</h2>
            <p className="mb-4">1. Użytkownik zobowiązuje się do:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Korzystania ze Strony zgodnie z prawem i dobrymi obyczajami</li>
              <li>Niepodejmowania działań mogących zakłócić prawidłowe funkcjonowanie Strony</li>
              <li>Nienaruszania praw własności intelektualnej</li>
              <li>Nieumieszczania na Stronie treści niezgodnych z prawem, wulgarnych lub obraźliwych</li>
            </ul>
            <p className="mb-4">2. Zabronione jest:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Kopiowanie, modyfikowanie lub rozpowszechnianie Treści bez zgody Administratora</li>
              <li>Wykorzystywanie robotów, spiderów lub innych automatycznych narzędzi do pobierania Treści</li>
              <li>Próby uzyskania nieautoryzowanego dostępu do systemu Strony</li>
              <li>Działalność spamerska</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Copyright className="w-6 h-6 text-purple-600" />
              §4. Prawa własności intelektualnej
            </h2>
            <p className="mb-4">
              1. Wszystkie Treści zamieszczone na Stronie (teksty, zdjęcia, grafiki, 
              zagadki, memy, logo) są chronione prawem autorskim i stanowią własność 
              Administratora lub podmiotów, z którymi Administrator zawarł stosowne umowy.
            </p>
            <p className="mb-4">
              2. Użytkownik może korzystać z Treści wyłącznie do celów osobistych, niekomercyjnych.
            </p>
            <p className="mb-4">
              3. Zabronione jest kopiowanie, modyfikowanie, rozpowszechnianie lub 
              wykorzystywanie Treści w celach komercyjnych bez pisemnej zgody Administratora.
            </p>
            <p className="mb-4">
              4. Niektóre memy i obrazy mogą pochodzić z zasobów publicznych lub być 
              objęte licencjami Creative Commons. W takich przypadkach źródło jest 
              odpowiednio oznaczone.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§5. Newsletter</h2>
            <p className="mb-4">
              1. Zapisanie się do newslettera jest dobrowolne i bezpłatne.
            </p>
            <p className="mb-4">
              2. Aby zapisać się do newslettera, Użytkownik musi podać adres email 
              i wyrazić zgodę na przetwarzanie danych.
            </p>
            <p className="mb-4">
              3. Użytkownik może w każdej chwili wypisać się z newslettera, 
              klikając link „Wypisz się" w stopce każdej wiadomości.
            </p>
            <p className="mb-4">
              4. Administrator zastrzega sobie prawo do zawieszenia lub zakończenia 
              działalności newslettera w dowolnym momencie.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§6. Reklamy i linki zewnętrzne</h2>
            <p className="mb-4">
              1. Na Stronie mogą być wyświetlane reklamy pochodzące od zewnętrznych 
              dostawców, w tym Google AdSense.
            </p>
            <p className="mb-4">
              2. Strona może zawierać linki do innych stron internetowych. 
              Administrator nie ponosi odpowiedzialności za treści zamieszczone 
              na tych stronach.
            </p>
            <p className="mb-4">
              3. Korzystanie z usług zewnętrznych dostawców (np. Google) podlega 
              ich własnym regulaminom i politykom prywatności.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-purple-600" />
              §7. Odpowiedzialność
            </h2>
            <p className="mb-4">
              1. Administrator dokłada wszelkich starań, aby Treści zamieszczone na 
              Stronie były rzetelne i aktualne, nie ponosi jednak odpowiedzialności 
              za ewentualne błędy lub nieścisłości.
            </p>
            <p className="mb-4">
              2. Administrator nie ponosi odpowiedzialności za przerwy w dostępności 
              Strony wynikające z przyczyn technicznych, siły wyższej lub prac konserwacyjnych.
            </p>
            <p className="mb-4">
              3. Korzystanie ze Strony odbywa się na własne ryzyko Użytkownika.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§8. Ochrona danych osobowych</h2>
            <p className="mb-4">
              1. Szczegółowe informacje dotyczące przetwarzania danych osobowych 
              znajdują się w{' '}
              <a href="/polityka-prywatnosci" className="text-purple-600 hover:underline">
                Polityce Prywatności
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">§9. Zmiany regulaminu</h2>
            <p className="mb-4">
              1. Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszym Regulaminie.
            </p>
            <p className="mb-4">
              2. Zmiany wchodzą w życie z chwilą opublikowania ich na Stronie.
            </p>
            <p className="mb-4">
              3. Kontynuowanie korzystania ze Strony po wprowadzeniu zmian oznacza akceptację nowego Regulaminu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Gavel className="w-6 h-6 text-purple-600" />
              §10. Postanowienia końcowe
            </h2>
            <p className="mb-4">
              1. Regulamin podlega prawu polskiemu.
            </p>
            <p className="mb-4">
              2. W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają 
              przepisy Kodeksu cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną.
            </p>
            <p className="mb-4">
              3. Wszelkie spory będą rozstrzygane przez sądy powszechne właściwe dla siedziby Administratora.
            </p>
            <p>
              4. W razie pytań dotyczących Regulaminu prosimy o kontakt:{' '}
              <a href="mailto:kontakt@bekawpigulce.pl" className="text-purple-600 hover:underline">
                kontakt@bekawpigulce.pl
              </a>
            </p>
          </section>

        </div>
      </div>

      <AdBanner position="bottom" />
    </div>
  )
}
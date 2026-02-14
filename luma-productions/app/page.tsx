import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const services = [
    {
      title: 'Maturalne Večeri',
      description: 'Uhvatite najljepše trenutke vaše maturalne večeri',
      href: '/maturalne-veceri',
      image: '/maturalna.webp',
    },
    {
      title: 'Vjenčanja',
      description: 'Vječno sačuvajte najvažniji dan vašeg života',
      href: '/vjencanja',
      image: '/vjencanje.webp',
    },
    {
      title: 'Krštenja',
      description: 'Posebni obiteljski trenuci zaslužuju posebnu pažnju',
      href: '/krstenja',
      image: '/krstenje.webp',
    },
    {
      title: 'Reklame',
      description: 'Profesionalna fotografija za vaš brend',
      href: '/reklame',
      image: '', // empty means coming soon
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Profesionalna Fotografija
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Čuvamo vaše najdragocjenije trenutke
          </p>
          <Link
            href="/kontakt"
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Kontaktirajte nas
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Naše Usluge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
            >
              <div className="relative h-64 w-full bg-gray-200 flex items-center justify-center">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-gray-500 text-2xl font-bold">Uskoro</span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Zašto Odabrati Nas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-2">Iskustvo</h3>
              <p className="text-gray-600">
                Više od 10 godina iskustva u profesionalnoj fotografiji
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">Kvaliteta</h3>
              <p className="text-gray-600">
                Vrhunska oprema i obrada fotografija
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Pristupačne Cijene</h3>
              <p className="text-gray-600">
                Najbolji omjer cijene i kvalitete
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

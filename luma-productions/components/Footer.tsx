export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Foto Studio</h3>
            <p className="text-gray-400">
              Profesionalna fotografija za sve vaše posebne trenutke.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Kontakt</h3>
            <p className="text-gray-400">Email: info@fotostudio.hr</p>
            <p className="text-gray-400">Tel: +385 XX XXX XXXX</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Pratite nas</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Foto Studio. Sva prava pridržana.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white text-black py-2">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-1">

        {/* Golden Line */}
        <div
          className="w-full h-0.5 mb-1 rounded"
          style={{ backgroundColor: '#BE9E5C' }}
        ></div>

        {/* Contact Info */}
        <div className="text-center space-y-1">
          <p className="text-gray-700">info@luma-productions.net</p>
          <p className="text-gray-700">+385 97 6172 191</p>
        </div>

        {/* Bottom Text */}
        <div>
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Luma Productions. Sva prava pridržana.
          </p>
        </div>

      </div>
    </footer>
  );
}

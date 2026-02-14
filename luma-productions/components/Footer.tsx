export default function Footer() {
  return (
    <footer className="bg-white text-black">
      
      {/* Short top border */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-[#be9d5a]/40"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* You can add columns here if needed */}
        </div>

        {/* Bottom */}
        <div>
          <p className="text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Luma Productions. Sva prava pridržana.
          </p>
        </div>
      </div>

    </footer>
  );
}

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#F5E8D3] p-4 relative" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' }}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="w-32">
          <Link to="/">
            <img src="/icons/logo.svg" alt="Logo" className="h-8" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-12 flex-1 justify-center">
          <Link to="/list" className="text-black hover:text-gray-700">Makanan</Link>
          <a href="#" className="text-black hover:text-gray-700">Produk</a>
          <a href="#" className="text-black hover:text-gray-700">Jasa</a>
          <a href="#" className="text-black hover:text-gray-700">Belanja</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <button className="text-black hover:text-gray-700">log in</button>
          <button className="bg-[#FFCA8E] text-black px-4 py-2 rounded-lg hover:bg-[#F39C12]">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
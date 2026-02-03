import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact Information', path: '/contact' },
    { name: 'Request a Quote', path: '/quote' },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/80 backdrop-blur-md z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white hover:text-amber-300 transition-colors mb-8 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-lg text-white hover:bg-white/10 hover:text-amber-300 rounded-lg transition-colors cursor-pointer"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content - shifts right when menu is open */}
      <div
        className={`relative z-10 transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-64' : 'translate-x-0'
        }`}
      >
        <nav className="bg-black/30 backdrop-blur-md sticky top-0 z-40 border-b border-white/10">
          <div className="relative py-4">
            {/* Hamburger Menu - Far left */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-300 transition-colors p-2 cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo - Centered */}
            <Link
              to="/"
              className="flex items-center justify-center gap-3 text-2xl font-semibold text-white hover:text-amber-300 transition-colors cursor-pointer"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <Logo className="w-10 h-10" />
              <span className="tracking-wide italic">Arnold Woodworking</span>
            </Link>
          </div>
        </nav>

        <main>
          <Outlet />
        </main>

        <footer className="bg-black/30 backdrop-blur-md text-white py-8 mt-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-white/60">Handcrafted with care</p>
          </div>
        </footer>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}

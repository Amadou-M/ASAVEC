import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { path: '/', label: 'Accueil' },
  { path: '/a-propos', label: 'À propos' },
  { path: '/projets', label: 'Projets' },
  { path: '/actualites', label: 'Actualités' },
  { path: '/galerie', label: 'Galerie' },
  { path: '/evenements', label: 'Événements' },
  { path: '/contact', label: 'Contact' },
];

const SITE_NAME = 'ASAVEC-Mali';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navBg = scrolled || !isHome ? 'bg-white shadow-md' : 'bg-transparent';
  const textColor = scrolled || !isHome ? 'text-gray-800' : 'text-white';
  const logoTextColor = scrolled || !isHome ? 'text-green-600' : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      {/* Tricolor top line */}
      <div className="tricolor-border" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo avec image */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <img 
                src="/images/Logo.jpeg" 
                 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hidden sm:block">
              <div className={`font-serif font-bold text-xl leading-none ${logoTextColor} transition-colors duration-300`}>
                {SITE_NAME}
              </div>
              <div className={`text-xs font-medium leading-none mt-0.5 ${scrolled || !isHome ? 'text-gray-500' : 'text-white/80'} transition-colors duration-300`}>
                Développement Durable
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group
                  ${location.pathname === link.path
                    ? 'text-[#1B6B2F] font-semibold'
                    : `${textColor} hover:text-[#1B6B2F]`
                  }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#F5A623] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/adhesion" className="btn-outline text-sm py-2 px-4">
              Adhérer
            </Link>
            <Link to="/don" className="btn-gold text-sm py-2 px-4">
              <Heart size={14} />
              Faire un don
            </Link>
          </div>

          {/* Burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${textColor}`}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors
                ${location.pathname === link.path
                  ? 'bg-green-50 text-green-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-green-700'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <Link to="/adhesion" className="block btn-outline text-sm py-2.5 text-center">
              Adhérer à ASAVEC
            </Link>
            <Link to="/don" className="block btn-gold text-sm py-2.5 justify-center">
              <Heart size={14} />
              Faire un don
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
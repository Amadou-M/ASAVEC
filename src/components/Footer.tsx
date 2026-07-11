import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart, ArrowRight, Leaf } from 'lucide-react';
import { SITE_NAME, SITE_FULL_NAME, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS, NAV_LINKS } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter banner */}
      <div className="bg-[#1B6B2F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">Restez informé de nos actions</h3>
              <p className="text-white/80 text-sm">Abonnez-vous à notre newsletter pour suivre nos projets et actualités.</p>
            </div>
            <form
              className="flex gap-2 w-full md:w-auto"
              onSubmit={(e) => { e.preventDefault(); }}
            >
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 md:w-72 px-4 py-3 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
              <button type="submit" className="btn-gold whitespace-nowrap">
                S'abonner
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full overflow-hidden flex flex-col">
                  <div className="flex-1 bg-[#1B6B2F]" />
                  <div className="flex-1 bg-[#F5A623]" />
                  <div className="flex-1 bg-[#CE1126]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bold text-white text-sm">A</span>
                </div>
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-white leading-none">{SITE_NAME}</div>
                <div className="text-xs text-gray-400 mt-0.5">Développement Durable</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {SITE_FULL_NAME}. Ensemble pour un Mali vert, sain et prospère.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1B6B2F] transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#1B6B2F] rounded-full group-hover:bg-[#F5A623] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/adhesion" className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#1B6B2F] rounded-full group-hover:bg-[#F5A623] transition-colors" />
                  Adhérer
                </Link>
              </li>
              <li>
                <Link to="/don" className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#1B6B2F] rounded-full group-hover:bg-[#F5A623] transition-colors" />
                  Faire un don
                </Link>
              </li>
            </ul>
          </div>

          {/* Domaines */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Nos Domaines</h4>
            <ul className="space-y-3">
              {['Environnement & Reboisement', 'Santé Communautaire', 'Éducation & Formation', 'Eau & Assainissement', 'Agriculture Durable', 'Femmes & Jeunesse'].map((d) => (
                <li key={d}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <Leaf size={12} className="text-[#1B6B2F] flex-shrink-0" />
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{CONTACT_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#F5A623] flex-shrink-0" />
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="text-gray-400 hover:text-white text-sm transition-colors">{CONTACT_PHONE}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#F5A623] flex-shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-400 hover:text-white text-sm transition-colors break-all">{CONTACT_EMAIL}</a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-3">Faites la différence aujourd'hui</p>
              <Link to="/don" className="btn-gold text-xs py-2 px-4 w-full justify-center">
                <Heart size={12} />
                Faire un don
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {year} {SITE_NAME} — Tous droits réservés. Association à but non lucratif.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/mentions-legales" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Mentions légales</Link>
            <Link to="/politique-confidentialite" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>

      {/* Tricolor bottom line */}
      <div className="tricolor-border" />
    </footer>
  );
}

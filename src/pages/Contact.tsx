import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Facebook, Twitter, Instagram, Youtube, Clock } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from '../data';

function PageHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#1B6B2F] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1920')` }} />
      <div className="tricolor-border-thick absolute bottom-0 left-0 right-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="badge bg-white/20 text-white mb-4">Nous joindre</span>
        <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl mb-4">Contact</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Une question, un partenariat, du bénévolat ? Nous sommes à votre écoute.
        </p>
      </div>
    </section>
  );
}

const SUBJECTS = [
  'Informations générales',
  'Partenariat / Collaboration',
  'Devenir bénévole',
  'Don et financement',
  'Presse / Médias',
  'Adhésion',
  'Autre',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main>
      <PageHero />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="badge bg-green-100 text-green-700 mb-3">Coordonnées</span>
                <h2 className="font-serif font-bold text-3xl text-gray-900 mb-4">Parlons ensemble</h2>
                <p className="text-gray-500 leading-relaxed">
                  Notre équipe est disponible pour répondre à toutes vos questions et accueillir vos propositions de collaboration.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: MapPin, label: 'Adresse', value: CONTACT_ADDRESS, href: null },
                  { icon: Phone, label: 'Téléphone', value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, '')}` },
                  { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                  { icon: Clock, label: 'Horaires', value: 'Lun – Ven : 8h00 – 17h00', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#1B6B2F]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} className="text-gray-700 text-sm font-medium hover:text-green-600 transition-colors">{value}</a>
                      ) : (
                        <span className="text-gray-700 text-sm font-medium">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-3">Suivez-nous</p>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, color: 'hover:bg-blue-600', label: 'Facebook' },
                    { icon: Twitter, color: 'hover:bg-sky-500', label: 'Twitter' },
                    { icon: Instagram, color: 'hover:bg-pink-600', label: 'Instagram' },
                    { icon: Youtube, color: 'hover:bg-red-600', label: 'YouTube' },
                  ].map(({ icon: Icon, color, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className={`w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:text-white ${color} transition-all`}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 h-48 bg-gray-100 relative">
                <img
                  src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Localisation"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-full shadow text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin size={14} className="text-[#1B6B2F]" />
                    Bamako, Mali
                  </div>
                </div>
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                    <h3 className="font-serif font-bold text-2xl text-gray-900 mb-2">Message envoyé !</h3>
                    <p className="text-gray-500">Merci pour votre message. Notre équipe vous répondra dans les 48 heures.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 btn-outline text-sm">
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif font-bold text-2xl text-gray-900 mb-6">Envoyez-nous un message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet *</label>
                          <input
                            required
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                          <input
                            required
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="modibo.t1998@gmail.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-green-500"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="(+223) 75 91 13 70"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Objet *</label>
                          <select
                            required
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white"
                          >
                            <option value="">Sélectionnez un objet</option>
                            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                        <textarea
                          required
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={6}
                          placeholder="Décrivez votre demande..."
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm resize-none"
                        />
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" required id="consent" className="mt-0.5" />
                        <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed">
                          J'accepte que mes données soient utilisées pour traiter ma demande. Elles ne seront pas partagées à des tiers.
                        </label>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center text-base py-3"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Envoi en cours...
                          </span>
                        ) : (
                          <>
                            <Send size={16} />
                            Envoyer le message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

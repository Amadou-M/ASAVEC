import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { EVENTS, CATEGORY_COLORS } from '../data';
import { useInView } from '../hooks/useInView';

function PageHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#1B6B2F] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920')` }} />
      <div className="tricolor-border-thick absolute bottom-0 left-0 right-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="badge bg-white/20 text-white mb-4">Agenda</span>
        <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl mb-4">Événements</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Rejoignez-nous lors de nos prochaines activités, formations et événements.
        </p>
      </div>
    </section>
  );
}

function EventModal({ event, onClose }: { event: typeof EVENTS[0]; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const pct = Math.round((event.registered / event.seats) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="img-zoom h-56">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-8">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
              <h3 className="font-serif font-bold text-2xl text-gray-900 mb-2">Inscription confirmée !</h3>
              <p className="text-gray-500">Merci {name}, vous recevrez un email de confirmation prochainement.</p>
              <button onClick={onClose} className="mt-6 btn-primary">Fermer</button>
            </div>
          ) : (
            <>
              <span className={`badge ${CATEGORY_COLORS[event.category] || 'bg-gray-100'} mb-3`}>{event.category}</span>
              <h2 className="font-serif font-bold text-2xl text-gray-900 mb-4">{event.title}</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Calendar size={16} className="text-green-600" />{event.date}</div>
                <div className="flex items-center gap-2"><Clock size={16} className="text-green-600" />{event.time}</div>
                <div className="flex items-center gap-2"><MapPin size={16} className="text-green-600" />{event.location}</div>
                <div className="flex items-center gap-2"><Users size={16} className="text-green-600" />{event.seats - event.registered} places restantes</div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{event.description}</p>

              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Inscriptions</span>
                  <span>{event.registered} / {event.seats} ({pct}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#1B6B2F] h-2 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <h3 className="font-serif font-semibold text-lg mb-4">Formulaire d'inscription</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="votre@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="+223 XX XX XX XX" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={onClose} className="flex-1 btn-outline text-sm py-2.5 justify-center">Annuler</button>
                  <button type="submit" className="flex-1 btn-primary text-sm py-2.5 justify-center">
                    Confirmer l'inscription <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: typeof EVENTS[0] }) {
  const { ref, inView } = useInView();
  const [modalOpen, setModalOpen] = useState(false);
  const pct = Math.round((event.registered / event.seats) * 100);
  const almostFull = pct >= 80;

  return (
    <>
      {modalOpen && <EventModal event={event} onClose={() => setModalOpen(false)} />}
      <div
        ref={ref}
        className={`card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 ${inView ? 'animate-fade-up' : 'opacity-0'}`}
      >
        <div className="img-zoom h-56 relative">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`badge ${CATEGORY_COLORS[event.category] || 'bg-white/90 text-gray-700'} backdrop-blur-sm`}>
              {event.category}
            </span>
            {almostFull && <span className="badge bg-red-100 text-red-600">Presque complet</span>}
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-serif font-bold text-gray-900 text-xl mb-3 leading-tight">{event.title}</h3>
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5 col-span-2"><Calendar size={12} className="text-green-600" />{event.date} — {event.time}</div>
            <div className="flex items-center gap-1.5 col-span-2"><MapPin size={12} className="text-green-600" />{event.location}</div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{event.description}</p>
          <div className="mb-5">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span><Users size={11} className="inline mr-1" />{event.registered} inscrits</span>
              <span>{event.seats - event.registered} places restantes</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${almostFull ? 'bg-[#CE1126]' : 'bg-[#1B6B2F]'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary w-full justify-center text-sm"
          >
            S'inscrire à l'événement
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}

export default function Events() {
  return (
    <main>
      <PageHero />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif font-bold text-3xl text-gray-900 mb-2">Prochains événements</h2>
            <p className="text-gray-500">Participez et contribuez directement à nos actions sur le terrain.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
            {EVENTS.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Become volunteer */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="badge bg-green-100 text-green-700 mb-4">Bénévolat</span>
          <h2 className="font-serif font-bold text-3xl text-gray-900 mb-4">Devenez bénévole</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Vous souhaitez organiser ou co-animer un événement avec ASAVEC ? Contactez-nous pour proposer votre aide et vos compétences.
          </p>
          <a href="/contact" className="btn-primary">
            Proposer votre aide <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

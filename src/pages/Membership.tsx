import { useState } from 'react';
import { CheckCircle, ArrowRight, Star, Users, Award, Heart } from 'lucide-react';

const PLANS = [
  {
    id: 'sympathisant',
    label: 'Membre Sympathisant',
    price: '5 000',
    period: '/an',
    color: 'border-gray-200',
    accent: 'text-gray-700',
    bg: 'bg-gray-50',
    badge: null,
    benefits: [
      'Newsletter mensuelle',
      'Invitation aux événements publics',
      'Carte de membre ASAVEC',
      'Accès à notre rapport annuel',
    ],
  },
  {
    id: 'actif',
    label: 'Membre Actif',
    price: '15 000',
    period: '/an',
    color: 'border-[#1B6B2F]',
    accent: 'text-green-700',
    bg: 'bg-green-50',
    badge: 'Recommandé',
    benefits: [
      'Tous les avantages Sympathisant',
      'Droit de vote en Assemblée Générale',
      'Participation aux projets terrain',
      'Formation et renforcement de capacités',
      'Accès aux réunions internes',
    ],
  },
  {
    id: 'bienfaiteur',
    label: 'Membre Bienfaiteur',
    price: '50 000',
    period: '/an',
    color: 'border-[#F5A623]',
    accent: 'text-amber-700',
    bg: 'bg-amber-50',
    badge: 'Premium',
    benefits: [
      'Tous les avantages Membre Actif',
      'Plaque honorifique sur nos projets',
      'Mention dans notre rapport annuel',
      'Invitation au Gala annuel',
      'Rencontres privilégiées avec la direction',
      'Impact report dédié',
    ],
  },
];

function PageHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#1B6B2F] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/6647117/pexels-photo-6647117.jpeg?auto=compress&cs=tinysrgb&w=1920')` }} />
      <div className="tricolor-border-thick absolute bottom-0 left-0 right-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="badge bg-white/20 text-white mb-4">Rejoindre notre communauté</span>
        <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl mb-4">Adhérer à ASAVEC</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Devenez membre et contribuez activement au développement durable du Mali.
        </p>
      </div>
    </section>
  );
}

export default function Membership() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', profession: '', city: '', motivation: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main>
        <PageHero />
        <section className="py-20 bg-gray-50">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-5" />
              <h2 className="font-serif font-bold text-3xl text-gray-900 mb-3">Bienvenue dans ASAVEC !</h2>
              <p className="text-gray-500 mb-2">Votre demande d'adhésion a bien été reçue.</p>
              <p className="text-gray-500 mb-8">Notre équipe vous contactera sous 48h pour finaliser votre inscription.</p>
              <a href="/" className="btn-primary justify-center">Retour à l'accueil</a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHero />

      {/* Why join */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif font-bold text-3xl text-gray-900 mb-3">Pourquoi adhérer ?</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Rejoindre une communauté', desc: 'Intégrez un réseau de plus de 200 membres engagés pour le développement durable du Mali.' },
              { icon: Heart, title: 'Agir concrètement', desc: 'Participez directement aux projets sur le terrain et voyez l\'impact de votre engagement.' },
              { icon: Award, title: 'Développer vos compétences', desc: 'Accédez à des formations, ateliers et opportunités de réseautage professionnels.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-serif font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-3xl text-gray-900 text-center mb-10">Choisissez votre formule</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {PLANS.map(plan => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative cursor-pointer bg-white rounded-2xl border-2 p-8 transition-all ${plan.color} ${selectedPlan === plan.id ? 'shadow-lg scale-105' : 'hover:shadow-md'}`}
              >
                {plan.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 badge ${plan.id === 'actif' ? 'bg-green-600 text-white' : 'bg-[#F5A623] text-white'}`}>
                    {plan.badge}
                  </span>
                )}
                {selectedPlan === plan.id && (
                  <CheckCircle size={20} className="absolute top-4 right-4 text-green-500" />
                )}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${plan.bg} ${plan.accent}`}>
                  {plan.label}
                </div>
                <div className="mb-6">
                  <span className={`font-serif font-bold text-4xl ${plan.accent}`}>{plan.price}</span>
                  <span className="text-gray-400 text-sm ml-1 font-medium">FCFA{plan.period}</span>
                </div>
                <ul className="space-y-2.5">
                  {plan.benefits.map(b => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Form */}
          {selectedPlan ? (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="font-serif font-bold text-2xl text-gray-900 mb-2">
                Formulaire d'adhésion
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Formule choisie : <strong>{PLANS.find(p => p.id === selectedPlan)?.label}</strong>
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet *</label>
                    <input required name="name" value={form.name} onChange={handleChange} type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input required name="email" value={form.email} onChange={handleChange} type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="votre@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone *</label>
                    <input required name="phone" value={form.phone} onChange={handleChange} type="tel" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="+223 XX XX XX XX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville</label>
                    <input name="city" value={form.city} onChange={handleChange} type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="Bamako" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Profession</label>
                  <input name="profession" value={form.profession} onChange={handleChange} type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="Votre profession" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Motivation pour rejoindre ASAVEC</label>
                  <textarea name="motivation" value={form.motivation} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm resize-none" placeholder="Pourquoi souhaitez-vous rejoindre notre association ?" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-base py-3">
                  Soumettre ma demande d'adhésion
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          ) : (
            <p className="text-center text-gray-400 text-sm">Sélectionnez une formule pour afficher le formulaire d'adhésion.</p>
          )}
        </div>
      </section>
    </main>
  );
}

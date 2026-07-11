import { useState } from 'react';
import { Heart, CheckCircle, ArrowRight, Shield, Users, Globe, Leaf } from 'lucide-react';

const AMOUNTS = [1000, 2500, 5000, 10000, 25000, 50000];

const DESTINATIONS = [
  { id: 'general', label: 'Là où c\'est le plus nécessaire', icon: Heart },
  { id: 'env', label: 'Reboisement & Environnement', icon: Leaf },
  { id: 'sante', label: 'Santé communautaire', icon: Shield },
  { id: 'eau', label: 'Eau & Assainissement', icon: Globe },
  { id: 'femmes', label: 'Femmes & Jeunesse', icon: Users },
];

const IMPACT = [
  { amount: 5000, impact: 'Plantation de 10 arbres dans votre nom' },
  { amount: 10000, impact: 'Vaccination de 5 enfants en zone rurale' },
  { amount: 25000, impact: 'Kit scolaire complet pour 3 enfants' },
  { amount: 50000, impact: 'Financement partiel d\'un puits de village' },
];

function PageHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/8613319/pexels-photo-8613319.jpeg?auto=compress&cs=tinysrgb&w=1920')` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#CE1126]/90 to-[#1B6B2F]/90" />
      <div className="tricolor-border-thick absolute bottom-0 left-0 right-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
          <Heart size={32} className="text-white" />
        </div>
        <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl mb-4">Faire un don</h1>
        <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed">
          Votre générosité change des vies au Mali. Chaque franc compte.
        </p>
      </div>
    </section>
  );
}

export default function Donate() {
  const [amount, setAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState('');
  const [destination, setDestination] = useState('general');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [step, setStep] = useState(1);
  const [payForm, setPayForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) : (amount as number);

  const handlePay = (e: React.FormEvent) => {
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
              <h2 className="font-serif font-bold text-3xl text-gray-900 mb-3">Merci pour votre don !</h2>
              <p className="text-gray-500 mb-2">
                Votre don de <strong>{finalAmount?.toLocaleString('fr-FR')} FCFA</strong> a bien été enregistré.
              </p>
              <p className="text-gray-500 mb-8">Un reçu vous sera envoyé par email.</p>
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {/* Steps */}
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2].map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        step >= s ? 'bg-[#1B6B2F] text-white' : 'bg-gray-100 text-gray-400'
                      }`}>{s}</div>
                      <span className={`text-sm ${step >= s ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                        {s === 1 ? 'Montant' : 'Coordonnées'}
                      </span>
                      {s < 2 && <div className={`h-px w-8 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <div className="space-y-6">
                    {/* Frequency */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Type de don</label>
                      <div className="grid grid-cols-2 gap-3">
                        {([['once', 'Don unique'], ['monthly', 'Don mensuel']] as const).map(([val, label]) => (
                          <button
                            key={val}
                            onClick={() => setFrequency(val)}
                            className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                              frequency === val ? 'border-[#1B6B2F] bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Montant (FCFA)</label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {AMOUNTS.map(a => (
                          <button
                            key={a}
                            onClick={() => { setAmount(a); setCustomAmount(''); }}
                            className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                              amount === a && !customAmount ? 'border-[#F5A623] bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                            }`}
                          >
                            {a.toLocaleString('fr-FR')}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">FCFA</span>
                        <input
                          type="number"
                          placeholder="Autre montant"
                          value={customAmount}
                          onChange={e => { setCustomAmount(e.target.value); setAmount(''); }}
                          className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* Destination */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Affecter mon don à</label>
                      <div className="space-y-2">
                        {DESTINATIONS.map(d => {
                          const Icon = d.icon;
                          return (
                            <button
                              key={d.id}
                              onClick={() => setDestination(d.id)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-sm text-left transition-all ${
                                destination === d.id ? 'border-[#1B6B2F] bg-green-50' : 'border-gray-100 hover:border-gray-200'
                              }`}
                            >
                              <Icon size={16} className={destination === d.id ? 'text-green-600' : 'text-gray-400'} />
                              <span className={destination === d.id ? 'text-green-700 font-medium' : 'text-gray-600'}>{d.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!finalAmount || finalAmount < 100}
                      className="btn-gold w-full justify-center text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continuer — {finalAmount ? `${finalAmount.toLocaleString('fr-FR')} FCFA` : ''}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <form onSubmit={handlePay} className="space-y-5">
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Montant du don</span>
                        <span className="font-bold text-green-700">{finalAmount?.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Fréquence</span>
                        <span>{frequency === 'monthly' ? 'Mensuel' : 'Don unique'}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet *</label>
                      <input required value={payForm.name} onChange={e => setPayForm(f => ({ ...f, name: e.target.value }))} type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="Votre nom" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input required value={payForm.email} onChange={e => setPayForm(f => ({ ...f, email: e.target.value }))} type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="votre@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone (Mobile Money)</label>
                      <input value={payForm.phone} onChange={e => setPayForm(f => ({ ...f, phone: e.target.value }))} type="tel" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" placeholder="+223 XX XX XX XX" />
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500">
                      <Shield size={14} className="inline mr-1 text-green-600" />
                      Paiement sécurisé via Orange Money, Moov Money ou virement bancaire.
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1 justify-center text-sm">Retour</button>
                      <button type="submit" className="btn-gold flex-1 justify-center text-sm">
                        <Heart size={14} />
                        Confirmer le don
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Impact sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-serif font-bold text-xl text-gray-900 mb-5">L'impact de votre don</h3>
                <div className="space-y-4">
                  {IMPACT.map(({ amount: a, impact }) => (
                    <div key={a} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="text-right shrink-0">
                        <div className="font-bold text-green-600 text-sm">{a.toLocaleString('fr-FR')}</div>
                        <div className="text-gray-400 text-xs">FCFA</div>
                      </div>
                      <div className="w-px bg-gray-200" />
                      <p className="text-gray-600 text-sm leading-relaxed">{impact}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#1B6B2F] rounded-2xl p-6 text-white">
                <h4 className="font-serif font-bold text-lg mb-3">Transparence garantie</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  {['100% de votre don va au terrain', 'Rapport annuel publié', 'Reçu fiscal fourni', 'Vos choix d\'affectation respectés'].map(t => (
                    <li key={t} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-[#F5A623] flex-shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

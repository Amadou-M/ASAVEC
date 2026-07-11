import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Award, Users, Clock, Heart } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { TEAM, DOMAINS } from '../data';
import { Leaf, BookOpen, Droplets, Sprout } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const TIMELINE = [
  { year: '2009', event: 'Fondation d\'ASAVEC-Mali à Bamako par Moussa Diarra et 12 membres fondateurs' },
  { year: '2011', event: 'Premier projet de reboisement — plantation de 5 000 arbres dans le district de Bamako' },
  { year: '2013', event: 'Lancement du programme de santé communautaire dans la région de Ségou' },
  { year: '2015', event: 'Construction des premiers puits artésiens à Mopti — accès à l\'eau pour 500 familles' },
  { year: '2017', event: 'Partenariat avec le PNUD pour le programme d\'alphabétisation des femmes' },
  { year: '2019', event: 'Lancement du programme d\'entrepreneuriat vert pour les jeunes maliens' },
  { year: '2021', event: 'Extension des activités dans toutes les 8 régions du Mali' },
  { year: '2024', event: '15e anniversaire — Plus de 5 000 bénéficiaires directs et 120 projets réalisés' },
];

const VALUES = [
  { icon: Heart, title: 'Solidarité', desc: 'Nous croyons en la force du collectif et en l\'entraide comme moteur du développement.' },
  { icon: Eye, title: 'Transparence', desc: 'Nous rendons compte de chaque action à nos donateurs, membres et bénéficiaires.' },
  { icon: Award, title: 'Excellence', desc: 'Nous visons l\'impact maximal avec des projets rigoureux et mesurables.' },
  { icon: Users, title: 'Participation', desc: 'Les communautés sont co-conceptrices de leurs propres solutions de développement.' },
];

function PageHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#1B6B2F] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/8613319/pexels-photo-8613319.jpeg?auto=compress&cs=tinysrgb&w=1920')` }} />
      <div className="tricolor-border-thick absolute bottom-0 left-0 right-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="badge bg-white/20 text-white mb-4">Notre histoire</span>
        <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl mb-4">À Propos d'ASAVEC</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Une association fondée sur l'amour du Mali et l'engagement pour le développement durable de ses communautés.
        </p>
      </div>
    </section>
  );
}

function MissionVision() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className={`p-8 bg-green-50 rounded-2xl border border-green-100 ${inView ? 'animate-slide-right' : 'opacity-0'}`}>
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-5">
              <Target size={24} className="text-white" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-gray-900 mb-3">Notre Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              ASAVEC-Mali a pour mission de promouvoir le développement durable, la solidarité et l'action humanitaire en faveur des communautés maliennes les plus vulnérables, à travers des programmes intégrés en santé, environnement, éducation et renforcement économique.
            </p>
          </div>
          <div className={`p-8 bg-amber-50 rounded-2xl border border-amber-100 ${inView ? 'animate-slide-left' : 'opacity-0'}`}>
            <div className="w-12 h-12 bg-[#F5A623] rounded-xl flex items-center justify-center mb-5">
              <Eye size={24} className="text-white" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-gray-900 mb-3">Notre Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Un Mali où chaque citoyen, quelle que soit sa région ou sa condition, a accès à un environnement sain, à l'eau potable, aux soins de santé de qualité et aux opportunités économiques pour vivre dignement.
            </p>
          </div>
        </div>

        {/* Values */}
        <h2 className="font-serif font-bold text-3xl text-gray-900 text-center mb-10">Nos Valeurs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className={`text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 card-hover ${inView ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-serif font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="badge bg-green-100 text-green-700 mb-3">Notre parcours</span>
          <h2 className="font-serif font-bold text-4xl text-gray-900">15 ans d'engagement</h2>
        </div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200" />
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className={`flex gap-6 ${inView ? 'animate-slide-right' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-[#1B6B2F] rounded-full flex items-center justify-center z-10 text-white font-bold text-xs text-center leading-tight">
                  {item.year}
                </div>
                <div className="flex-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center">
                  <p className="text-gray-700 text-sm leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="badge bg-green-100 text-green-700 mb-3">L'équipe dirigeante</span>
          <h2 className="font-serif font-bold text-4xl text-gray-900 mb-4">Nos leaders engagés</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Des hommes et femmes passionnés au service du développement durable du Mali.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <div
              key={member.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover text-center group
                ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="img-zoom h-56">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors">{member.name}</h3>
                <p className="text-[#F5A623] text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactNumbers() {
  return (
    <section className="py-16 bg-[#1B6B2F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 5000, suffix: '+', label: 'Bénéficiaires directs' },
            { value: 120, suffix: '+', label: 'Projets réalisés' },
            { value: 8, suffix: '', label: 'Régions couvertes' },
            { value: 200, suffix: '+', label: 'Bénévoles actifs' },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-serif font-bold text-4xl text-[#F5A623] mb-2">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/80 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main>
      <PageHero />
      <MissionVision />
      <ImpactNumbers />
      <Timeline />
      <TeamSection />
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif font-bold text-3xl text-gray-900 mb-4">Envie de nous rejoindre ?</h2>
          <p className="text-gray-500 mb-8">Que vous souhaitiez adhérer, faire un don ou devenir bénévole, votre engagement compte.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/adhesion" className="btn-primary">Adhérer à ASAVEC <ArrowRight size={16} /></Link>
            <Link to="/don" className="btn-gold"><Heart size={16} /> Faire un don</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

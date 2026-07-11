import { Link } from 'react-router-dom';
import {
  ArrowRight, Leaf, Heart, BookOpen, Droplets, Sprout, Users,
  MapPin, Calendar, ChevronRight, Play, Quote, Star
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import { useInView } from '../hooks/useInView';
import { STATS, DOMAINS, PROJECTS, NEWS, EVENTS, PARTNERS, TEAM, CATEGORY_COLORS } from '../data';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Leaf, Heart, BookOpen, Droplets, Sprout, Users,
};

function SectionHeader({ label, title, subtitle, centered = false }: {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <span className="badge bg-green-100 text-green-700 mb-3">{label}</span>
      <h2 className={`section-title text-gray-900 mb-4 gold-underline ${centered ? 'inline-block' : ''}`}>{title}</h2>
      {subtitle && <p className={`section-subtitle mt-6 ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>{subtitle}</p>}
    </div>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg?auto=compress&cs=tinysrgb&w=1920')` }}
      />
      <div className="hero-overlay absolute inset-0" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        {/* Mali flag pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
          <div className="flex h-4 rounded-sm overflow-hidden w-8">
            <div className="flex-1 bg-[#1B6B2F]" />
            <div className="flex-1 bg-[#F5A623]" />
            <div className="flex-1 bg-[#CE1126]" />
          </div>
          <span className="text-white text-sm font-medium">République du Mali</span>
        </div>

        <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6">
          ASAVEC-Mali
        </h1>
        <p className="text-white/90 text-lg sm:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-4">
          Association de la Santé et de la Verdure au Cœur du Développement Durable
        </p>
        <p className="text-[#F5A623] text-base sm:text-lg font-medium mb-10 italic font-serif">
          "Ensemble pour un Mali vert, sain et prospère"
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link to="/projets" className="btn-gold text-base px-8 py-4">
            Découvrir nos projets
            <ArrowRight size={18} />
          </Link>
          <Link to="/don" className="btn-outline-white text-base px-8 py-4">
            <Heart size={18} />
            Soutenir notre cause
          </Link>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-center">
              <div className="font-serif font-bold text-3xl text-[#F5A623] mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/80 text-xs font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-gentle">
        <span className="text-white/60 text-xs">Défiler</span>
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Domains section
function Domains() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Nos Domaines d'Action"
          title="Une approche intégrée du développement"
          subtitle="ASAVEC-Mali intervient sur 6 domaines complémentaires pour un impact durable au sein des communautés maliennes."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOMAINS.map((domain, i) => {
            const Icon = ICON_MAP[domain.icon] || Leaf;
            return (
              <div
                key={domain.id}
                className={`card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group
                  ${inView ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="img-zoom h-44">
                  <img src={domain.image} alt={domain.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className={`w-10 h-10 ${domain.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors">{domain.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{domain.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// About preview
function AboutPreview() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Images collage */}
          <div className={`relative ${inView ? 'animate-slide-right' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="img-zoom rounded-2xl overflow-hidden h-52">
                  <img src="https://images.pexels.com/photos/6647036/pexels-photo-6647036.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Santé" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="img-zoom rounded-2xl overflow-hidden h-36">
                  <img src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Eau" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="img-zoom rounded-2xl overflow-hidden h-36">
                  <img src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Education" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="img-zoom rounded-2xl overflow-hidden h-52">
                  <img src="https://images.pexels.com/photos/1459330/pexels-photo-1459330.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Agriculture" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
            {/* Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#1B6B2F] text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold whitespace-nowrap">
              15+ ans au service du Mali
            </div>
          </div>

          {/* Content */}
          <div className={`${inView ? 'animate-slide-left' : 'opacity-0'}`}>
            <SectionHeader
              label="À Propos d'ASAVEC"
              title="Une association enracinée dans les valeurs maliennes"
              subtitle="Fondée à Bamako, ASAVEC-Mali est une organisation à but non lucratif dédiée à l'amélioration des conditions de vie des populations maliennes à travers des programmes durables et participatifs."
            />
            <div className="space-y-4 mb-8">
              {[
                { icon: '🎯', text: "Notre vision : un Mali où chaque citoyen jouit d'un environnement sain et d'un accès équitable aux ressources essentielles." },
                { icon: '💡', text: "Notre approche : co-construire avec les communautés des solutions adaptées à leurs réalités locales." },
                { icon: '🤝', text: "Notre force : un réseau de bénévoles passionnés, de partenaires engagés et de donateurs solidaires." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <Link to="/a-propos" className="btn-primary">
              En savoir plus sur ASAVEC
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Projects preview
function ProjectsPreview() {
  const { ref, inView } = useInView();
  const featured = PROJECTS.slice(0, 3);
  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <SectionHeader
            label="Nos Projets"
            title="Des actions concrètes sur le terrain"
            subtitle="Chaque projet représente une promesse tenue envers les communautés que nous servons."
          />
          <Link to="/projets" className="btn-outline whitespace-nowrap shrink-0">
            Tous les projets
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <div
              key={project.id}
              className={`card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100
                ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="img-zoom h-48">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`badge ${CATEGORY_COLORS[project.category] || 'bg-gray-100 text-gray-600'}`}>
                    {project.category}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    project.status === 'Réalisé' ? 'bg-green-100 text-green-700' :
                    project.status === 'En cours' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{project.status}</span>
                </div>
                <h3 className="font-serif font-bold text-gray-900 text-lg mb-2 leading-tight">{project.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                  <MapPin size={12} />
                  {project.location}
                </div>
                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Avancement</span>
                    <span className="font-semibold text-green-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-[#1B6B2F] h-2 rounded-full progress-bar transition-all duration-1000"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">{project.beneficiaries.toLocaleString('fr-FR')}</span> bénéficiaires
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// News preview
function NewsPreview() {
  const { ref, inView } = useInView();
  const featured = NEWS.slice(0, 3);
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <SectionHeader
            label="Actualités"
            title="Nos dernières nouvelles"
            subtitle="Suivez nos actions et restez informé des avancées de nos projets."
          />
          <Link to="/actualites" className="btn-outline whitespace-nowrap shrink-0">
            Toutes les actualités
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((article, i) => (
            <article
              key={article.id}
              className={`card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group
                ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="img-zoom h-48">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`badge ${CATEGORY_COLORS[article.category] || 'bg-gray-100 text-gray-600'}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime} lecture</span>
                </div>
                <h3 className="font-serif font-bold text-gray-900 text-lg mb-2 leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={12} />{article.date}</span>
                  <span>{article.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Events preview
function EventsPreview() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-20 bg-[#1B6B2F]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <SectionHeader
            label="Événements"
            title="Rejoignez-nous sur le terrain"
            subtitle="Participez à nos prochains événements et actions communautaires."
          />
          <Link to="/evenements" className="btn-outline whitespace-nowrap shrink-0">
            Tous les événements
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS.map((event, i) => (
            <div
              key={event.id}
              className={`card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row
                ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="img-zoom w-full sm:w-44 h-44 sm:h-auto shrink-0">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <span className={`badge ${CATEGORY_COLORS[event.category] || 'bg-gray-100 text-gray-600'} mb-2`}>
                    {event.category}
                  </span>
                  <h3 className="font-serif font-bold text-gray-900 text-base leading-tight mb-3">{event.title}</h3>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5"><Calendar size={11} />{event.date} — {event.time}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={11} />{event.location}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span>Places disponibles</span>
                    <span className="font-semibold">{event.seats - event.registered} / {event.seats}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                    <div
                      className="bg-[#1B6B2F] h-1.5 rounded-full"
                      style={{ width: `${(event.registered / event.seats) * 100}%` }}
                    />
                  </div>
                  <Link to="/evenements" className="btn-primary text-xs py-2 px-4">
                    S'inscrire
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial / Quote
function Testimonial() {
  return (
    <section className="py-20 bg-[#1B6B2F] relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg?auto=compress&cs=tinysrgb&w=1920')` }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Quote size={48} className="text-[#F5A623] mx-auto mb-6 opacity-60" />
        <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-medium leading-relaxed mb-8">
          "Nous croyons en un Mali où chaque enfant grandira dans un environnement sain, chaque famille aura accès à l'eau potable, et chaque communauté sera actrice de son propre développement."
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <img
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Moussa Diarra"
            className="w-12 h-12 rounded-full object-cover border-2 border-[#F5A623]"
          />
          <div className="text-left">
            <div className="text-white font-semibold">Moussa Diarra</div>
            <div className="text-white/70 text-sm">Président Fondateur, ASAVEC-Mali</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Partners carousel
function Partners() {
  const allPartners = [...PARTNERS, ...PARTNERS];
  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">
          Nos partenaires de confiance
        </p>
        <div className="overflow-hidden relative">
          <div className="partners-track">
            {allPartners.map((p, i) => (
              <div key={`${p.id}-${i}`} className="flex-shrink-0 mx-8 flex items-center justify-center w-40">
                <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-gray-600 text-sm font-semibold text-center whitespace-nowrap hover:border-green-200 hover:text-green-700 transition-colors">
                  {p.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA section
function CTA() {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/8613319/pexels-photo-8613319.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="badge bg-[#F5A623]/20 text-[#F5A623] mb-4">Agir maintenant</span>
        <h2 className="font-serif font-bold text-white text-4xl sm:text-5xl mb-6">
          Ensemble, changeons les choses
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Votre soutien, qu'il soit financier ou bénévole, fait une différence concrète dans la vie des communautés maliennes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/don" className="btn-gold text-base px-8 py-4">
            <Heart size={18} />
            Faire un don
          </Link>
          <Link to="/adhesion" className="btn-outline-white text-base px-8 py-4">
            Devenir membre
            <ArrowRight size={18} />
          </Link>
          <Link to="/contact" className="btn-outline-white text-base px-8 py-4">
            Devenir bénévole
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Domains />
      <AboutPreview />
      <ProjectsPreview />
      <Testimonial />
      <NewsPreview />
      <EventsPreview />
      <Partners />
      <CTA />
    </main>
  );
}

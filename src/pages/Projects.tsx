import { useState } from 'react';
import { MapPin, Users, TrendingUp, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS, CATEGORY_COLORS } from '../data';
import { useInView } from '../hooks/useInView';

const CATEGORIES = ['Tous', 'Environnement', 'Santé', 'Eau', 'Éducation', 'Agriculture', 'Jeunesse'];
const STATUSES = ['Tous', 'Réalisé', 'En cours', 'Planifié'];

function PageHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#155425] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg?auto=compress&cs=tinysrgb&w=1920')` }} />
      <div className="tricolor-border-thick absolute bottom-0 left-0 right-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="badge bg-white/20 text-white mb-4">Nos interventions</span>
        <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl mb-4">Nos Projets</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Des actions concrètes sur le terrain dans toutes les régions du Mali.
        </p>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100
        ${inView ? 'animate-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="img-zoom h-52">
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
        <h3 className="font-serif font-bold text-gray-900 text-xl mb-2 leading-tight">{project.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5"><MapPin size={12} />{project.location}</div>
          <div className="flex items-center gap-1.5"><Users size={12} />{project.beneficiaries.toLocaleString('fr-FR')} bénéf.</div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span className="flex items-center gap-1"><TrendingUp size={11} />Avancement</span>
            <span className="font-semibold text-green-600">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-[#1B6B2F] h-2 rounded-full progress-bar"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">Budget : <span className="font-semibold text-gray-600">{project.budget}</span></div>
          <button className="text-green-600 text-xs font-semibold hover:underline flex items-center gap-1">
            Détails <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [category, setCategory] = useState('Tous');
  const [status, setStatus] = useState('Tous');
  const [search, setSearch] = useState('');

  const filtered = PROJECTS.filter(p => {
    const matchCat = category === 'Tous' || p.category === category;
    const matchStatus = status === 'Tous' || p.status === status;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  return (
    <main>
      <PageHero />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm"
                />
              </div>
              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                      category === cat
                        ? 'bg-[#1B6B2F] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {/* Status filter */}
              <div className="flex flex-wrap gap-2">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                      status === s
                        ? 'bg-[#F5A623] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search size={40} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">Aucun projet trouvé</p>
              <p className="text-sm">Essayez d'autres filtres</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} delay={i * 0.1} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#1B6B2F]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif font-bold text-white text-3xl mb-4">Soutenez nos projets</h2>
          <p className="text-white/80 mb-6">Votre don finance directement les projets sur le terrain.</p>
          <Link to="/don" className="btn-gold">
            Faire un don
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

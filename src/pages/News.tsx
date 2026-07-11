import { useState } from 'react';
import { Calendar, User, Clock, Search, Tag, ArrowRight } from 'lucide-react';
import { NEWS, CATEGORY_COLORS } from '../data';
import { useInView } from '../hooks/useInView';

const CATEGORIES = ['Tous', 'Environnement', 'Santé', 'Éducation', 'Eau', 'Partenariat', 'Bénévolat'];

function PageHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#1B6B2F] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920')` }} />
      <div className="tricolor-border-thick absolute bottom-0 left-0 right-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="badge bg-white/20 text-white mb-4">Blog & Actualités</span>
        <h1 className="font-serif font-bold text-white text-5xl sm:text-6xl mb-4">Actualités</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Suivez nos actions, découvrez nos histoires de terrain et restez informé.
        </p>
      </div>
    </section>
  );
}

function ArticleCard({ article, featured = false }: { article: typeof NEWS[0]; featured?: boolean }) {
  const { ref, inView } = useInView();
  if (featured) {
    return (
      <article ref={ref} className={`card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 md:flex ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className="img-zoom md:w-2/5 h-56 md:h-auto">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="p-8 flex flex-col justify-between md:w-3/5">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge ${CATEGORY_COLORS[article.category] || 'bg-gray-100 text-gray-600'}`}>{article.category}</span>
              <span className="badge bg-[#F5A623]/10 text-[#F5A623]">À la une</span>
            </div>
            <h2 className="font-serif font-bold text-2xl text-gray-900 mb-3 leading-tight">{article.title}</h2>
            <p className="text-gray-500 leading-relaxed mb-5">{article.excerpt}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Calendar size={12} />{article.date}</span>
              <span className="flex items-center gap-1"><User size={12} />{article.author}</span>
              <span className="flex items-center gap-1"><Clock size={12} />{article.readTime}</span>
            </div>
            <button className="text-green-600 text-sm font-semibold hover:underline flex items-center gap-1">
              Lire <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article ref={ref} className={`card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
      <div className="img-zoom h-48">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`badge ${CATEGORY_COLORS[article.category] || 'bg-gray-100 text-gray-600'}`}>{article.category}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
        </div>
        <h3 className="font-serif font-bold text-gray-900 text-lg mb-2 leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1"><Calendar size={11} />{article.date}</span>
          <span className="flex items-center gap-1"><User size={11} />{article.author}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {article.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function News() {
  const [category, setCategory] = useState('Tous');
  const [search, setSearch] = useState('');

  const filtered = NEWS.filter(a => {
    const matchCat = category === 'Tous' || a.category === category;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main>
      <PageHero />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                    category === cat ? 'bg-[#1B6B2F] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search size={40} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">Aucun article trouvé</p>
            </div>
          ) : (
            <div className="space-y-8">
              {featured && <ArticleCard article={featured} featured />}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {rest.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

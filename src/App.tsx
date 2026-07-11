import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Membership from './pages/Membership';

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <div className="text-center px-4">
        <div className="text-8xl font-serif font-bold text-gray-200 mb-4">404</div>
        <h1 className="font-serif font-bold text-3xl text-gray-900 mb-3">Page introuvable</h1>
        <p className="text-gray-500 mb-8">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <a href="/" className="btn-primary">Retour à l'accueil</a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/actualites" element={<News />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/evenements" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/don" element={<Donate />} />
            <Route path="/adhesion" element={<Membership />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

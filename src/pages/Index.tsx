
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui-components/Button';
import Navbar from '@/components/Navbar';
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  MessageCircle, 
  Shield, 
  Globe,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-5">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                  Simplifiez la gestion de vos <span className="text-primary">associations</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Corel est une plateforme collaborative qui permet aux associations de gérer leurs membres, 
                  événements et projets en toute simplicité.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                  <Button size="lg">
                    {isAuthenticated ? "Accéder à mon espace" : "Commencer gratuitement"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    En savoir plus
                  </Button>
                </Link>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Déjà utilisé par plus de <span className="font-medium">1000+</span> associations en France
                </p>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Corel collaboration platform"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent mix-blend-overlay"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg animate-float">
                <Users className="h-6 w-6 text-primary" />
                <span className="block mt-1 text-sm font-medium">120 membres</span>
              </div>
              
              <div className="absolute top-10 -right-6 bg-white p-4 rounded-lg shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <Calendar className="h-6 w-6 text-primary" />
                <span className="block mt-1 text-sm font-medium">8 événements</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 opacity-50 lg:opacity-100">
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="beehive-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="rgba(79, 70, 229, 0.1)" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#beehive-pattern)" />
          </svg>
        </div>
        
        <div className="absolute bottom-0 left-0 opacity-50 lg:opacity-100">
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="circle-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="rgba(79, 70, 229, 0.1)" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#circle-pattern)" />
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Tout ce dont votre association a besoin
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Nous avons conçu Corel pour répondre aux besoins spécifiques des associations et groupes collaboratifs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gestion des membres</h3>
              <p className="text-gray-600">
                Gérez facilement vos membres, définissez des rôles et des permissions spécifiques.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Événements et billetterie</h3>
              <p className="text-gray-600">
                Créez et gérez des événements avec billetterie intégrée, gratuits ou payants.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Projets collaboratifs</h3>
              <p className="text-gray-600">
                Lancez des projets, suivez leur avancement et gérez les tâches au sein de votre groupe.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Communication interne</h3>
              <p className="text-gray-600">
                Échangez facilement avec vos membres via messagerie interne et notifications.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sécurité et confidentialité</h3>
              <p className="text-gray-600">
                Protégez les données de votre association avec des contrôles d'accès précis.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accessibilité</h3>
              <p className="text-gray-600">
                Accédez à votre espace depuis n'importe quel appareil, à tout moment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à améliorer la gestion de votre association ?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Rejoignez des milliers d'associations qui ont déjà simplifié leur quotidien avec Corel.
          </p>
          <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100"
            >
              {isAuthenticated ? "Accéder à mon espace" : "Commencer gratuitement"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-lg font-bold">Corel</span>
              </div>
              <p className="text-gray-600 text-sm">
                La plateforme de gestion pour les associations et groupes collaboratifs.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Produit</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Fonctionnalités</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Tarifs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Tutoriels</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Sales</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary text-sm">À propos</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} Corel. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

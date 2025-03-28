
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  ChevronsRight,
  Users,
  Calendar,
  FileText,
  ArrowRight,
  Building,
  Puzzle,
  Heart,
  Mail,
  MessageSquare,
  Shield,
  Globe,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 to-primary pt-24 pb-32 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center md:text-left md:items-start">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
              Gérez vos communautés <br className="hidden md:block" />
              avec <span className="text-white">Corel</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              La plateforme tout-en-un pour créer, gérer et développer vos associations 
              et groupements collaboratifs en toute simplicité.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Link to="/dashboard">Accéder à mon tableau de bord</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    <Link to="/associations">Gérer mes associations</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Link to="/signup">Créer un compte</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    <Link to="/login">Se connecter</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 opacity-10 hidden md:block">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <path fill="currentColor" d="M54,-75.2C71.2,-67.3,87.3,-55.5,94.8,-39.5C102.3,-23.5,101.3,-3.2,95.9,15.2C90.6,33.6,80.9,50.2,67.1,63.1C53.2,76,35.3,85.2,16.6,88.1C-2.1,91,-21.6,87.5,-38.3,79.3C-55,71.1,-68.8,58,-77.5,42.1C-86.2,26.2,-89.8,7.5,-87.4,-10.3C-85,-28.1,-76.5,-45,-64,-57.9C-51.5,-70.8,-34.8,-79.7,-17.6,-81.9C-0.4,-84.1,17.4,-79.4,34.1,-75.9C50.9,-72.5,66.6,-70.3,54,-75.2Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tout ce dont vous avez besoin pour votre communauté</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Une solution complète pour gérer tous les aspects de votre association ou collectif
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Gestion des membres</h3>
                  <p className="text-muted-foreground mb-4">
                    Gérez facilement les adhésions, les cotisations et les communications avec les membres de votre association.
                  </p>
                  <Link to={isAuthenticated ? "/associations" : "/signup"} className="text-primary hover:underline font-medium flex items-center">
                    En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Événements & activités</h3>
                  <p className="text-muted-foreground mb-4">
                    Planifiez, organisez et gérez vos événements avec billetterie, inscriptions et rappels automatiques.
                  </p>
                  <Link to={isAuthenticated ? "/events" : "/signup"} className="text-primary hover:underline font-medium flex items-center">
                    En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Projets collaboratifs</h3>
                  <p className="text-muted-foreground mb-4">
                    Lancez des projets, suivez leur avancement et collaborez efficacement avec tous les membres impliqués.
                  </p>
                  <Link to={isAuthenticated ? "/projects" : "/signup"} className="text-primary hover:underline font-medium flex items-center">
                    En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Communications</h3>
                  <p className="text-muted-foreground mb-4">
                    Gardez tous vos membres informés grâce aux outils de communication intégrés : messages, notifications et emails.
                  </p>
                  <Link to={isAuthenticated ? "/dashboard" : "/signup"} className="text-primary hover:underline font-medium flex items-center">
                    En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Building className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Administration simplifiée</h3>
                  <p className="text-muted-foreground mb-4">
                    Simplifiez la gestion administrative de votre association avec des outils adaptés à vos besoins.
                  </p>
                  <Link to={isAuthenticated ? "/dashboard" : "/signup"} className="text-primary hover:underline font-medium flex items-center">
                    En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Puzzle className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Formulaires personnalisés</h3>
                  <p className="text-muted-foreground mb-4">
                    Créez des formulaires d'inscription et de feedback sur mesure avec notre éditeur de formulaires intuitif.
                  </p>
                  <Link to={isAuthenticated ? "/form-builder" : "/signup"} className="text-primary hover:underline font-medium flex items-center">
                    En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pourquoi choisir Corel pour votre association ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Conçu spécifiquement pour les associations et collectifs, Corel offre des fonctionnalités adaptées à vos besoins spécifiques.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Simple et intuitif</h4>
                    <p className="text-muted-foreground">Interface claire et facile à prendre en main, même pour les non-initiés.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Solution tout-en-un</h4>
                    <p className="text-muted-foreground">Tous les outils nécessaires au sein d'une seule plateforme intégrée.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Accompagnement personnalisé</h4>
                    <p className="text-muted-foreground">Une équipe dédiée pour vous aider à tirer le meilleur parti de notre plateforme.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Sécurité et confidentialité</h4>
                    <p className="text-muted-foreground">Protection des données de vos membres et de votre association.</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8">
                <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                  <Button size="lg" className="flex items-center">
                    Commencer maintenant
                    <ChevronsRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80" 
                  alt="Équipe travaillant ensemble" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold">+2000</p>
                    <p className="text-sm text-muted-foreground">Associations satisfaites</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Types d'associations Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pour tous types d'associations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Corel s'adapte à tous les types d'associations et collectifs, quels que soient leur taille et leur domaine
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Associations de quartier</h3>
              <p className="text-sm text-muted-foreground">Fédérez les habitants et améliorez la vie locale</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Puzzle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Clubs sportifs</h3>
              <p className="text-sm text-muted-foreground">Gérez adhérents, compétitions et équipements</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Associations caritatives</h3>
              <p className="text-sm text-muted-foreground">Organisez vos actions solidaires et collectes</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">ONG</h3>
              <p className="text-sm text-muted-foreground">Coordonnez vos projets internationaux</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Associations culturelles</h3>
              <p className="text-sm text-muted-foreground">Promouvez les arts et la culture</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Associations de parents</h3>
              <p className="text-sm text-muted-foreground">Organisez des activités pour les enfants</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Associations d'étudiants</h3>
              <p className="text-sm text-muted-foreground">Dynamisez la vie étudiante</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Et bien plus encore...</h3>
              <p className="text-sm text-muted-foreground">Adapté à tous les types de projets collectifs</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à simplifier la gestion de votre association ?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Rejoignez les milliers d'associations qui font confiance à Corel pour gérer leurs activités et leur communauté.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                Commencer gratuitement
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">
                Demander une démo
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">C</span>
                </div>
                <span className="text-xl font-bold">Corel</span>
              </div>
              <p className="text-gray-400 mb-4">
                La plateforme de gestion complète pour associations et collectifs
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Produit</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Fonctionnalités</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tarifs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Témoignages</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Guide d'utilisation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">À propos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Carrières</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Partenaires</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Mail className="h-5 w-5 mr-2" />
                  contact@corel-app.com
                </li>
                <li><a href="#" className="text-gray-400 hover:text-white">Assistance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Démo</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2023 Corel. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Conditions d'utilisation</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

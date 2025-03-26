
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Bienvenue sur Corel
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-10">
          La plateforme de gestion pour vos associations et groupements collaboratifs.
          Créez, gérez et développez vos communautés en toute simplicité.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          {isAuthenticated ? (
            <>
              <Button asChild size="lg">
                <Link to="/dashboard">Accéder à mon tableau de bord</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/associations">Gérer mes associations</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild size="lg">
                <Link to="/signup">Créer un compte</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Se connecter</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Fonctionnalités principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Gestion des associations</h3>
              <p className="text-muted-foreground mb-4">
                Créez et gérez vos associations, définissez des rôles et permissions.
              </p>
              <Link to={isAuthenticated ? "/associations" : "/signup"} className="text-primary hover:underline">
                En savoir plus →
              </Link>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Organisation d'événements</h3>
              <p className="text-muted-foreground mb-4">
                Planifiez, organisez et gérez vos événements avec billetterie intégrée.
              </p>
              <Link to={isAuthenticated ? "/events" : "/signup"} className="text-primary hover:underline">
                En savoir plus →
              </Link>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Projets collaboratifs</h3>
              <p className="text-muted-foreground mb-4">
                Lancez des projets, suivez leur avancement et collaborez efficacement.
              </p>
              <Link to={isAuthenticated ? "/projects" : "/signup"} className="text-primary hover:underline">
                En savoir plus →
              </Link>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <h3 className="text-xl font-semibold mb-4">Nouveau: Formulaires personnalisés</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Créez des formulaires d'inscription sur mesure pour vos associations avec notre nouvel éditeur drag & drop.
            </p>
            <Button asChild>
              <Link to={isAuthenticated ? "/form-builder" : "/signup"}>
                Essayer l'éditeur de formulaires
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

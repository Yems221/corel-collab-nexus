
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui-components/Button';
import { useToast } from '@/components/ui/use-toast';

type FormMode = 'login' | 'signup';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<FormMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
    // Reset form
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (mode === 'login') {
        await login(email, password);
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur Corel !",
        });
      } else {
        await signup(name, email, password);
        toast({
          title: "Compte créé avec succès",
          description: "Bienvenue sur Corel !",
        });
      }
    } catch (error) {
      toast({
        title: "Une erreur est survenue",
        description: "Veuillez réessayer ultérieurement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'Connexion' : 'Créer un compte'}
          </h2>
          <p className="text-muted-foreground">
            {mode === 'login' 
              ? 'Connectez-vous pour accéder à votre espace' 
              : 'Rejoignez la communauté Corel dès maintenant'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          
          {mode === 'login' && (
            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
          )}
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            disabled={isSubmitting}
            className="mt-6"
          >
            {isSubmitting ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'Créer un compte'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {mode === 'login' ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
            <button 
              type="button"
              onClick={toggleMode}
              className="ml-1 text-primary hover:underline focus:outline-none"
            >
              {mode === 'login' ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

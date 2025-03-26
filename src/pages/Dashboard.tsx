
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  Bell, 
  Plus,
  ArrowUpRight,
  CheckCircle,
  Clock
} from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import AssociationCard from '@/components/AssociationCard';
import EventCard from '@/components/EventCard';
import ProjectCard from '@/components/ProjectCard';

// Mock data
const mockAssociations = [
  {
    id: '1',
    name: 'Association des Riverains du Quartier Saint-Michel',
    description: 'Groupe de résidents visant à améliorer la qualité de vie dans le quartier Saint-Michel.',
    category: 'Association de quartier',
    memberCount: 32,
    eventsCount: 2,
    createdAt: '2023-04-15',
  },
  {
    id: '2',
    name: 'Coopérative Immobilière Les Cèdres',
    description: 'Coopérative immobilière gérant la résidence Les Cèdres et ses espaces communs.',
    category: 'Coopérative immobilière',
    memberCount: 57,
    eventsCount: 1,
    createdAt: '2022-09-03',
  },
];

const mockEvents = [
  {
    id: '1',
    title: 'Assemblée Générale Annuelle',
    description: 'Réunion annuelle des membres pour faire le bilan et voter les décisions importantes.',
    date: '2023-06-12T18:30:00',
    location: 'Salle polyvalente du quartier',
    attendees: 28,
    maxAttendees: 50,
    isPaid: false,
    associationName: 'Association des Riverains',
    associationId: '1',
  },
  {
    id: '2',
    title: 'Atelier Jardinage Collectif',
    description: 'Venez participer à l\'entretien des espaces verts communs de notre résidence.',
    date: '2023-05-27T10:00:00',
    location: 'Jardin communautaire Les Cèdres',
    attendees: 12,
    maxAttendees: 15,
    isPaid: false,
    associationName: 'Coopérative Les Cèdres',
    associationId: '2',
  },
];

const mockProjects = [
  {
    id: '1',
    title: 'Rénovation de l\'aire de jeux',
    description: 'Projet de rénovation de l\'aire de jeux du quartier pour les enfants.',
    status: 'in_progress' as const,
    progress: 45,
    startDate: '2023-04-01',
    endDate: '2023-07-15',
    memberCount: 8,
    tasksCompleted: 7,
    totalTasks: 15,
    associationName: 'Association des Riverains',
    associationId: '1',
    groupName: 'Comité Aménagement',
    groupId: '1',
  },
  {
    id: '2',
    title: 'Organisation de la fête des voisins',
    description: 'Préparation de la fête des voisins annuelle de notre coopérative.',
    status: 'not_started' as const,
    progress: 0,
    startDate: '2023-05-01',
    endDate: '2023-06-30',
    memberCount: 5,
    tasksCompleted: 0,
    totalTasks: 10,
    associationName: 'Coopérative Les Cèdres',
    associationId: '2',
    groupName: 'Équipe Animation',
    groupId: '2',
  },
];

const mockStats = {
  totalAssociations: 2,
  upcomingEvents: 2,
  activeProjects: 2,
  pendingTasks: 8,
};

const mockActivity = [
  {
    id: '1',
    type: 'event_created',
    content: 'A créé un nouvel événement "Assemblée Générale"',
    user: 'Sophie Martin',
    date: '2023-05-18T14:32:00',
    association: 'Association des Riverains',
  },
  {
    id: '2',
    type: 'task_completed',
    content: 'A terminé la tâche "Obtenir des devis pour le matériel"',
    user: 'Thomas Dubois',
    date: '2023-05-17T11:15:00',
    association: 'Association des Riverains',
  },
  {
    id: '3',
    type: 'member_joined',
    content: 'A rejoint l\'association',
    user: 'Julie Lefebvre',
    date: '2023-05-16T09:45:00',
    association: 'Coopérative Les Cèdres',
  },
  {
    id: '4',
    type: 'project_created',
    content: 'A créé un nouveau projet "Organisation de la fête des voisins"',
    user: 'Alexandre Bernard',
    date: '2023-05-15T16:20:00',
    association: 'Coopérative Les Cèdres',
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {user?.name} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Voici ce qu'il se passe dans vos associations aujourd'hui
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Associations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-primary" />
                <div className="text-2xl font-bold">{mockStats.totalAssociations}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Événements à venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-primary" />
                <div className="text-2xl font-bold">{mockStats.upcomingEvents}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Projets actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-primary" />
                <div className="text-2xl font-bold">{mockStats.activeProjects}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tâches en attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-primary" />
                <div className="text-2xl font-bold">{mockStats.pendingTasks}</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Associations */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Vos associations
            </h2>
            <Link to="/associations">
              <Button variant="outline" size="sm">
                Voir tout
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAssociations.map(association => (
              <AssociationCard key={association.id} {...association} />
            ))}
            
            <Link to="/create-association" className="block h-full">
              <div className="h-full border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-colors">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="font-medium text-lg mb-2">Créer une association</h3>
                <p className="text-muted-foreground text-sm">
                  Fondez votre propre structure pour gérer vos activités
                </p>
              </div>
            </Link>
          </div>
        </section>
        
        {/* Events */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Événements à venir
            </h2>
            <Link to="/events">
              <Button variant="outline" size="sm">
                Voir tout
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>
        
        {/* Projects */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Projets en cours
            </h2>
            <Link to="/projects">
              <Button variant="outline" size="sm">
                Voir tout
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockProjects.map(project => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </section>
        
        {/* Recent Activity */}
        <section className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Activité récente
            </h2>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-200">
                {mockActivity.map(activity => (
                  <li key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">
                          <span className="font-bold">{activity.user}</span> {activity.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(activity.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {' '}· {activity.association}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          activity.type === 'event_created' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                          activity.type === 'task_completed' ? 'bg-green-50 text-green-600 border-green-200' :
                          activity.type === 'member_joined' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                          'bg-orange-50 text-orange-600 border-orange-200'
                        }
                      >
                        {activity.type === 'event_created' ? 'Événement' :
                         activity.type === 'task_completed' ? 'Tâche' :
                         activity.type === 'member_joined' ? 'Membre' :
                         'Projet'}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

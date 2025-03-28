
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Building,
  Users,
  FileEdit,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  BarChart,
  ListTodo,
  ClipboardList,
  Plus,
} from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';

// Mock data
const mockProject = {
  id: '1',
  name: 'Rénovation de la place centrale',
  description: 'Projet de rénovation de la place centrale du quartier Saint-Michel pour en faire un espace plus convivial et plus vert. Nous prévoyons d\'installer de nouveaux bancs, de planter des arbres et d\'améliorer l\'éclairage pour rendre l\'espace plus accueillant en soirée.',
  status: 'in-progress', // planned, in-progress, completed, on-hold
  progress: 60,
  startDate: '2023-06-15',
  endDate: '2023-11-30',
  association: {
    id: '1',
    name: 'Association des Riverains du Quartier Saint-Michel',
    logo: null,
  },
  members: [
    { id: '1', name: 'Marie Dupont', role: 'Chef de projet', avatar: null },
    { id: '2', name: 'Jean Martin', role: 'Trésorier', avatar: null },
    { id: '3', name: 'Sophie Lefebvre', role: 'Bénévole', avatar: null },
  ],
  tasks: [
    { id: '1', title: 'Demande de permis', status: 'completed', assignee: 'Marie Dupont' },
    { id: '2', title: 'Achat des bancs', status: 'completed', assignee: 'Jean Martin' },
    { id: '3', title: 'Plantation des arbres', status: 'in-progress', assignee: 'Sophie Lefebvre' },
    { id: '4', title: 'Installation de l\'éclairage', status: 'planned', assignee: null },
  ],
  updates: [
    { id: '1', date: '2023-09-15', message: 'Les bancs ont été installés avec succès.', author: 'Jean Martin' },
    { id: '2', date: '2023-08-30', message: 'Permis accordé par la mairie, début des travaux prévu pour la semaine prochaine.', author: 'Marie Dupont' },
  ],
  imageUrl: 'https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
  tags: ['urbanisme', 'environnement', 'espace public'],
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const { addNotification } = useNotifications();
  
  // In a real application, you would fetch the project data based on the ID
  // For now, we'll use the mock data
  const project = mockProject;
  
  const handleSendUpdate = () => {
    addNotification({
      title: "Mise à jour du projet",
      message: `Votre mise à jour pour le projet "${project.name}" a été envoyée`,
      type: "success",
      category: "projects",
      link: `/projects/${project.id}`,
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planned':
        return (
          <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Planifié
          </span>
        );
      case 'in-progress':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            En cours
          </span>
        );
      case 'completed':
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Terminé
          </span>
        );
      case 'on-hold':
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            En pause
          </span>
        );
      default:
        return null;
    }
  };
  
  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'planned':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with project image and basic info */}
        <div className="mb-8 relative rounded-xl overflow-hidden">
          <div className="h-64 w-full object-cover" style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${project.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(project.status)}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">
              {project.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </span>
              <span className="flex items-center">
                <Building className="h-4 w-4 mr-1" />
                {project.association.name}
              </span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {project.members.length} membres
              </span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              <FileEdit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90" onClick={handleSendUpdate}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Ajouter une mise à jour
            </Button>
          </div>
        </div>
        
        {/* Project content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="w-full justify-start border-b pb-px">
                <TabsTrigger value="overview" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                  Aperçu
                </TabsTrigger>
                <TabsTrigger value="tasks" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                  Tâches
                </TabsTrigger>
                <TabsTrigger value="updates" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                  Mises à jour
                </TabsTrigger>
                <TabsTrigger value="team" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                  Équipe
                </TabsTrigger>
              </TabsList>
              
              {/* Overview tab */}
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de ce projet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {project.description}
                    </p>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Progression</CardTitle>
                    <CardDescription>
                      Progression globale du projet
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Progression totale</span>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Répartition des tâches</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Terminées</span>
                              <span>{project.tasks.filter(t => t.status === 'completed').length}/{project.tasks.length}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>En cours</span>
                              <span>{project.tasks.filter(t => t.status === 'in-progress').length}/{project.tasks.length}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Planifiées</span>
                              <span>{project.tasks.filter(t => t.status === 'planned').length}/{project.tasks.length}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Calendrier</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Date de début</span>
                              <span>{formatDate(project.startDate)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Date de fin prévue</span>
                              <span>{formatDate(project.endDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Tasks tab */}
              <TabsContent value="tasks">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Tâches</CardTitle>
                      <CardDescription>
                        Liste des tâches du projet
                      </CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center gap-3">
                            {getTaskStatusIcon(task.status)}
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {task.assignee ? `Assigné à: ${task.assignee}` : 'Non assigné'}
                              </p>
                            </div>
                          </div>
                          <div>
                            {task.status !== 'completed' && (
                              <Button size="sm" variant="outline">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Marquer comme terminé
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Updates tab */}
              <TabsContent value="updates">
                <Card>
                  <CardHeader>
                    <CardTitle>Mises à jour du projet</CardTitle>
                    <CardDescription>
                      Historique des mises à jour
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>MU</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <input 
                            type="text" 
                            placeholder="Ajouter une mise à jour..." 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <Button onClick={handleSendUpdate}>Publier</Button>
                      </div>
                      
                      {project.updates.map(update => (
                        <div key={update.id} className="border-l-2 border-primary/30 pl-4 py-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{update.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(update.date)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {update.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Team tab */}
              <TabsContent value="team">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Équipe du projet</CardTitle>
                      <CardDescription>
                        Membres impliqués dans ce projet
                      </CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un membre
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.members.map(member => (
                        <div key={member.id} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={member.avatar || undefined} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Période</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Progression</p>
                    <p className="text-sm text-muted-foreground">{project.progress}% terminé</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ListTodo className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Tâches</p>
                    <p className="text-sm text-muted-foreground">
                      {project.tasks.filter(t => t.status === 'completed').length} / {project.tasks.length} terminées
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Association</p>
                    <Link to={`/associations/${project.association.id}`} className="text-sm text-primary hover:underline">
                      {project.association.name}
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Chef de projet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Marie Dupont</p>
                    <p className="text-sm text-muted-foreground">Chef de projet</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Envoyer un message
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Générer un rapport
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une tâche
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileEdit className="h-4 w-4 mr-2" />
                  Modifier le projet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;

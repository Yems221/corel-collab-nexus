import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Building,
  BadgeEuro,
  ArrowUpRight,
  FileEdit,
  MessageSquare,
  Tags,
} from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';

// Mock data
const projectMock = {
  id: '1',
  title: 'Rénovation de l\'aire de jeux',
  description: 'Projet de rénovation complète de l\'aire de jeux du quartier Saint-Michel. Le projet comprend l\'installation de nouveaux équipements adaptés à tous les âges, la mise en place d\'un revêtement de sol sécurisé, et l\'aménagement d\'espaces verts autour de l\'aire de jeux.',
  status: 'in_progress',
  progress: 45,
  startDate: '2023-04-01',
  endDate: '2023-07-15',
  budget: 15000,
  spentBudget: 6750,
  memberCount: 8,
  tasksCompleted: 7,
  totalTasks: 15,
  associationName: 'Association des Riverains du Quartier Saint-Michel',
  associationId: '1',
  groupName: 'Comité Aménagement',
  groupId: '1',
  tags: ['aménagement', 'enfants', 'loisirs'],
  imageUrl: 'https://images.unsplash.com/photo-1596804285324-51b1a044a4c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

const membersMock = [
  { id: '1', name: 'Thomas Dubois', role: 'Chef de projet', avatar: null },
  { id: '2', name: 'Émilie Laurent', role: 'Coordinatrice', avatar: null },
  { id: '3', name: 'Julien Moreau', role: 'Responsable technique', avatar: null },
  { id: '4', name: 'Sophie Martin', role: 'Responsable communication', avatar: null },
  { id: '5', name: 'François Legrand', role: 'Membre', avatar: null },
];

const tasksMock = [
  { id: '1', title: 'Analyse des besoins', status: 'completed', assignee: 'Thomas Dubois', dueDate: '2023-04-15' },
  { id: '2', title: 'Demande de devis', status: 'completed', assignee: 'Julien Moreau', dueDate: '2023-04-30' },
  { id: '3', title: 'Choix des équipements', status: 'completed', assignee: 'Émilie Laurent', dueDate: '2023-05-15' },
  { id: '4', title: 'Commande du matériel', status: 'completed', assignee: 'Thomas Dubois', dueDate: '2023-05-30' },
  { id: '5', title: 'Préparation du terrain', status: 'in_progress', assignee: 'Julien Moreau', dueDate: '2023-06-15' },
  { id: '6', title: 'Installation des équipements', status: 'not_started', assignee: 'François Legrand', dueDate: '2023-06-30' },
  { id: '7', title: 'Finalisation et tests', status: 'not_started', assignee: 'Sophie Martin', dueDate: '2023-07-10' },
];

const timelineMock = [
  { id: '1', date: '2023-04-01', title: 'Début du projet', description: 'Lancement officiel du projet de rénovation.' },
  { id: '2', date: '2023-04-15', title: 'Analyse des besoins', description: 'Étude des besoins et attentes des résidents du quartier.' },
  { id: '3', date: '2023-05-02', title: 'Validation des plans', description: 'Approbation des plans de rénovation par le comité.' },
  { id: '4', date: '2023-05-20', title: 'Obtention des financements', description: 'Confirmation de la subvention municipale.' },
  { id: '5', date: '2023-06-05', title: 'Début des travaux', description: 'Début des travaux de préparation du terrain.' },
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const { addNotification } = useNotifications();
  
  // In a real application, you would fetch the project data based on the ID
  // For now, we'll use the mock data
  const project = projectMock;
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Terminé</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">En cours</Badge>;
      case 'not_started':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">À venir</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };
  
  const handleSendMessage = () => {
    addNotification({
      title: "Message envoyé",
      message: `Votre message a été envoyé à l'équipe du projet`,
      type: "success",
      category: "messages",
    });
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
            <h1 className="text-3xl font-bold mb-2">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {project.memberCount} membres
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                {project.tasksCompleted}/{project.totalTasks} tâches
              </span>
              <span className="flex items-center">
                <Building className="h-4 w-4 mr-1" />
                {project.associationName}
              </span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 flex gap-2">
            <Link to={`/financial-dashboard/project/${project.id}`}>
              <Button variant="outline" className="bg-white hover:bg-gray-100">
                <BadgeEuro className="h-4 w-4 mr-2" />
                Finances
              </Button>
            </Link>
            <Button variant="outline" className="bg-white hover:bg-gray-100" onClick={handleSendMessage}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contacter
            </Button>
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              <FileEdit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
        </div>
        
        {/* Status and progress bar */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <div className="mr-4">
                {getStatusBadge(project.status)}
              </div>
              <div>
                <h2 className="text-lg font-semibold">Progression du projet</h2>
                <p className="text-sm text-muted-foreground">
                  Du {new Date(project.startDate).toLocaleDateString('fr-FR')} au {new Date(project.endDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{project.progress}%</span>
              <div className="w-40 md:w-60">
                <Progress value={project.progress} className="h-3" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full justify-start border-b pb-px">
            <TabsTrigger value="overview" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="tasks" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              Tâches
            </TabsTrigger>
            <TabsTrigger value="members" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              Membres
            </TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              Chronologie
            </TabsTrigger>
          </TabsList>
          
          {/* Overview tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center">
                          <Tags className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tâches récentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tasksMock.slice(0, 3).map(task => (
                        <div key={task.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">Assigné à: {task.assignee}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                            </span>
                            {getStatusBadge(task.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("tasks")}>
                      Voir toutes les tâches
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Détails du projet</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Statut</span>
                      <span className="font-medium">{project.status === 'in_progress' ? 'En cours' : project.status === 'completed' ? 'Terminé' : 'Non démarré'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date de début</span>
                      <span className="font-medium">{new Date(project.startDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date de fin</span>
                      <span className="font-medium">{new Date(project.endDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Budget</span>
                      <span className="font-medium">{project.budget.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dépensé</span>
                      <span className="font-medium">{project.spentBudget.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Reste</span>
                      <span className="font-medium">{(project.budget - project.spentBudget).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Association</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm font-medium">{project.associationName}</p>
                      <p className="text-sm text-muted-foreground">Groupe: {project.groupName}</p>
                      <Link to={`/associations/${project.associationId}`}>
                        <Button variant="outline" className="w-full">
                          Voir l'association
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Membres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {membersMock.slice(0, 5).map(member => (
                        <Avatar key={member.id} className="h-10 w-10 border-2 border-white">
                          <AvatarImage src={member.avatar || undefined} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("members")}>
                      Voir tous les membres
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Tasks tab */}
          <TabsContent value="tasks">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Tâches ({tasksMock.length})</h2>
              <Button>
                <Clock className="h-4 w-4 mr-2" />
                Ajouter une tâche
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasksMock.map(task => (
                <Card key={task.id}>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(task.dueDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Assigné à: {task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(task.status)}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button variant="outline">Voir les détails</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Members tab */}
          <TabsContent value="members">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Membres ({membersMock.length})</h2>
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Ajouter un membre
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {membersMock.map(member => (
                <Card key={member.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar || undefined} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button variant="ghost" size="sm" >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Timeline tab */}
          <TabsContent value="timeline">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Chronologie du projet</h2>
            </div>
            
            <div className="relative">
              <div className="absolute left-5 top-4 bottom-0 w-0.5 bg-gray-300" aria-hidden="true"></div>
              <ul className="mt-3 space-y-4">
                {timelineMock.map(event => (
                  <li key={event.id} className="ml-10 relative">
                    <div className="flex items-center mb-1">
                      <div className="absolute left-[-45px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-8 ring-gray-100">
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-sm font-bold">{event.title}</p>
                    </div>
                    <div className="ml-2">
                      <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <p className="text-sm text-gray-700">{event.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProjectDetail;

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  FileText,
  Users,
  Mail,
  MapPin,
  Phone,
  Globe,
  MessageSquare,
  FileEdit,
  FormInput,
  BadgeEuro,
} from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';

const mockAssociation = {
  id: '1',
  name: 'Association des Riverains du Quartier Saint-Michel',
  description: 'Groupe de résidents visant à améliorer la qualité de vie dans le quartier Saint-Michel. Nous organisons des événements communautaires, des initiatives de nettoyage et d\'embellissement, et des réunions pour discuter des enjeux locaux.',
  category: 'Association de quartier',
  memberCount: 32,
  eventsCount: 2,
  projectsCount: 3,
  createdAt: '2023-04-15',
  location: '12 rue Saint-Michel, 75005 Paris',
  email: 'contact@riverains-saint-michel.org',
  phone: '01 23 45 67 89',
  website: 'www.riverains-saint-michel.org',
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
  },
  imageUrl: 'https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80'
};

const mockMembers = [
  { id: '1', name: 'Marie Dupont', role: 'Présidente', avatar: null },
  { id: '2', name: 'Jean Martin', role: 'Trésorier', avatar: null },
  { id: '3', name: 'Sophie Lefebvre', role: 'Secrétaire', avatar: null },
  { id: '4', name: 'Philippe Moreau', role: 'Membre', avatar: null },
  { id: '5', name: 'Claire Dubois', role: 'Membre', avatar: null },
];

const mockEvents = [
  { id: '1', name: 'Assemblée Générale 2023', date: '2023-10-15', location: 'Salle communale', attendees: 28 },
  { id: '2', name: 'Fête de quartier', date: '2023-11-20', location: 'Jardin public Saint-Michel', attendees: 150 },
];

const mockProjects = [
  { id: '1', name: 'Rénovation de la place centrale', status: 'en cours', progress: 60 },
  { id: '2', name: 'Jardin partagé', status: 'planifié', progress: 20 },
  { id: '3', name: 'Nettoyage des berges', status: 'terminé', progress: 100 },
];

const AssociationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('about');
  const { addNotification } = useNotifications();
  
  const association = mockAssociation;
  
  const handleSendMessage = () => {
    addNotification({
      title: "Message envoyé",
      message: `Votre message a été envoyé à ${association.name}`,
      type: "success",
      category: "messages",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 relative rounded-xl overflow-hidden">
          <div className="h-64 w-full object-cover" style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${association.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">
              {association.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {association.memberCount} membres
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {association.eventsCount} événements
              </span>
              <span className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                {association.projectsCount} projets
              </span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 flex gap-2">
            <Link to={`/financial-dashboard/association/${association.id}`}>
              <Button variant="outline" className="bg-white hover:bg-gray-100">
                <BadgeEuro className="h-4 w-4 mr-2" />
                Finances
              </Button>
            </Link>
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contacter
            </Button>
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              <FileEdit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Link to={`/form-builder?associationId=${association.id}`}>
              <Button className="bg-primary text-white hover:bg-primary/90">
                <FormInput className="h-4 w-4 mr-2" />
                Formulaire d'inscription
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full justify-start border-b pb-px">
            <TabsTrigger value="about" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              À propos
            </TabsTrigger>
            <TabsTrigger value="members" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              Membres
            </TabsTrigger>
            <TabsTrigger value="events" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              Événements
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              Projets
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="about">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {association.description}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Activités récentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-2 border-primary/30 pl-4 py-2">
                      <p className="text-sm font-medium">Nouvel événement créé</p>
                      <p className="text-xs text-muted-foreground">Fête de quartier - Il y a 2 jours</p>
                    </div>
                    <div className="border-l-2 border-primary/30 pl-4 py-2">
                      <p className="text-sm font-medium">Nouveau membre</p>
                      <p className="text-xs text-muted-foreground">Claire Dubois a rejoint l'association - Il y a 1 semaine</p>
                    </div>
                    <div className="border-l-2 border-primary/30 pl-4 py-2">
                      <p className="text-sm font-medium">Mise à jour du projet</p>
                      <p className="text-xs text-muted-foreground">Rénovation de la place centrale - 60% terminé - Il y a 2 semaines</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Adresse</p>
                        <p className="text-sm text-muted-foreground">{association.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{association.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Téléphone</p>
                        <p className="text-sm text-muted-foreground">{association.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Site web</p>
                        <p className="text-sm text-muted-foreground">{association.website}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Vous souhaitez contacter cette association ? Envoyez-leur un message.
                    </p>
                    <Button className="w-full" onClick={handleSendMessage}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Envoyer un message
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="members">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Membres ({mockMembers.length})</h2>
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Ajouter un membre
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockMembers.map(member => (
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
                    <Button variant="ghost" size="sm" onClick={handleSendMessage}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Événements ({mockEvents.length})</h2>
              <Link to="/create-event">
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Créer un événement
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockEvents.map(event => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event.attendees} participants</span>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Link to={`/events/${event.id}`}>
                      <Button variant="outline">Voir les détails</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="projects">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Projets ({mockProjects.length})</h2>
              <Link to="/create-project">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Créer un projet
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockProjects.map(project => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'en cours' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'planifié' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {project.status === 'en cours' ? 'En cours' :
                         project.status === 'planifié' ? 'Planifié' :
                         'Terminé'}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Progression: {project.progress}%
                    </p>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Link to={`/projects/${project.id}`}>
                      <Button variant="outline">Voir les détails</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AssociationDetail;

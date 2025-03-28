
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
  Clock,
  MapPin,
  Users,
  Building,
  Share2,
  FileEdit,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';

// Mock data
const mockEvent = {
  id: '1',
  name: 'Assemblée Générale 2023',
  description: 'L\'assemblée générale annuelle de l\'Association des Riverains du Quartier Saint-Michel. Venez participer aux décisions importantes concernant notre quartier et découvrir les projets pour l\'année à venir. Un moment convivial suivra la réunion.',
  date: '2023-10-15',
  startTime: '18:30',
  endTime: '20:30',
  location: 'Salle communale du quartier Saint-Michel, 5 rue de la Mairie',
  association: {
    id: '1',
    name: 'Association des Riverains du Quartier Saint-Michel',
    logo: null,
  },
  maxAttendees: 50,
  currentAttendees: 28,
  isFree: true,
  price: null,
  imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
  status: 'upcoming', // upcoming, ongoing, past
  attendees: [
    { id: '1', name: 'Marie Dupont', status: 'confirmed', avatar: null },
    { id: '2', name: 'Jean Martin', status: 'confirmed', avatar: null },
    { id: '3', name: 'Sophie Lefebvre', status: 'pending', avatar: null },
  ],
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('details');
  const { addNotification } = useNotifications();
  
  // In a real application, you would fetch the event data based on the ID
  // For now, we'll use the mock data
  const event = mockEvent;
  
  const handleRegister = () => {
    addNotification({
      title: "Inscription confirmée",
      message: `Vous êtes inscrit à l'événement: ${event.name}`,
      type: "success",
      category: "events",
      link: `/events/${event.id}`,
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getEventStatusBadge = () => {
    const now = new Date();
    const eventDate = new Date(event.date);
    eventDate.setHours(parseInt(event.endTime.split(':')[0]), parseInt(event.endTime.split(':')[1]));
    
    if (eventDate < now) {
      return (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          Terminé
        </span>
      );
    }
    
    const eventStartDate = new Date(event.date);
    eventStartDate.setHours(parseInt(event.startTime.split(':')[0]), parseInt(event.startTime.split(':')[1]));
    
    if (eventStartDate <= now && eventDate >= now) {
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          En cours
        </span>
      );
    }
    
    return (
      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
        À venir
      </span>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with event image and basic info */}
        <div className="mb-8 relative rounded-xl overflow-hidden">
          <div className="h-64 w-full object-cover" style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${event.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              {getEventStatusBadge()}
              <span className="text-sm">
                {event.isFree ? 'Gratuit' : `${event.price} €`}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">
              {event.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {event.startTime} - {event.endTime}
              </span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {event.currentAttendees} / {event.maxAttendees} participants
              </span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              <FileEdit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90" onClick={handleRegister}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              S'inscrire
            </Button>
          </div>
        </div>
        
        {/* Event content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="w-full justify-start border-b pb-px">
                <TabsTrigger value="details" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                  Détails
                </TabsTrigger>
                <TabsTrigger value="participants" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                  Participants
                </TabsTrigger>
                <TabsTrigger value="comments" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                  Commentaires
                </TabsTrigger>
              </TabsList>
              
              {/* Details tab */}
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de cet événement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Participants tab */}
              <TabsContent value="participants">
                <Card>
                  <CardHeader>
                    <CardTitle>Participants ({event.attendees.length})</CardTitle>
                    <CardDescription>
                      {event.currentAttendees} personnes sur {event.maxAttendees} places disponibles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.attendees.map(attendee => (
                        <div key={attendee.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={attendee.avatar || undefined} />
                              <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{attendee.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {attendee.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                              </p>
                            </div>
                          </div>
                          <div>
                            {attendee.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  Refuser
                                </Button>
                                <Button size="sm">
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Accepter
                                </Button>
                              </div>
                            )}
                            {attendee.status === 'confirmed' && (
                              <Button size="sm" variant="ghost">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Comments tab */}
              <TabsContent value="comments">
                <Card>
                  <CardHeader>
                    <CardTitle>Commentaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-10">
                      Aucun commentaire pour le moment
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Ajouter un commentaire..." 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button>Envoyer</Button>
                    </div>
                  </CardFooter>
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
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Horaires</p>
                    <p className="text-sm text-muted-foreground">{event.startTime} - {event.endTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Lieu</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Organisé par</p>
                    <Link to={`/associations/${event.association.id}`} className="text-sm text-primary hover:underline">
                      {event.association.name}
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Inscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Prix:</span>
                    <span className="font-medium">{event.isFree ? 'Gratuit' : `${event.price} €`}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Places disponibles:</span>
                    <span className="font-medium">{event.maxAttendees - event.currentAttendees} / {event.maxAttendees}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                  
                  <Button className="w-full mt-4" onClick={handleRegister}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    S'inscrire
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;

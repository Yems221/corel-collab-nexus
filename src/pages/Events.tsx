
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui-components/Button';
import { 
  Plus, 
  Search, 
  Calendar as CalendarIcon,
  MapPin,
  Tag,
  SlidersHorizontal
} from 'lucide-react';
import EventCard from '@/components/EventCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

// Mock data for events
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
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1332&q=80'
  },
  {
    id: '3',
    title: 'Tournoi de Tennis Inter-associations',
    description: 'Compétition amicale de tennis entre les différentes associations de la ville.',
    date: '2023-07-08T09:00:00',
    location: 'Courts de tennis municipaux',
    attendees: 46,
    maxAttendees: 60,
    isPaid: true,
    price: 10,
    associationName: 'Club Sportif du Parc',
    associationId: '3',
    imageUrl: 'https://images.unsplash.com/photo-1595435934949-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1332&q=80'
  },
  {
    id: '4',
    title: 'Exposition d\'Art Local',
    description: 'Découvrez les œuvres des artistes de notre communauté lors de cette exposition annuelle.',
    date: '2023-06-03T14:00:00',
    location: 'Médiathèque centrale',
    attendees: 65,
    maxAttendees: 100,
    isPaid: false,
    associationName: 'Association Culturelle Horizon',
    associationId: '4',
    imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '5',
    title: 'Collecte de Fonds Solidaire',
    description: 'Événement caritatif pour collecter des fonds destinés aux familles en difficulté.',
    date: '2023-06-17T15:00:00',
    location: 'Place du Marché',
    attendees: 38,
    maxAttendees: 200,
    isPaid: true,
    price: 5,
    associationName: 'Collectif d\'Entraide Solidaire',
    associationId: '5',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '6',
    title: 'Réunion du Comité de Quartier',
    description: 'Réunion mensuelle pour discuter des projets et enjeux du quartier.',
    date: '2023-05-29T19:00:00',
    location: 'Centre communautaire Saint-Michel',
    attendees: 15,
    maxAttendees: 30,
    isPaid: false,
    associationName: 'Association des Riverains',
    associationId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
];

// Associations for filtering
const associations = [
  'Toutes les associations',
  'Association des Riverains',
  'Coopérative Les Cèdres',
  'Club Sportif du Parc',
  'Association Culturelle Horizon',
  'Collectif d\'Entraide Solidaire',
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssociation, setSelectedAssociation] = useState('Toutes les associations');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [sortOption, setSortOption] = useState('upcoming');
  const [currentTab, setCurrentTab] = useState('all');
  
  // Filter and sort events
  const filteredEvents = mockEvents
    .filter(event => {
      // Filter by search term
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by association
      const matchesAssociation = selectedAssociation === 'Toutes les associations' || 
                              event.associationName === selectedAssociation;
      
      // Filter by price
      const matchesPrice = selectedPrice === 'all' || 
                          (selectedPrice === 'free' && !event.isPaid) ||
                          (selectedPrice === 'paid' && event.isPaid);
      
      // Filter by date
      const matchesDate = !selectedDate || 
                         format(new Date(event.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      
      // Filter by tab
      const matchesTab = currentTab === 'all' || 
                        (currentTab === 'participating' && (event.id === '1' || event.id === '2')) ||
                        (currentTab === 'organizing' && (event.id === '1'));
      
      return matchesSearch && matchesAssociation && matchesPrice && matchesDate && matchesTab;
    })
    .sort((a, b) => {
      // Sort based on selected option
      if (sortOption === 'upcoming') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortOption === 'popular') {
        return b.attendees - a.attendees;
      } else {
        const aPercentage = a.maxAttendees ? (a.attendees / a.maxAttendees) * 100 : 0;
        const bPercentage = b.maxAttendees ? (b.attendees / b.maxAttendees) * 100 : 0;
        return bPercentage - aPercentage;
      }
    });
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAssociation('Toutes les associations');
    setSelectedPrice('all');
    setSelectedDate(undefined);
    setSortOption('upcoming');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Événements
            </h1>
            <p className="text-gray-600 mt-1">
              Découvrez et gérez les événements de vos associations
            </p>
          </div>
          
          <Link to="/create-event" className="mt-4 sm:mt-0">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Créer un événement
            </Button>
          </Link>
        </div>
        
        {/* Tabs */}
        <Tabs 
          value={currentTab} 
          onValueChange={setCurrentTab}
          className="mb-6 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="all">Tous les événements</TabsTrigger>
            <TabsTrigger value="participating">Je participe</TabsTrigger>
            <TabsTrigger value="organizing">J'organise</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Association Filter */}
              <Select value={selectedAssociation} onValueChange={setSelectedAssociation}>
                <SelectTrigger>
                  <SelectValue placeholder="Association" />
                </SelectTrigger>
                <SelectContent>
                  {associations.map((association) => (
                    <SelectItem key={association} value={association}>
                      {association}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Price Filter */}
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger>
                  <SelectValue placeholder="Prix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les prix</SelectItem>
                  <SelectItem value="free">Gratuit</SelectItem>
                  <SelectItem value="paid">Payant</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Date Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, 'PPP', { locale: fr })
                    ) : (
                      "Sélectionner une date"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              {/* Sort Option */}
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Prochainement</SelectItem>
                  <SelectItem value="popular">Popularité</SelectItem>
                  <SelectItem value="filling">Taux de remplissage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Active filters */}
            <div className="flex flex-wrap items-center gap-2">
              {selectedAssociation !== 'Toutes les associations' && (
                <Badge variant="secondary">
                  Association: {selectedAssociation}
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedAssociation('Toutes les associations')}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {selectedPrice !== 'all' && (
                <Badge variant="secondary">
                  Prix: {selectedPrice === 'free' ? 'Gratuit' : 'Payant'}
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedPrice('all')}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {selectedDate && (
                <Badge variant="secondary">
                  Date: {format(selectedDate, 'PPP', { locale: fr })}
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedDate(undefined)}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {(selectedAssociation !== 'Toutes les associations' || selectedPrice !== 'all' || selectedDate) && (
                <button
                  className="text-sm text-primary hover:underline"
                  onClick={clearFilters}
                >
                  Effacer tous les filtres
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Results display */}
        <div className="mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-muted-foreground">
            {filteredEvents.length} événement{filteredEvents.length !== 1 ? 's' : ''} trouvé{filteredEvents.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {filteredEvents.map(event => (
            <EventCard key={event.id} {...event} />
          ))}
          
          {/* Empty state */}
          {filteredEvents.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun événement trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos filtres ou de créer un nouvel événement.
              </p>
              <Link to="/create-event">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer un événement
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Events;

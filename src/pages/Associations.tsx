
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui-components/Button';
import { 
  Plus, 
  Search, 
  Filter, 
  Users,
  Calendar, 
  Clock,
  SlidersHorizontal
} from 'lucide-react';
import AssociationCard from '@/components/AssociationCard';
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

// Mock data for associations
const mockAssociations = [
  {
    id: '1',
    name: 'Association des Riverains du Quartier Saint-Michel',
    description: 'Groupe de résidents visant à améliorer la qualité de vie dans le quartier Saint-Michel.',
    category: 'Association de quartier',
    memberCount: 32,
    eventsCount: 2,
    createdAt: '2023-04-15',
    imageUrl: 'https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80'
  },
  {
    id: '2',
    name: 'Coopérative Immobilière Les Cèdres',
    description: 'Coopérative immobilière gérant la résidence Les Cèdres et ses espaces communs.',
    category: 'Coopérative immobilière',
    memberCount: 57,
    eventsCount: 1,
    createdAt: '2022-09-03',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '3',
    name: 'Club Sportif du Parc',
    description: 'Association sportive proposant des activités sportives variées pour tous les âges.',
    category: 'Club sportif',
    memberCount: 124,
    eventsCount: 8,
    createdAt: '2022-01-22',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1293&q=80'
  },
  {
    id: '4',
    name: 'Association Culturelle Horizon',
    description: 'Organisation culturelle promouvant l\'art et la culture dans notre communauté.',
    category: 'Association culturelle',
    memberCount: 86,
    eventsCount: 5,
    createdAt: '2022-06-11',
    imageUrl: 'https://images.unsplash.com/photo-1522008329904-7a348334f21e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80'
  },
  {
    id: '5',
    name: 'Collectif d\'Entraide Solidaire',
    description: 'Réseau de solidarité visant à aider les personnes dans le besoin de notre quartier.',
    category: 'Association caritative',
    memberCount: 42,
    eventsCount: 3,
    createdAt: '2023-01-05',
    imageUrl: 'https://images.unsplash.com/photo-1560252829-804f1aedf1be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80'
  },
];

// Categories for filtering
const categories = [
  'Toutes les catégories',
  'Association de quartier',
  'Coopérative immobilière',
  'Club sportif',
  'Association culturelle',
  'Association caritative',
];

const Associations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes les catégories');
  const [sortOption, setSortOption] = useState('newest');
  const [currentTab, setCurrentTab] = useState('all');
  
  // Filter and sort associations
  const filteredAssociations = mockAssociations
    .filter(association => {
      // Filter by search term
      const matchesSearch = association.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          association.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = selectedCategory === 'Toutes les catégories' || 
                              association.category === selectedCategory;
      
      // Filter by tab
      const matchesTab = currentTab === 'all' || 
                        (currentTab === 'my' && (association.id === '1' || association.id === '2'));
      
      return matchesSearch && matchesCategory && matchesTab;
    })
    .sort((a, b) => {
      // Sort based on selected option
      if (sortOption === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortOption === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortOption === 'members') {
        return b.memberCount - a.memberCount;
      } else {
        return b.eventsCount - a.eventsCount;
      }
    });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Associations
            </h1>
            <p className="text-gray-600 mt-1">
              Gérez vos associations ou explorez-en de nouvelles
            </p>
          </div>
          
          <Link to="/create-association" className="mt-4 sm:mt-0">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Créer une association
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
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="all">Toutes les associations</TabsTrigger>
            <TabsTrigger value="my">Mes associations</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une association..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Plus récentes</SelectItem>
                  <SelectItem value="oldest">Plus anciennes</SelectItem>
                  <SelectItem value="members">Plus de membres</SelectItem>
                  <SelectItem value="events">Plus d'événements</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Results display */}
        <div className="mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-muted-foreground">
            {filteredAssociations.length} association{filteredAssociations.length !== 1 ? 's' : ''} trouvée{filteredAssociations.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Associations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {filteredAssociations.map(association => (
            <AssociationCard key={association.id} {...association} />
          ))}
          
          {/* Empty state */}
          {filteredAssociations.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune association trouvée</h3>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos filtres ou de créer une nouvelle association.
              </p>
              <Link to="/create-association">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer une association
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Associations;

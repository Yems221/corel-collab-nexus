
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui-components/Button';
import { 
  Plus, 
  Search, 
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
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
import { Badge } from "@/components/ui/badge";

// Mock data for projects
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
  {
    id: '3',
    title: 'Mise à jour du site web',
    description: 'Refonte du site web de notre association pour améliorer la communication.',
    status: 'in_progress' as const,
    progress: 68,
    startDate: '2023-03-15',
    endDate: '2023-05-30',
    memberCount: 3,
    tasksCompleted: 8,
    totalTasks: 12,
    associationName: 'Association Culturelle Horizon',
    associationId: '4',
    groupName: 'Équipe Communication',
    groupId: '4',
  },
  {
    id: '4',
    title: 'Campagne de collecte de fonds',
    description: 'Organisation d\'une campagne pour financer nos activités caritatives.',
    status: 'in_progress' as const,
    progress: 25,
    startDate: '2023-05-10',
    endDate: '2023-08-20',
    memberCount: 6,
    tasksCompleted: 3,
    totalTasks: 12,
    associationName: 'Collectif d\'Entraide Solidaire',
    associationId: '5',
    groupName: 'Comité Financement',
    groupId: '5',
  },
  {
    id: '5',
    title: 'Tournoi inter-associations',
    description: 'Organisation d\'un tournoi sportif entre les associations de la ville.',
    status: 'completed' as const,
    progress: 100,
    startDate: '2023-02-01',
    endDate: '2023-04-30',
    memberCount: 10,
    tasksCompleted: 20,
    totalTasks: 20,
    associationName: 'Club Sportif du Parc',
    associationId: '3',
    groupName: 'Équipe Événements',
    groupId: '3',
  },
  {
    id: '6',
    title: 'Installation de composteurs collectifs',
    description: 'Mise en place de composteurs dans les espaces communs de notre résidence.',
    status: 'on_hold' as const,
    progress: 30,
    startDate: '2023-03-10',
    endDate: '2023-06-15',
    memberCount: 4,
    tasksCompleted: 3,
    totalTasks: 8,
    associationName: 'Coopérative Les Cèdres',
    associationId: '2',
    groupName: 'Comité Environnement',
    groupId: '6',
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

// Statuses for filtering
const statuses = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'not_started', label: 'Pas commencé' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'on_hold', label: 'En pause' },
  { value: 'completed', label: 'Terminé' },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssociation, setSelectedAssociation] = useState('Toutes les associations');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortOption, setSortOption] = useState('recent');
  const [currentTab, setCurrentTab] = useState('all');
  
  // Filter and sort projects
  const filteredProjects = mockProjects
    .filter(project => {
      // Filter by search term
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.groupName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by association
      const matchesAssociation = selectedAssociation === 'Toutes les associations' || 
                              project.associationName === selectedAssociation;
      
      // Filter by status
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      
      // Filter by tab
      const matchesTab = currentTab === 'all' || 
                        (currentTab === 'participating' && (project.id === '1' || project.id === '2')) ||
                        (currentTab === 'managing' && (project.id === '1'));
      
      return matchesSearch && matchesAssociation && matchesStatus && matchesTab;
    })
    .sort((a, b) => {
      // Sort based on selected option
      if (sortOption === 'recent') {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      } else if (sortOption === 'deadline') {
        if (!a.endDate) return 1;
        if (!b.endDate) return -1;
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      } else if (sortOption === 'progress') {
        return b.progress - a.progress;
      } else {
        return b.tasksCompleted / b.totalTasks - a.tasksCompleted / a.totalTasks;
      }
    });
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAssociation('Toutes les associations');
    setSelectedStatus('all');
    setSortOption('recent');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Projets
            </h1>
            <p className="text-gray-600 mt-1">
              Suivez et gérez les projets de vos associations
            </p>
          </div>
          
          <Link to="/create-project" className="mt-4 sm:mt-0">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Créer un projet
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
            <TabsTrigger value="all">Tous les projets</TabsTrigger>
            <TabsTrigger value="participating">Je participe</TabsTrigger>
            <TabsTrigger value="managing">Je gère</TabsTrigger>
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
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              
              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Sort Option */}
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récents</SelectItem>
                  <SelectItem value="deadline">Date limite</SelectItem>
                  <SelectItem value="progress">Progression</SelectItem>
                  <SelectItem value="tasks">Tâches complétées</SelectItem>
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
              
              {selectedStatus !== 'all' && (
                <Badge variant="secondary">
                  Statut: {statuses.find(s => s.value === selectedStatus)?.label}
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedStatus('all')}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {(selectedAssociation !== 'Toutes les associations' || selectedStatus !== 'all') && (
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
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">{mockProjects.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">En cours</p>
              <p className="text-xl font-bold">{mockProjects.filter(p => p.status === 'in_progress').length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">En pause</p>
              <p className="text-xl font-bold">{mockProjects.filter(p => p.status === 'on_hold').length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Terminés</p>
              <p className="text-xl font-bold">{mockProjects.filter(p => p.status === 'completed').length}</p>
            </div>
          </div>
        </div>
        
        {/* Results display */}
        <div className="mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-muted-foreground">
            {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
          
          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun projet trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos filtres ou de créer un nouveau projet.
              </p>
              <Link to="/create-project">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer un projet
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;

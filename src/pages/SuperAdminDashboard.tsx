import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Building,
  Calendar,
  Wallet,
  Bell,
  Building2,
  LogOut,
  LineChart,
  PieChart,
  DollarSign,
  BadgeAlert,
  UserCheck,
  BadgeCheck,
  CircleAlert,
  BanknoteIcon,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import NotificationCenter from '@/components/NotificationCenter';

const statsData = {
  totalUsers: 2347,
  activeUsers: 1892,
  totalAssociations: 132,
  totalSubgroups: 198,
  totalEvents: 315,
  totalProjects: 87,
  pendingApprovals: 24,
  recentTransactions: 156,
  totalRevenue: 15750,
  avgDonationAmount: 75.8,
  activeNotifications: 43
};

const recentUsers = [
  { id: '1', name: 'Emma Dupont', email: 'emma@example.com', role: 'user', status: 'active', joined: '2023-06-15' },
  { id: '2', name: 'Thomas Bernard', email: 'thomas@example.com', role: 'admin', status: 'active', joined: '2023-05-22' },
  { id: '3', name: 'Sophie Martin', email: 'sophie@example.com', role: 'user', status: 'pending', joined: '2023-06-27' },
  { id: '4', name: 'Lucas Petit', email: 'lucas@example.com', role: 'user', status: 'active', joined: '2023-06-10' },
  { id: '5', name: 'Camille Leroy', email: 'camille@example.com', role: 'admin', status: 'inactive', joined: '2023-04-18' }
];

const recentAssociations = [
  { id: '1', name: 'Association Sportive Lyon', members: 78, events: 12, budget: 8500, status: 'active' },
  { id: '2', name: 'Club de Lecture Paris', members: 45, events: 8, budget: 2300, status: 'active' },
  { id: '3', name: 'Groupe Environnemental Marseille', members: 120, events: 15, budget: 12000, status: 'pending' },
  { id: '4', name: 'Association Musicale Bordeaux', members: 62, events: 7, budget: 5800, status: 'active' },
  { id: '5', name: 'Club Innovation Tech', members: 93, events: 5, budget: 7500, status: 'inactive' }
];

const recentEvents = [
  { id: '1', name: 'Concert de Charité', association: 'Association Musicale Bordeaux', date: '2023-07-15', attendees: 250, status: 'upcoming' },
  { id: '2', name: 'Marathon Annuel', association: 'Association Sportive Lyon', date: '2023-07-22', attendees: 500, status: 'upcoming' },
  { id: '3', name: 'Conférence Écologie', association: 'Groupe Environnemental Marseille', date: '2023-06-30', attendees: 180, status: 'completed' },
  { id: '4', name: 'Club de Lecture Mensuel', association: 'Club de Lecture Paris', date: '2023-07-05', attendees: 35, status: 'upcoming' },
  { id: '5', name: 'Hackathon Innovation', association: 'Club Innovation Tech', date: '2023-06-25', attendees: 120, status: 'completed' }
];

const recentTransactions = [
  { id: '1', type: 'donation', amount: 150, association: 'Association Musicale Bordeaux', date: '2023-06-28', status: 'completed' },
  { id: '2', type: 'fundraising', amount: 2500, association: 'Groupe Environnemental Marseille', date: '2023-06-25', status: 'completed' },
  { id: '3', type: 'event_fee', amount: 350, association: 'Association Sportive Lyon', date: '2023-06-27', status: 'pending' },
  { id: '4', type: 'donation', amount: 75, association: 'Club de Lecture Paris', date: '2023-06-26', status: 'completed' },
  { id: '5', type: 'sponsorship', amount: 1000, association: 'Club Innovation Tech', date: '2023-06-20', status: 'completed' }
];

const recentNotifications = [
  { id: '1', title: 'Nouvelle association créée', message: 'Une nouvelle association attend votre approbation', timestamp: new Date('2023-06-28T10:30:00'), type: 'info', category: 'associations' },
  { id: '2', title: 'Alerte de paiement', message: 'Échec de transaction pour l\'Association Sportive Lyon', timestamp: new Date('2023-06-28T09:15:00'), type: 'error', category: 'financial' },
  { id: '3', title: 'Nouvel événement créé', message: 'Un nouvel événement a été créé par le Club de Lecture Paris', timestamp: new Date('2023-06-27T16:45:00'), type: 'info', category: 'events' },
  { id: '4', title: 'Rapport mensuel disponible', message: 'Le rapport financier du mois de juin est disponible', timestamp: new Date('2023-06-27T14:00:00'), type: 'success', category: 'financial' },
  { id: '5', title: 'Nouvel utilisateur', message: '5 nouveaux utilisateurs ont rejoint la plateforme', timestamp: new Date('2023-06-26T11:20:00'), type: 'info', category: 'messages' }
];

const mockNotifications = recentNotifications.map(notif => ({
  id: notif.id,
  title: notif.title,
  message: notif.message,
  timestamp: notif.timestamp,
  read: false,
  type: notif.type as 'info' | 'success' | 'warning' | 'error',
  category: notif.category as 'associations' | 'events' | 'projects' | 'messages' | 'financial',
}));

const SuperAdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showAssociationDialog, setShowAssociationDialog] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);

  const handleActionClick = (action: string, item: any) => {
    toast({
      title: "Action effectuée",
      description: `${action} pour ${item.name || item.title || 'l\'élément'} a été effectué avec succès.`,
    });
  };

  const handleMarkAllNotificationsRead = () => {
    toast({
      title: "Notifications traitées",
      description: "Toutes les notifications ont été marquées comme lues.",
    });
  };

  const handleMarkNotificationRead = (id: string) => {
    toast({
      description: "Notification marquée comme lue.",
    });
  };

  const handleDeleteNotification = (id: string) => {
    toast({
      description: "Notification supprimée.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <h1 className="text-xl font-bold">Panneau SuperAdmin</h1>
          </div>
          <div className="flex items-center space-x-6">
            <NotificationCenter 
              notifications={mockNotifications}
              onMarkAllRead={handleMarkAllNotificationsRead}
              onMarkAsRead={handleMarkNotificationRead}
              onDeleteNotification={handleDeleteNotification}
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium hidden md:inline-block">{user?.name}</span>
              <img 
                src={user?.avatar || "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"} 
                alt="Admin" 
                className="h-8 w-8 rounded-full" 
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full md:w-auto grid grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="associations">Associations</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="financial">Finances</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div className="text-2xl font-bold">{statsData.activeUsers}</div>
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-2">
                    <Progress value={(statsData.activeUsers / statsData.totalUsers) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round((statsData.activeUsers / statsData.totalUsers) * 100)}% du total
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Associations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div className="text-2xl font-bold">{statsData.totalAssociations}</div>
                    <Building className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>{statsData.totalSubgroups} sous-groupes</span>
                      <span className="text-primary">+12% ce mois</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Événements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div className="text-2xl font-bold">{statsData.totalEvents}</div>
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>28 à venir</span>
                      <span className="text-primary">+5% ce mois</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div className="text-2xl font-bold">{statsData.totalRevenue.toLocaleString('fr-FR')} €</div>
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Don moyen : {statsData.avgDonationAmount.toLocaleString('fr-FR')} €</span>
                      <span className="text-primary">+8% ce mois</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activités Récentes</CardTitle>
                  <CardDescription>Dernières actions des utilisateurs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CircleAlert className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Nouvelle association en attente d'approbation</span>
                      <span className="text-xs text-muted-foreground ml-auto">Il y a 1h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BadgeCheck className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Transaction approuvée de 1,500€</span>
                      <span className="text-xs text-muted-foreground ml-auto">Il y a 3h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">5 nouveaux utilisateurs inscrits</span>
                      <span className="text-xs text-muted-foreground ml-auto">Il y a 5h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BanknoteIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Création d'un nouvel événement de collecte</span>
                      <span className="text-xs text-muted-foreground ml-auto">Il y a 8h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BadgeAlert className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Signalement d'un problème lors d'un événement</span>
                      <span className="text-xs text-muted-foreground ml-auto">Il y a 10h</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Voir toutes les activités</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques Globales</CardTitle>
                  <CardDescription>Vue d'ensemble des performances</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Utilisateurs Actifs / Total</p>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{statsData.activeUsers} / {statsData.totalUsers}</span>
                      </div>
                    </div>
                    <LineChart className="h-8 w-8 text-primary" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Ratio Événements / Participants</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{Math.round(statsData.totalEvents / 12)} par mois</span>
                      </div>
                    </div>
                    <PieChart className="h-8 w-8 text-primary" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Transactions Récentes</p>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{statsData.recentTransactions} ce mois</span>
                      </div>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Voir les rapports détaillés</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion des Utilisateurs</CardTitle>
                    <CardDescription>Gérer tous les comptes d'utilisateurs</CardDescription>
                  </div>
                  <Button size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Ajouter un utilisateur
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date d'inscription</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' ? 'bg-primary/10 text-primary' : 
                            'bg-muted text-muted-foreground'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 'Utilisateur'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 
                            user.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status === 'active' ? 'Actif' : 
                             user.status === 'pending' ? 'En attente' : 'Inactif'}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(user.joined).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedItem(user);
                              setShowUserDialog(true);
                            }}
                          >
                            <span className="sr-only">Edit</span>
                            <Users className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Affichage de 5 sur {statsData.totalUsers} utilisateurs
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Précédent</Button>
                  <Button variant="outline" size="sm">Suivant</Button>
                </div>
              </CardFooter>
            </Card>

            <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Gérer l'utilisateur</DialogTitle>
                  <DialogDescription>
                    Modifiez les détails et les permissions de l'utilisateur.
                  </DialogDescription>
                </DialogHeader>
                {selectedItem && (
                  <div className="grid gap-4 py-4">
                    <div>
                      <p className="font-medium">{selectedItem.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedItem.email}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Rôle actuel</p>
                        <p>{selectedItem.role === 'admin' ? 'Admin' : 'Utilisateur'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Statut actuel</p>
                        <p>{selectedItem.status === 'active' ? 'Actif' : 
                            selectedItem.status === 'pending' ? 'En attente' : 'Inactif'}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Actions disponibles</p>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => handleActionClick('Promotion en admin', selectedItem)}
                        >
                          Promouvoir en admin
                        </Button>
                        <Button 
                          variant={selectedItem.status === 'active' ? 'destructive' : 'default'}
                          onClick={() => handleActionClick(
                            selectedItem.status === 'active' ? 'Désactivation' : 'Activation', 
                            selectedItem
                          )}
                        >
                          {selectedItem.status === 'active' ? 'Désactiver' : 'Activer'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowUserDialog(false)}>Annuler</Button>
                  <Button onClick={() => {
                    toast({
                      title: "Modifications enregistrées",
                      description: `Les changements pour ${selectedItem?.name} ont été sauvegardés.`,
                    });
                    setShowUserDialog(false);
                  }}>Enregistrer les modifications</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="associations">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion des Associations</CardTitle>
                    <CardDescription>Gérer toutes les associations et sous-groupes</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Building2 className="mr-2 h-4 w-4" />
                      Sous-groupes
                    </Button>
                    <Button size="sm">
                      <Building className="mr-2 h-4 w-4" />
                      Nouvelle Association
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Membres</TableHead>
                      <TableHead>Événements</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAssociations.map((assoc) => (
                      <TableRow key={assoc.id}>
                        <TableCell className="font-medium">{assoc.name}</TableCell>
                        <TableCell>{assoc.members}</TableCell>
                        <TableCell>{assoc.events}</TableCell>
                        <TableCell>{assoc.budget.toLocaleString('fr-FR')} €</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            assoc.status === 'active' ? 'bg-green-100 text-green-800' : 
                            assoc.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {assoc.status === 'active' ? 'Active' : 
                             assoc.status === 'pending' ? 'En attente' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedItem(assoc);
                              setShowAssociationDialog(true);
                            }}
                          >
                            <span className="sr-only">Edit</span>
                            <Building className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Affichage de 5 sur {statsData.totalAssociations} associations
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Précédent</Button>
                  <Button variant="outline" size="sm">Suivant</Button>
                </div>
              </CardFooter>
            </Card>

            <Dialog open={showAssociationDialog} onOpenChange={setShowAssociationDialog}>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Gérer l'association</DialogTitle>
                  <DialogDescription>
                    Modifiez les détails et paramètres de l'association.
                  </DialogDescription>
                </DialogHeader>
                {selectedItem && (
                  <div className="grid gap-4 py-4">
                    <div>
                      <p className="font-medium">{selectedItem.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedItem.members} membres</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Événements</p>
                        <p>{selectedItem.events}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Budget</p>
                        <p>{selectedItem.budget.toLocaleString('fr-FR')} €</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Statut actuel</p>
                        <p>{selectedItem.status === 'active' ? 'Active' : 
                            selectedItem.status === 'pending' ? 'En attente' : 'Inactive'}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Actions disponibles</p>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => handleActionClick('Voir les détails complets', selectedItem)}
                        >
                          Voir les détails
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleActionClick('Gérer les membres', selectedItem)}
                        >
                          Gérer les membres
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleActionClick('Voir les sous-groupes', selectedItem)}
                        >
                          Sous-groupes
                        </Button>
                        <Button 
                          variant={selectedItem.status === 'active' ? 'destructive' : 'default'}
                          onClick={() => handleActionClick(
                            selectedItem.status === 'active' ? 'Désactivation' : 'Activation', 
                            selectedItem
                          )}
                        >
                          {selectedItem.status === 'active' ? 'Désactiver' : 'Activer'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAssociationDialog(false)}>Annuler</Button>
                  <Button onClick={() => {
                    toast({
                      title: "Modifications enregistrées",
                      description: `Les changements pour ${selectedItem?.name} ont été sauvegardés.`,
                    });
                    setShowAssociationDialog(false);
                  }}>Enregistrer les modifications</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion des Événements</CardTitle>
                    <CardDescription>Gérer tous les événements de la plateforme</CardDescription>
                  </div>
                  <Button size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Nouvel Événement
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Association</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{event.association}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>{event.attendees}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {event.status === 'upcoming' ? 'À venir' : 'Terminé'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedItem(event);
                              setShowEventDialog(true);
                            }}
                          >
                            <span className="sr-only">Edit</span>
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Affichage de 5 sur {statsData.totalEvents} événements
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Précédent</Button>
                  <Button variant="outline" size="sm">Suivant</Button>
                </div>
              </CardFooter>
            </Card>

            <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Gérer l'événement</DialogTitle>
                  <DialogDescription>
                    Modifiez les détails et paramètres de l'événement.
                  </DialogDescription>
                </DialogHeader>
                {selectedItem && (
                  <div className="grid gap-4 py-4">
                    <div>
                      <p className="font-medium">{selectedItem.name}</p>
                      <p className="text-sm text-muted-foreground">Organisé par {selectedItem.association}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Date</p>
                        <p>{new Date(selectedItem.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Participants</p>
                        <p>{selectedItem.attendees}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Statut</p>
                        <p>{selectedItem.status === 'upcoming' ? 'À venir' : 'Terminé'}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Actions disponibles</p>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => handleActionClick('Voir les détails complets', selectedItem)}
                        >
                          Voir les détails
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleActionClick('Gérer les inscriptions', selectedItem)}
                        >
                          Gérer les inscriptions
                        </Button>
                        {selectedItem.status === 'upcoming' && (
                          <Button 
                            variant="destructive"
                            onClick={() => handleActionClick('Annulation', selectedItem)}
                          >
                            Annuler l'événement
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEventDialog(false)}>Fermer</Button>
                  <Button onClick={() => {
                    toast({
                      title: "Modifications enregistrées",
                      description: `Les changements pour ${selectedItem?.name} ont été sauvegardés.`,
                    });
                    setShowEventDialog(false);
                  }}>Enregistrer les modifications</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion Financière</CardTitle>
                    <CardDescription>Suivre toutes les transactions et campagnes de financement</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Exporter
                    </Button>
                    <Button size="sm">
                      <Wallet className="mr-2 h-4 w-4" />
                      Nouvelle Transaction
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Association</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          <span className="capitalize">
                            {transaction.type === 'donation' ? 'Don' : 
                             transaction.type === 'fundraising' ? 'Levée de fonds' : 
                             transaction.type === 'event_fee' ? 'Frais d\'événement' : 
                             transaction.type === 'sponsorship' ? 'Parrainage' : transaction.type}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{transaction.amount.toLocaleString('fr-FR')} €</TableCell>
                        <TableCell>{transaction.association}</TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedItem(transaction);
                              setShowTransactionDialog(true);
                            }}
                          >
                            <span className="sr-only">Voir</span>
                            <Wallet className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Affichage de 5 sur {statsData.recentTransactions} transactions
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Précédent</Button>
                  <Button variant="outline" size="sm">Suivant</Button>
                </div>
              </CardFooter>
            </Card>

            <Dialog open={showTransactionDialog} onOpenChange={setShowTransactionDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Détails de la transaction</DialogTitle>
                  <DialogDescription>
                    Consultez et gérez les détails de la transaction.
                  </DialogDescription>
                </DialogHeader>
                {selectedItem && (
                  <div className="grid gap-4 py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">ID de transaction</p>
                        <p className="font-medium">{selectedItem.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Montant</p>
                        <p className="font-medium text-lg">{selectedItem.amount.toLocaleString('fr-FR')} €</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Type</p>
                        <p className="capitalize">
                          {selectedItem.type === 'donation' ? 'Don' : 
                           selectedItem.type === 'fundraising' ? 'Levée de fonds' : 
                           selectedItem.type === 'event_fee' ? 'Frais d\'événement' : 
                           selectedItem.type === 'sponsorship' ? 'Parrainage' : selectedItem.type}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Date</p>
                        <p>{new Date(selectedItem.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Association</p>
                      <p>{selectedItem.association}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Statut</p>
                      <p className={`${
                        selectedItem.status === 'completed' ? 'text-green-600' : 
                        'text-amber-600'
                      }`}>
                        {selectedItem.status === 'completed' ? 'Complété' : 'En attente'}
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Actions disponibles</p>
                      <div className="flex space-x-2">
                        {selectedItem.status === 'pending' ? (
                          <>
                            <Button 
                              variant="default" 
                              onClick={() => handleActionClick('Approbation', selectedItem)}
                            >
                              Approuver
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleActionClick('Rejet', selectedItem)}
                            >
                              Rejeter
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="outline" 
                            onClick={() => handleActionClick('Téléchargement du reçu', selectedItem)}
                          >
                            Télécharger le reçu
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowTransactionDialog(false)}>Fermer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion des Notifications</CardTitle>
                    <CardDescription>Gérer toutes les notifications de la plateforme</CardDescription>
                  </div>
                  <Button size="sm">
                    <Bell className="mr-2 h-4 w-4" />
                    Nouvelle Notification
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentNotifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">{notification.title}</TableCell>
                        <TableCell>
                          <span className="capitalize">
                            {notification.category === 'associations' ? 'Associations' : 
                             notification.category === 'events' ? 'Événements' : 
                             notification.category === 'projects' ? 'Projets' : 
                             notification.category === 'financial' ? 'Finance' : 'Messages'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            notification.type === 'info' ? 'bg-blue-100 text-blue-800' : 
                            notification.type === 'success' ? 'bg-green-100 text-green-800' : 
                            notification.type === 'warning' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {notification.type === 'info' ? 'Info' : 
                             notification.type === 'success' ? 'Succès' : 
                             notification.type === 'warning' ? 'Avertissement' : 'Erreur'}
                          </span>
                        </TableCell>
                        <TableCell>{notification.timestamp.toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleActionClick('Envoi', notification)}
                            >
                              <span className="sr-only">Envoyer</span>
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleActionClick('Suppression', notification)}
                            >
                              <span className="sr-only">Supprimer</span>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Affichage de 5 sur {statsData.activeNotifications} notifications
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Précédent</Button>
                  <Button variant="outline" size="sm">Suivant</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;

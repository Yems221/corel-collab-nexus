
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useNotifications } from '@/context/NotificationContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FinancialOverview from "@/components/financial/FinancialOverview";
import FundraisingCampaignCard from "@/components/financial/FundraisingCampaignCard";
import TransactionTable from "@/components/financial/TransactionTable";
import { FundraisingTransaction, FundraisingCampaign, FinancialStats } from "@/types/financial";
import { PlusCircle, CreditCard, Euro, DollarSign, Banknote, Wallet, BadgeEuro, ChartBar } from 'lucide-react';

// Mock data for demonstration
const mockTransactions: FundraisingTransaction[] = [
  {
    id: '1',
    date: new Date(2023, 4, 15),
    amount: 250,
    source: 'Donation en ligne',
    description: 'Don mensuel récurrent',
    status: 'completed',
    type: 'donation'
  },
  {
    id: '2',
    date: new Date(2023, 4, 10),
    amount: 1500,
    source: 'Subvention municipale',
    description: 'Subvention pour le projet de jardinage',
    status: 'completed',
    type: 'grant'
  },
  {
    id: '3',
    date: new Date(2023, 4, 5),
    amount: 350,
    source: 'Événement bénéfice',
    description: 'Vente de billets pour la soirée caritative',
    status: 'completed',
    type: 'event'
  },
  {
    id: '4',
    date: new Date(2023, 3, 28),
    amount: 120,
    source: 'Cotisations',
    description: 'Cotisations des nouveaux membres',
    status: 'completed',
    type: 'membership'
  },
  {
    id: '5',
    date: new Date(2023, 3, 20),
    amount: 750,
    source: 'Campagne en ligne',
    description: 'Campagne de financement participatif',
    status: 'pending',
    type: 'donation'
  }
];

const mockCampaigns: FundraisingCampaign[] = [
  {
    id: '1',
    title: 'Rénovation du parc de jeux',
    description: 'Collecte de fonds pour la rénovation du parc de jeux du quartier.',
    target: 5000,
    current: 2750,
    startDate: new Date(2023, 3, 1),
    endDate: new Date(2023, 5, 30),
    status: 'active'
  },
  {
    id: '2',
    title: 'Programme d\'éducation environnementale',
    description: 'Financement pour les ateliers d\'éducation environnementale dans les écoles locales.',
    target: 3000,
    current: 1200,
    startDate: new Date(2023, 4, 15),
    endDate: new Date(2023, 7, 15),
    status: 'active'
  },
  {
    id: '3',
    title: 'Festival culturel annuel',
    description: 'Organisation du festival culturel qui célèbre la diversité de notre communauté.',
    target: 8000,
    current: 2000,
    startDate: new Date(2023, 2, 1),
    endDate: new Date(2023, 8, 1),
    status: 'active'
  }
];

const mockStats: FinancialStats = {
  totalRaised: 12500,
  totalExpenses: 4800,
  balance: 7700,
  campaignsCount: 3
};

const FinancialDashboard: React.FC = () => {
  const { type, id } = useParams<{ type: string, id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [transactions, setTransactions] = useState<FundraisingTransaction[]>(mockTransactions);
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>(mockCampaigns);
  const [stats, setStats] = useState<FinancialStats>(mockStats);
  const [newTransactionOpen, setNewTransactionOpen] = useState(false);
  const [newCampaignOpen, setNewCampaignOpen] = useState(false);
  const { addNotification } = useNotifications();

  // Form states
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionSource, setTransactionSource] = useState("");
  const [transactionType, setTransactionType] = useState("donation");
  const [transactionDescription, setTransactionDescription] = useState("");

  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignTarget, setCampaignTarget] = useState("");
  const [campaignEndDate, setCampaignEndDate] = useState("");

  const addTransaction = () => {
    const amount = parseFloat(transactionAmount);
    if (isNaN(amount) || amount <= 0) {
      addNotification({
        title: "Erreur",
        message: "Veuillez entrer un montant valide",
        type: "error",
        category: "financial",
      });
      return;
    }

    const newTransaction: FundraisingTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date(),
      amount,
      source: transactionSource,
      description: transactionDescription,
      status: 'completed',
      type: transactionType as any,
    };

    setTransactions([newTransaction, ...transactions]);
    
    // Update stats
    setStats({
      ...stats,
      totalRaised: stats.totalRaised + amount,
      balance: stats.balance + amount,
    });

    addNotification({
      title: "Transaction ajoutée",
      message: `${amount}€ ont été ajoutés avec succès`,
      type: "success",
      category: "financial",
    });

    // Reset form
    setTransactionAmount("");
    setTransactionSource("");
    setTransactionDescription("");
    setTransactionType("donation");
    setNewTransactionOpen(false);
  };

  const addCampaign = () => {
    const target = parseFloat(campaignTarget);
    if (isNaN(target) || target <= 0) {
      addNotification({
        title: "Erreur",
        message: "Veuillez entrer un objectif valide",
        type: "error",
        category: "financial",
      });
      return;
    }

    const newCampaign: FundraisingCampaign = {
      id: `camp-${Date.now()}`,
      title: campaignTitle,
      description: campaignDescription,
      target,
      current: 0,
      startDate: new Date(),
      endDate: campaignEndDate ? new Date(campaignEndDate) : null,
      status: 'active',
    };

    setCampaigns([...campaigns, newCampaign]);
    
    // Update stats
    setStats({
      ...stats,
      campaignsCount: stats.campaignsCount + 1,
    });

    addNotification({
      title: "Campagne créée",
      message: `La campagne "${campaignTitle}" a été créée avec succès`,
      type: "success",
      category: "financial",
    });

    // Reset form
    setCampaignTitle("");
    setCampaignDescription("");
    setCampaignTarget("");
    setCampaignEndDate("");
    setNewCampaignOpen(false);
  };

  const entityName = type === 'association' ? 'Association' : 'Projet';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tableau de bord financier
              </h1>
              <p className="text-gray-600 mt-1">
                {entityName} #{id}
              </p>
            </div>
            <div className="flex space-x-2">
              <Dialog open={newTransactionOpen} onOpenChange={setNewTransactionOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Banknote className="mr-2 h-4 w-4" />
                    Ajouter une transaction
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nouvelle transaction</DialogTitle>
                    <DialogDescription>
                      Enregistrez une nouvelle transaction dans le système.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Montant (€)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        className="col-span-3"
                        placeholder="0.00"
                        value={transactionAmount}
                        onChange={(e) => setTransactionAmount(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="source" className="text-right">
                        Source
                      </Label>
                      <Input
                        id="source"
                        className="col-span-3"
                        placeholder="Ex: Donation en ligne"
                        value={transactionSource}
                        onChange={(e) => setTransactionSource(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select
                        value={transactionType}
                        onValueChange={setTransactionType}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="donation">Don</SelectItem>
                          <SelectItem value="grant">Subvention</SelectItem>
                          <SelectItem value="event">Événement</SelectItem>
                          <SelectItem value="membership">Cotisation</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        className="col-span-3"
                        placeholder="Détails de la transaction"
                        value={transactionDescription}
                        onChange={(e) => setTransactionDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={addTransaction}>Enregistrer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={newCampaignOpen} onOpenChange={setNewCampaignOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nouvelle campagne
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Nouvelle campagne de collecte</DialogTitle>
                    <DialogDescription>
                      Créez une nouvelle campagne de collecte de fonds.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Titre
                      </Label>
                      <Input
                        id="title"
                        className="col-span-3"
                        placeholder="Titre de la campagne"
                        value={campaignTitle}
                        onChange={(e) => setCampaignTitle(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="c-description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="c-description"
                        className="col-span-3"
                        placeholder="Description de la campagne"
                        value={campaignDescription}
                        onChange={(e) => setCampaignDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="target" className="text-right">
                        Objectif (€)
                      </Label>
                      <Input
                        id="target"
                        type="number"
                        className="col-span-3"
                        placeholder="0.00"
                        value={campaignTarget}
                        onChange={(e) => setCampaignTarget(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="end-date" className="text-right">
                        Date de fin
                      </Label>
                      <Input
                        id="end-date"
                        type="date"
                        className="col-span-3"
                        value={campaignEndDate}
                        onChange={(e) => setCampaignEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={addCampaign}>Créer la campagne</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <FinancialOverview stats={stats} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transactions récentes</CardTitle>
                  <CardDescription>
                    Les 5 dernières transactions enregistrées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Montant</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.slice(0, 5).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                          <TableCell>{transaction.source}</TableCell>
                          <TableCell className="text-right font-medium">
                            {transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("transactions")}>
                    Voir toutes les transactions
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Campagnes actives</CardTitle>
                  <CardDescription>
                    Progression des campagnes de collecte en cours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {campaigns.filter(c => c.status === 'active').slice(0, 3).map((campaign) => (
                    <div key={campaign.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{campaign.title}</span>
                        <span className="text-sm text-right">{Math.round((campaign.current / campaign.target) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(campaign.current / campaign.target) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{campaign.current.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                        <span>Objectif: {campaign.target.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("campaigns")}>
                    Voir toutes les campagnes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <TransactionTable transactions={transactions} />
          </TabsContent>
          
          <TabsContent value="campaigns">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <FundraisingCampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FinancialDashboard;


import React, { useState } from 'react';
import { FundraisingTransaction } from '@/types/financial';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeEuro, Download, Search, Filter } from 'lucide-react';

interface TransactionTableProps {
  transactions: FundraisingTransaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'donation':
        return 'Don';
      case 'grant':
        return 'Subvention';
      case 'event':
        return 'Événement';
      case 'membership':
        return 'Cotisation';
      default:
        return 'Autre';
    }
  };
  
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      tx.source.toLowerCase().includes(search.toLowerCase()) ||
      tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.amount.toString().includes(search);
      
    const matchesFilter = filter === 'all' || tx.type === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  const exportCSV = () => {
    const headers = ['Date', 'Montant', 'Source', 'Description', 'Statut', 'Type'];
    const csvData = filteredTransactions.map(tx => [
      tx.date.toLocaleDateString(),
      tx.amount,
      tx.source,
      tx.description,
      tx.status,
      getTypeLabel(tx.type)
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Historique des transactions financières
            </CardDescription>
          </div>
          <Button variant="outline" onClick={exportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une transaction..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-[200px]">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="donation">Dons</SelectItem>
                <SelectItem value="grant">Subventions</SelectItem>
                <SelectItem value="event">Événements</SelectItem>
                <SelectItem value="membership">Cotisations</SelectItem>
                <SelectItem value="other">Autres</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{transaction.source}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      {getTypeLabel(transaction.type)}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(transaction.status)}`}>
                        {transaction.status === 'completed' ? 'Complété' :
                         transaction.status === 'pending' ? 'En attente' :
                         'Annulé'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Aucune transaction trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;

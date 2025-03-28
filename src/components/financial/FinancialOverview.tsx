
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { FinancialStats } from "@/types/financial";
import { 
  BadgeEuro, 
  ArrowDown, 
  ArrowUp, 
  Wallet, 
  PiggyBank
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FinancialOverviewProps {
  stats: FinancialStats;
}

// Mock data for the chart
const mockChartData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Fév', amount: 1900 },
  { name: 'Mar', amount: 800 },
  { name: 'Avr', amount: 2780 },
  { name: 'Mai', amount: 3000 },
  { name: 'Juin', amount: 1500 },
];

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total des dons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BadgeEuro className="mr-2 h-4 w-4 text-primary" />
              <div className="text-2xl font-bold">
                {stats.totalRaised.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dépenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowDown className="mr-2 h-4 w-4 text-destructive" />
              <div className="text-2xl font-bold">
                {stats.totalExpenses.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Solde actuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wallet className="mr-2 h-4 w-4 text-green-600" />
              <div className="text-2xl font-bold">
                {stats.balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Campagnes actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <PiggyBank className="mr-2 h-4 w-4 text-blue-600" />
              <div className="text-2xl font-bold">{stats.campaignsCount}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Évolution des revenus</CardTitle>
          <CardDescription>
            Montants collectés au cours des 6 derniers mois
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} €`, "Montant"]}
                  labelFormatter={(label) => `Mois: ${label}`}
                />
                <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialOverview;

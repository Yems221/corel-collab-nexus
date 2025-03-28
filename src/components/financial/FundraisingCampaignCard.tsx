
import React from 'react';
import { FundraisingCampaign } from '@/types/financial';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgeEuro, Calendar, Users } from 'lucide-react';

interface FundraisingCampaignCardProps {
  campaign: FundraisingCampaign;
}

const FundraisingCampaignCard: React.FC<FundraisingCampaignCardProps> = ({ campaign }) => {
  const progress = Math.round((campaign.current / campaign.target) * 100);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{campaign.title}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            campaign.status === 'active' ? 'bg-green-100 text-green-800' :
            campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {campaign.status === 'active' ? 'En cours' :
             campaign.status === 'completed' ? 'Terminé' :
             'Planifié'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {campaign.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{progress}% atteint</span>
            <span>{campaign.current.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} sur {campaign.target.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              {campaign.endDate 
                ? `Jusqu'au ${campaign.endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`
                : 'Pas de date de fin'}
            </span>
          </div>
          
          <div className="flex items-center">
            <BadgeEuro className="h-4 w-4 mr-1" />
            <span>
              {campaign.status === 'active' 
                ? `Reste: ${(campaign.target - campaign.current).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`
                : campaign.status === 'completed'
                ? 'Objectif atteint'
                : 'À venir'}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Détails
        </Button>
        {campaign.status === 'active' && (
          <Button size="sm">
            <BadgeEuro className="h-4 w-4 mr-2" />
            Ajouter des fonds
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FundraisingCampaignCard;

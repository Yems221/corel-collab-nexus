
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type AssociationProps = {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  eventsCount: number;
  createdAt: string;
  imageUrl?: string;
};

const AssociationCard: React.FC<AssociationProps> = ({
  id,
  name,
  description,
  category,
  memberCount,
  eventsCount,
  createdAt,
  imageUrl,
}) => {
  return (
    <Link 
      to={`/associations/${id}`}
      className="block group"
    >
      <div className="h-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        {/* Association Image */}
        <div className="h-36 overflow-hidden relative">
          <img
            src={imageUrl || `https://source.unsplash.com/random/400x200/?organization&id=${id}`}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <Badge 
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white/80"
          >
            {category}
          </Badge>
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-4">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
          
          <div className="pt-2 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{memberCount} membres</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{eventsCount} événements</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Créée le {new Date(createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AssociationCard;

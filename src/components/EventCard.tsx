
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type EventProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees?: number;
  isPaid: boolean;
  price?: number;
  imageUrl?: string;
  associationName: string;
  associationId: string;
};

const EventCard: React.FC<EventProps> = ({
  id,
  title,
  description,
  date,
  location,
  attendees,
  maxAttendees,
  isPaid,
  price,
  imageUrl,
  associationName,
  associationId,
}) => {
  const eventDate = new Date(date);
  const isUpcoming = eventDate > new Date();
  
  const formattedDate = eventDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  
  const formattedTime = eventDate.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const attendanceStatus = maxAttendees 
    ? `${attendees}/${maxAttendees} participants`
    : `${attendees} participants`;
    
  const capacityPercentage = maxAttendees ? (attendees / maxAttendees) * 100 : 0;
  const capacityColor = capacityPercentage > 80 
    ? 'bg-red-500' 
    : capacityPercentage > 50 
      ? 'bg-yellow-500' 
      : 'bg-green-500';

  return (
    <Link 
      to={`/events/${id}`}
      className="block group"
    >
      <div className="h-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        {/* Event Image */}
        <div className="h-40 overflow-hidden relative">
          <img
            src={imageUrl || `https://source.unsplash.com/random/400x200/?event&id=${id}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Association Badge */}
          <Link 
            to={`/associations/${associationId}`}
            className="absolute top-3 left-3 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Badge 
              className="bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white/80"
            >
              {associationName}
            </Badge>
          </Link>
          
          {/* Price Badge */}
          {isPaid ? (
            <Badge 
              className="absolute bottom-3 right-3 bg-primary/90 backdrop-blur-sm"
            >
              <Ticket className="mr-1 h-3 w-3" />
              {price}€
            </Badge>
          ) : (
            <Badge 
              className="absolute bottom-3 right-3 bg-green-500/90 backdrop-blur-sm"
            >
              Gratuit
            </Badge>
          )}
          
          {/* Date Badge */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-md px-3 py-1 text-xs font-medium text-gray-800">
            {formattedDate} · {formattedTime}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span className="truncate">{location}</span>
          </div>
          
          {/* Attendance */}
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 flex items-center">
                <Users size={16} className="mr-1" />
                {attendanceStatus}
              </span>
              {maxAttendees && (
                <span className={cn(
                  'text-xs font-medium',
                  capacityPercentage > 80 ? 'text-red-600' : 
                  capacityPercentage > 50 ? 'text-yellow-600' : 'text-green-600'
                )}>
                  {capacityPercentage > 80 ? 'Presque complet' : 
                   capacityPercentage > 50 ? 'Se remplit' : 'Places disponibles'}
                </span>
              )}
            </div>
            
            {maxAttendees && (
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={cn('h-1.5 rounded-full', capacityColor)}
                  style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

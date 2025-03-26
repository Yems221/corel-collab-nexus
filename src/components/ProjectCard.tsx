
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type ProjectStatus = 'not_started' | 'in_progress' | 'completed' | 'on_hold';

type ProjectProps = {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  endDate?: string;
  memberCount: number;
  tasksCompleted: number;
  totalTasks: number;
  associationName: string;
  associationId: string;
  groupName?: string;
  groupId?: string;
};

const ProjectCard: React.FC<ProjectProps> = ({
  id,
  title,
  description,
  status,
  progress,
  startDate,
  endDate,
  memberCount,
  tasksCompleted,
  totalTasks,
  associationName,
  associationId,
  groupName,
  groupId,
}) => {
  const statusConfig = {
    not_started: {
      label: 'Pas commencé',
      color: 'bg-gray-500',
      textColor: 'text-gray-600',
    },
    in_progress: {
      label: 'En cours',
      color: 'bg-primary',
      textColor: 'text-primary',
    },
    completed: {
      label: 'Terminé',
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
    on_hold: {
      label: 'En pause',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
    },
  };
  
  const currentStatus = statusConfig[status];
  
  const formattedStartDate = new Date(startDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  
  const formattedEndDate = endDate 
    ? new Date(endDate).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <Link 
      to={`/projects/${id}`}
      className="block group"
    >
      <div className="h-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6 space-y-4">
          {/* Header with status */}
          <div className="flex justify-between items-start">
            <div>
              <Badge 
                className={cn(
                  "mb-2",
                  currentStatus.color !== 'bg-primary' && "bg-opacity-15 text-opacity-100",
                  currentStatus.textColor
                )}
                variant={status === 'in_progress' ? 'default' : 'outline'}
              >
                {status === 'completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                {currentStatus.label}
              </Badge>
              
              {groupName && (
                <Link 
                  to={`/associations/${associationId}/groups/${groupId}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Badge 
                    variant="outline" 
                    className="ml-2 bg-secondary/50 hover:bg-secondary text-secondary-foreground"
                  >
                    {groupName}
                  </Badge>
                </Link>
              )}
            </div>
            
            <Link 
              to={`/associations/${associationId}`}
              className="flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Badge variant="outline">
                {associationName}
              </Badge>
            </Link>
          </div>
          
          {/* Title and description */}
          <div>
            <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
              {description}
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progression</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Stats */}
          <div className="pt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{memberCount} membres</span>
            </div>
            
            <div className="flex items-center gap-1">
              <CheckCircle size={16} />
              <span>{tasksCompleted}/{totalTasks} tâches</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Début: {formattedStartDate}</span>
            </div>
            
            {formattedEndDate && (
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Fin: {formattedEndDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

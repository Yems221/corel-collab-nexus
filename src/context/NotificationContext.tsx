
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification, NotificationType, NotificationCategory } from '@/components/NotificationCenter';
import { useToast } from '@/hooks/use-toast';

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Mock notifications for demonstration
const generateMockNotifications = (): Notification[] => {
  return [
    {
      id: '1',
      title: 'Nouvelle inscription',
      message: 'Paul Dubois a rejoint l\'Association des Riverains',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      type: 'info',
      category: 'associations',
      link: '/associations/1',
    },
    {
      id: '2',
      title: 'Événement à venir',
      message: 'Assemblée générale dans 2 jours',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
      type: 'info',
      category: 'events',
      link: '/events/2',
    },
    {
      id: '3',
      title: 'Mise à jour de projet',
      message: 'Le projet "Rénovation" est désormais terminé',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: false,
      type: 'success',
      category: 'projects',
      link: '/projects/3',
    },
    {
      id: '4',
      title: 'Nouveau message',
      message: 'Marie a commenté sur le projet "Jardin partagé"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
      read: false,
      type: 'info',
      category: 'messages',
      link: '/projects/5',
    },
    {
      id: '5',
      title: 'Problème détecté',
      message: 'L\'événement "Fête de quartier" a un conflit d\'horaire',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      read: true,
      type: 'warning',
      category: 'events',
      link: '/events/6',
    },
  ];
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(generateMockNotifications());
  const { toast } = useToast();
  const unreadCount = notifications.filter(notification => !notification.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Show a toast for new notifications
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === 'error' ? 'destructive' : 'default',
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAllAsRead,
      markAsRead,
      deleteNotification,
      unreadCount,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

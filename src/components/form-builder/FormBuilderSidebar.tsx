import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlusCircle, Type, Hash, Calendar, Clock, Mail, Phone, CheckSquare, Circle, FileText, MapPin, Link as LinkIcon, AlignJustify, SplitSquareVertical } from 'lucide-react';

interface FormBuilderSidebarProps {
  onAddField: (fieldType: string) => void;
  onAddSection: () => void;
}

const FormBuilderSidebar: React.FC<FormBuilderSidebarProps> = ({ 
  onAddField,
  onAddSection
}) => {
  // Define field types with icons
  const basicFields = [
    { type: 'text', label: 'Texte court', icon: Type },
    { type: 'textarea', label: 'Texte long', icon: AlignJustify },
    { type: 'email', label: 'Email', icon: Mail },
    { type: 'number', label: 'Nombre', icon: Hash },
    { type: 'tel', label: 'Téléphone', icon: Phone },
    { type: 'date', label: 'Date', icon: Calendar },
    { type: 'time', label: 'Heure', icon: Clock },
  ];
  
  const advancedFields = [
    { type: 'select', label: 'Liste déroulante', icon: SplitSquareVertical },
    { type: 'checkbox', label: 'Cases à cocher', icon: CheckSquare },
    { type: 'radio', label: 'Boutons radio', icon: Circle },
    { type: 'file', label: 'Fichier', icon: FileText },
    { type: 'address', label: 'Adresse', icon: MapPin },
    { type: 'url', label: 'URL', icon: LinkIcon },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 border-r">
      <Button 
        className="w-full mb-4" 
        onClick={onAddSection}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Ajouter une section
      </Button>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Champs</CardTitle>
          <CardDescription>Glissez ou cliquez pour ajouter</CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <Accordion type="single" collapsible defaultValue="basic">
            <AccordionItem value="basic">
              <AccordionTrigger className="px-4">Champs basiques</AccordionTrigger>
              <AccordionContent className="pt-0">
                <div className="space-y-1 p-1">
                  {basicFields.map((field) => (
                    <div
                      key={field.type}
                      className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
                      onClick={() => onAddField(field.type)}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('field_type', field.type);
                      }}
                    >
                      <field.icon className="mr-2 h-4 w-4" />
                      <span>{field.label}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="advanced">
              <AccordionTrigger className="px-4">Champs avancés</AccordionTrigger>
              <AccordionContent className="pt-0">
                <div className="space-y-1 p-1">
                  {advancedFields.map((field) => (
                    <div
                      key={field.type}
                      className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
                      onClick={() => onAddField(field.type)}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('field_type', field.type);
                      }}
                    >
                      <field.icon className="mr-2 h-4 w-4" />
                      <span>{field.label}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormBuilderSidebar;

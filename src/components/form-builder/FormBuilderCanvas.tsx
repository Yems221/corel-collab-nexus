
import React from 'react';
import { FormTemplate, FormSection, FormField } from '../../types/form-builder';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Grip, Settings, Trash2, Copy, ChevronUp, ChevronDown, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormBuilderCanvasProps {
  formTemplate: FormTemplate;
  selectedSectionId: string | null;
  selectedFieldId: string | null;
  onSelectSection: (sectionId: string) => void;
  onSelectField: (fieldId: string) => void;
  onUpdateField: (sectionId: string, fieldId: string, updates: Partial<FormField>) => void;
  onUpdateSection: (sectionId: string, updates: Partial<FormSection>) => void;
  onRemoveField: (sectionId: string, fieldId: string) => void;
  onRemoveSection: (sectionId: string) => void;
  onReorderFields: (sectionId: string, startIndex: number, endIndex: number) => void;
  onReorderSections: (startIndex: number, endIndex: number) => void;
}

const FormBuilderCanvas: React.FC<FormBuilderCanvasProps> = ({
  formTemplate,
  selectedSectionId,
  selectedFieldId,
  onSelectSection,
  onSelectField,
  onUpdateField,
  onUpdateSection,
  onRemoveField,
  onRemoveSection,
  onReorderFields,
  onReorderSections
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState('form');
  
  const selectedSection = formTemplate.sections.find(s => s.id === selectedSectionId);
  const selectedField = selectedSection?.fields.find(f => f.id === selectedFieldId);

  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;
    
    // Dropped outside the list
    if (!destination) {
      return;
    }
    
    // If the item was dropped in a different position
    if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
      if (type === 'section') {
        onReorderSections(source.index, destination.index);
      } else if (type === 'field') {
        onReorderFields(source.droppableId, source.index, destination.index);
      }
    }
  };

  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
      case 'url':
        return (
          <Input 
            type={field.type} 
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`} 
            disabled 
          />
        );
      case 'textarea':
        return (
          <Textarea 
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`} 
            disabled 
          />
        );
      case 'date':
      case 'time':
        return (
          <Input 
            type={field.type} 
            disabled 
          />
        );
      case 'select':
        return (
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50" disabled>
            <option value="">{field.placeholder || 'Sélectionnez une option'}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            )) || []}
          </select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={`preview-${field.id}`} disabled />
            <label htmlFor={`preview-${field.id}`} className="text-sm font-medium leading-none">
              {field.options?.[0]?.label || field.label}
            </label>
          </div>
        );
      case 'radio':
        return (
          <div className="flex items-center space-x-2">
            <input type="radio" id={`preview-${field.id}`} disabled className="h-4 w-4" />
            <label htmlFor={`preview-${field.id}`} className="text-sm font-medium leading-none">
              {field.options?.[0]?.label || field.label}
            </label>
          </div>
        );
      case 'file':
        return (
          <Input 
            type="file" 
            disabled 
          />
        );
      case 'address':
        return (
          <div className="space-y-2">
            <Input placeholder="Adresse" disabled />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Ville" disabled />
              <Input placeholder="Code postal" disabled />
            </div>
          </div>
        );
      default:
        return <Input disabled />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b px-4">
          <TabsList className="mb-0">
            <TabsTrigger value="form">Formulaire</TabsTrigger>
            {selectedFieldId && <TabsTrigger value="field">Propriétés du champ</TabsTrigger>}
            {selectedSectionId && <TabsTrigger value="section">Propriétés de la section</TabsTrigger>}
          </TabsList>
        </div>
        
        <TabsContent value="form" className="flex-1 overflow-y-auto p-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections" type="section">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-6"
                >
                  {formTemplate.sections.length === 0 ? (
                    <div className="text-center p-8 border-2 border-dashed rounded-md">
                      <p className="text-muted-foreground mb-4">Aucune section dans ce formulaire</p>
                      <Button onClick={() => onReorderSections(0, 0)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Ajouter une section
                      </Button>
                    </div>
                  ) : (
                    formTemplate.sections.map((section, sectionIndex) => (
                      <Draggable 
                        key={section.id} 
                        draggableId={section.id} 
                        index={sectionIndex}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border rounded-md ${selectedSectionId === section.id ? 'ring-2 ring-primary' : ''}`}
                            onClick={() => onSelectSection(section.id)}
                          >
                            <div className="bg-muted p-2 rounded-t-md flex items-center justify-between">
                              <div className="flex items-center">
                                <div {...provided.dragHandleProps} className="cursor-grab p-1 mr-2">
                                  <Grip className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <span className="font-medium">{section.title}</span>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectSection(section.id);
                                    setActiveTab('section');
                                  }}
                                >
                                  <Settings className="h-4 w-4" />
                                </Button>
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (formTemplate.sections.length > 1) {
                                      onRemoveSection(section.id);
                                    } else {
                                      toast({
                                        title: "Impossible de supprimer",
                                        description: "Le formulaire doit contenir au moins une section",
                                        variant: "destructive"
                                      });
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="p-4">
                              {section.description && (
                                <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                              )}
                              
                              <Droppable droppableId={section.id} type="field">
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="space-y-4"
                                  >
                                    {section.fields.length === 0 ? (
                                      <div className="text-center p-6 border border-dashed rounded-md">
                                        <p className="text-muted-foreground">
                                          Ajoutez des champs depuis le panneau de gauche
                                        </p>
                                      </div>
                                    ) : (
                                      section.fields.map((field, fieldIndex) => (
                                        <Draggable 
                                          key={field.id} 
                                          draggableId={field.id} 
                                          index={fieldIndex}
                                        >
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              className={`border p-3 rounded-md ${selectedFieldId === field.id ? 'ring-2 ring-primary bg-accent/10' : 'hover:bg-accent/5'}`}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                onSelectField(field.id);
                                              }}
                                            >
                                              <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center">
                                                  <div 
                                                    {...provided.dragHandleProps} 
                                                    className="cursor-grab p-1 mr-2"
                                                  >
                                                    <Grip className="h-4 w-4 text-muted-foreground" />
                                                  </div>
                                                  <div>
                                                    <div className="flex items-center">
                                                      <label className="text-sm font-medium">
                                                        {field.label}
                                                        {field.required && <span className="text-destructive ml-1">*</span>}
                                                      </label>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                      {field.type}
                                                    </span>
                                                  </div>
                                                </div>
                                                
                                                <div className="flex items-center space-x-1">
                                                  <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      onSelectField(field.id);
                                                      setActiveTab('field');
                                                    }}
                                                  >
                                                    <Settings className="h-4 w-4" />
                                                  </Button>
                                                  <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      onRemoveField(section.id, field.id);
                                                    }}
                                                  >
                                                    <Trash2 className="h-4 w-4" />
                                                  </Button>
                                                </div>
                                              </div>
                                              
                                              <div className="mt-2">
                                                {renderFieldPreview(field)}
                                              </div>
                                              
                                              {field.helpText && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                  {field.helpText}
                                                </p>
                                              )}
                                            </div>
                                          )}
                                        </Draggable>
                                      ))
                                    )}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TabsContent>
        
        <TabsContent value="field" className="overflow-y-auto p-4">
          {selectedField && selectedSection && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Propriétés du champ</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Label</label>
                  <Input 
                    value={selectedField.label} 
                    onChange={(e) => onUpdateField(selectedSection.id, selectedField.id, { label: e.target.value })} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom (identifiant)</label>
                  <Input 
                    value={selectedField.name} 
                    onChange={(e) => onUpdateField(selectedSection.id, selectedField.id, { name: e.target.value })} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Placeholder</label>
                  <Input 
                    value={selectedField.placeholder || ''} 
                    onChange={(e) => onUpdateField(selectedSection.id, selectedField.id, { placeholder: e.target.value })} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Texte d'aide</label>
                  <Input 
                    value={selectedField.helpText || ''} 
                    onChange={(e) => onUpdateField(selectedSection.id, selectedField.id, { helpText: e.target.value })} 
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="required" 
                    checked={selectedField.required} 
                    onCheckedChange={(checked) => onUpdateField(selectedSection.id, selectedField.id, { required: !!checked })} 
                  />
                  <label htmlFor="required" className="text-sm font-medium">Champ obligatoire</label>
                </div>
                
                {['select', 'checkbox', 'radio'].includes(selectedField.type) && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Options</label>
                    <div className="space-y-2">
                      {(selectedField.options || []).map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Input 
                            value={option.label} 
                            onChange={(e) => {
                              const newOptions = [...(selectedField.options || [])];
                              newOptions[idx] = { ...newOptions[idx], label: e.target.value };
                              onUpdateField(selectedSection.id, selectedField.id, { options: newOptions });
                            }} 
                            placeholder="Label" 
                          />
                          <Input 
                            value={option.value} 
                            onChange={(e) => {
                              const newOptions = [...(selectedField.options || [])];
                              newOptions[idx] = { ...newOptions[idx], value: e.target.value };
                              onUpdateField(selectedSection.id, selectedField.id, { options: newOptions });
                            }} 
                            placeholder="Valeur" 
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              const newOptions = [...(selectedField.options || [])];
                              newOptions.splice(idx, 1);
                              onUpdateField(selectedSection.id, selectedField.id, { options: newOptions });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newOptions = [...(selectedField.options || []), { label: '', value: '' }];
                          onUpdateField(selectedSection.id, selectedField.id, { options: newOptions });
                        }}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Ajouter une option
                      </Button>
                    </div>
                  </div>
                )}
                
                {['number', 'text', 'textarea'].includes(selectedField.type) && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Validation</h4>
                    
                    {selectedField.type === 'number' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs">Valeur minimale</label>
                          <Input 
                            type="number" 
                            value={selectedField.validation?.min || ''} 
                            onChange={(e) => {
                              const min = e.target.value ? Number(e.target.value) : undefined;
                              onUpdateField(selectedSection.id, selectedField.id, { 
                                validation: { ...selectedField.validation, min } 
                              });
                            }} 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs">Valeur maximale</label>
                          <Input 
                            type="number" 
                            value={selectedField.validation?.max || ''} 
                            onChange={(e) => {
                              const max = e.target.value ? Number(e.target.value) : undefined;
                              onUpdateField(selectedSection.id, selectedField.id, { 
                                validation: { ...selectedField.validation, max } 
                              });
                            }} 
                          />
                        </div>
                      </div>
                    )}
                    
                    {(selectedField.type === 'text' || selectedField.type === 'textarea') && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs">Longueur min.</label>
                          <Input 
                            type="number" 
                            value={selectedField.validation?.minLength || ''} 
                            onChange={(e) => {
                              const minLength = e.target.value ? Number(e.target.value) : undefined;
                              onUpdateField(selectedSection.id, selectedField.id, { 
                                validation: { ...selectedField.validation, minLength } 
                              });
                            }} 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs">Longueur max.</label>
                          <Input 
                            type="number" 
                            value={selectedField.validation?.maxLength || ''} 
                            onChange={(e) => {
                              const maxLength = e.target.value ? Number(e.target.value) : undefined;
                              onUpdateField(selectedSection.id, selectedField.id, { 
                                validation: { ...selectedField.validation, maxLength } 
                              });
                            }} 
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label className="text-xs">Expression régulière (pattern)</label>
                      <Input 
                        value={selectedField.validation?.pattern || ''} 
                        onChange={(e) => {
                          onUpdateField(selectedSection.id, selectedField.id, { 
                            validation: { ...selectedField.validation, pattern: e.target.value || undefined } 
                          });
                        }} 
                        placeholder="ex: ^[a-zA-Z0-9]+$" 
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="section" className="overflow-y-auto p-4">
          {selectedSection && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Propriétés de la section</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Titre</label>
                  <Input 
                    value={selectedSection.title} 
                    onChange={(e) => onUpdateSection(selectedSection.id, { title: e.target.value })} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={selectedSection.description || ''} 
                    onChange={(e) => onUpdateSection(selectedSection.id, { description: e.target.value })} 
                    placeholder="Description optionnelle de la section" 
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormBuilderCanvas;

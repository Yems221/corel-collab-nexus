import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DragDropContext } from '@hello-pangea/dnd';
import { 
  FormBuilderHeader, 
  FormBuilderSidebar, 
  FormBuilderCanvas, 
  FormPreview 
} from '../components/form-builder';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormTemplate, FormField, FormSection } from '../types/form-builder';

const FormBuilder = () => {
  const { user } = useAuth();
  const [formTemplate, setFormTemplate] = useState<FormTemplate>({
    id: `template-${Date.now()}`,
    name: 'Nouveau formulaire',
    description: 'Description du formulaire',
    sections: [
      {
        id: `section-${Date.now()}`,
        title: 'Informations générales',
        fields: [
          {
            id: `field-${Date.now()}`,
            type: 'text',
            name: 'name',
            label: 'Nom',
            placeholder: 'Entrez votre nom',
            required: true,
            order: 0,
          },
          {
            id: `field-${Date.now() + 1}`,
            type: 'email',
            name: 'email',
            label: 'Email',
            placeholder: 'Entrez votre email',
            required: true,
            order: 1,
          }
        ]
      }
    ],
    createdBy: user?.id || 'unknown',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(formTemplate.sections[0]?.id || null);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const handleSaveTemplate = () => {
    console.log('Saving template...', formTemplate);
    setFormTemplate({
      ...formTemplate,
      updatedAt: new Date().toISOString(),
    });
  };

  const addSection = () => {
    const newSection: FormSection = {
      id: `section-${Date.now()}`,
      title: `Nouvelle section ${formTemplate.sections.length + 1}`,
      fields: []
    };
    
    setFormTemplate({
      ...formTemplate,
      sections: [...formTemplate.sections, newSection]
    });
    
    setSelectedSectionId(newSection.id);
    setSelectedFieldId(null);
  };

  const addField = (sectionId: string, fieldType: string) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: fieldType as any,
      name: `field_${Date.now()}`,
      label: `Nouveau champ`,
      placeholder: 'Entrez une valeur',
      required: false,
      order: getHighestFieldOrder(sectionId) + 1,
    };
    
    setFormTemplate({
      ...formTemplate,
      sections: formTemplate.sections.map(section => 
        section.id === sectionId 
          ? { ...section, fields: [...section.fields, newField] }
          : section
      )
    });
    
    setSelectedFieldId(newField.id);
  };

  const getHighestFieldOrder = (sectionId: string): number => {
    const section = formTemplate.sections.find(s => s.id === sectionId);
    if (!section || section.fields.length === 0) return -1;
    return Math.max(...section.fields.map(f => f.order));
  };

  const updateField = (sectionId: string, fieldId: string, updates: Partial<FormField>) => {
    setFormTemplate({
      ...formTemplate,
      sections: formTemplate.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              fields: section.fields.map(field => 
                field.id === fieldId 
                  ? { ...field, ...updates }
                  : field
              )
            }
          : section
      )
    });
  };

  const updateSection = (sectionId: string, updates: Partial<FormSection>) => {
    setFormTemplate({
      ...formTemplate,
      sections: formTemplate.sections.map(section => 
        section.id === sectionId 
          ? { ...section, ...updates }
          : section
      )
    });
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setFormTemplate({
      ...formTemplate,
      sections: formTemplate.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              fields: section.fields.filter(field => field.id !== fieldId)
            }
          : section
      )
    });
    
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  const removeSection = (sectionId: string) => {
    setFormTemplate({
      ...formTemplate,
      sections: formTemplate.sections.filter(section => section.id !== sectionId)
    });
    
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(formTemplate.sections[0]?.id || null);
    }
    
    setSelectedFieldId(null);
  };

  const reorderFields = (sectionId: string, startIndex: number, endIndex: number) => {
    const section = formTemplate.sections.find(s => s.id === sectionId);
    if (!section) return;

    const result = Array.from(section.fields);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    const updatedFields = result.map((field, index) => ({
      ...field,
      order: index
    }));
    
    setFormTemplate({
      ...formTemplate,
      sections: formTemplate.sections.map(s => 
        s.id === sectionId 
          ? { ...s, fields: updatedFields }
          : s
      )
    });
  };

  const reorderSections = (startIndex: number, endIndex: number) => {
    const result = Array.from(formTemplate.sections);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    setFormTemplate({
      ...formTemplate,
      sections: result
    });
  };

  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;
    
    if (!destination) {
      return;
    }
    
    if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
      if (type === 'section') {
        reorderSections(source.index, destination.index);
      } else if (type === 'field') {
        reorderFields(source.droppableId, source.index, destination.index);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <FormBuilderHeader 
          formTemplate={formTemplate} 
          setFormTemplate={setFormTemplate}
          onSave={handleSaveTemplate}
        />
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'editor' | 'preview')}>
          <TabsList className="mb-4">
            <TabsTrigger value="editor">Éditeur</TabsTrigger>
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="w-full">
            <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
              <ResizablePanel defaultSize={25} minSize={20}>
                <FormBuilderSidebar 
                  onAddField={(fieldType) => selectedSectionId && addField(selectedSectionId, fieldType)}
                  onAddSection={addSection}
                />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={75}>
                <FormBuilderCanvas 
                  formTemplate={formTemplate}
                  selectedSectionId={selectedSectionId}
                  selectedFieldId={selectedFieldId}
                  onSelectSection={setSelectedSectionId}
                  onSelectField={setSelectedFieldId}
                  onUpdateField={updateField}
                  onUpdateSection={updateSection}
                  onRemoveField={removeField}
                  onRemoveSection={removeSection}
                  onReorderFields={reorderFields}
                  onReorderSections={reorderSections}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>
          
          <TabsContent value="preview">
            <FormPreview formTemplate={formTemplate} />
          </TabsContent>
        </Tabs>
      </DragDropContext>
    </div>
  );
};

export default FormBuilder;

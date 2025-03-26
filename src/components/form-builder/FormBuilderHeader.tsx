
import React from 'react';
import { FormTemplate } from '../../types/form-builder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Copy, DownloadCloud, Upload, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface FormBuilderHeaderProps {
  formTemplate: FormTemplate;
  setFormTemplate: React.Dispatch<React.SetStateAction<FormTemplate>>;
  onSave: () => void;
  associationId?: string | null;
}

const FormBuilderHeader: React.FC<FormBuilderHeaderProps> = ({ 
  formTemplate, 
  setFormTemplate, 
  onSave,
  associationId
}) => {
  const { toast } = useToast();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTemplate({
      ...formTemplate,
      name: e.target.value
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormTemplate({
      ...formTemplate,
      description: e.target.value
    });
  };

  const handleDuplicate = () => {
    const duplicated = {
      ...formTemplate,
      id: `template-${Date.now()}`,
      name: `${formTemplate.name} (copie)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Here you would typically save this to your database
    // For now we'll just show a toast
    toast({
      title: "Formulaire dupliqué",
      description: "Une copie du formulaire a été créée."
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formTemplate, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${formTemplate.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files?.length) return;
      
      const file = target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const template = JSON.parse(event.target?.result as string) as FormTemplate;
          setFormTemplate(template);
          toast({
            title: "Formulaire importé",
            description: "Le formulaire a été importé avec succès."
          });
        } catch (error) {
          toast({
            title: "Erreur d'importation",
            description: "Le fichier n'est pas un formulaire valide.",
            variant: "destructive"
          });
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  return (
    <div className="mb-6 space-y-4">
      {associationId && (
        <div className="mb-2">
          <Link to={`/associations/${associationId}?tab=forms`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'association
            </Button>
          </Link>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 space-y-2 w-full md:w-auto">
          <Input
            value={formTemplate.name}
            onChange={handleNameChange}
            placeholder="Nom du formulaire"
            className="text-xl font-semibold"
          />
          <Textarea
            value={formTemplate.description || ''}
            onChange={handleDescriptionChange}
            placeholder="Description du formulaire (optionnel)"
            className="h-20 resize-none"
          />
          {associationId && (
            <div className="text-sm text-muted-foreground mt-1">
              Ce formulaire sera associé à votre association
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button onClick={onSave} variant="default">
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
          <Button onClick={handleDuplicate} variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Dupliquer
          </Button>
          <Button onClick={handleExport} variant="outline">
            <DownloadCloud className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button onClick={handleImport} variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderHeader;

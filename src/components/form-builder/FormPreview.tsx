
import React from 'react';
import { FormTemplate } from '../../types/form-builder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface FormPreviewProps {
  formTemplate: FormTemplate;
}

const FormPreview: React.FC<FormPreviewProps> = ({ formTemplate }) => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        [name]: e.target.files[0].name
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields: string[] = [];
    
    formTemplate.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.required && !formData[field.name]) {
          requiredFields.push(field.label);
        }
      });
    });
    
    if (requiredFields.length > 0) {
      toast({
        title: "Formulaire incomplet",
        description: `Veuillez remplir les champs obligatoires : ${requiredFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Formulaire soumis",
      description: "Votre formulaire a été soumis avec succès."
    });
    
    console.log('Form data submitted:', formData);
  };
  
  const renderField = (field: any) => {
    const value = formData[field.name] || '';
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
      case 'url':
        return (
          <Input 
            type={field.type} 
            id={field.id} 
            name={field.name}
            value={value}
            onChange={handleInputChange}
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`} 
          />
        );
      case 'textarea':
        return (
          <Textarea 
            id={field.id} 
            name={field.name}
            value={value}
            onChange={handleInputChange}
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`} 
          />
        );
      case 'date':
      case 'time':
        return (
          <Input 
            type={field.type} 
            id={field.id} 
            name={field.name}
            value={value}
            onChange={handleInputChange}
          />
        );
      case 'select':
        return (
          <select 
            id={field.id} 
            name={field.name}
            value={value}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="">{field.placeholder || 'Sélectionnez une option'}</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            )) || []}
          </select>
        );
      case 'checkbox':
        if (field.options && field.options.length > 0) {
          return (
            <div className="space-y-2">
              {field.options.map((option: any, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${field.id}-${idx}`} 
                    checked={formData[`${field.name}-${option.value}`] || false}
                    onCheckedChange={(checked) => handleCheckboxChange(`${field.name}-${option.value}`, !!checked)}
                  />
                  <label htmlFor={`${field.id}-${idx}`} className="text-sm">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={field.id} 
                checked={formData[field.name] || false}
                onCheckedChange={(checked) => handleCheckboxChange(field.name, !!checked)}
              />
              <label htmlFor={field.id} className="text-sm">
                {field.label}
              </label>
            </div>
          );
        }
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option: any, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id={`${field.id}-${idx}`} 
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <label htmlFor={`${field.id}-${idx}`} className="text-sm">
                  {option.label}
                </label>
              </div>
            )) || []}
          </div>
        );
      case 'file':
        return (
          <Input 
            type="file" 
            id={field.id} 
            name={field.name}
            onChange={(e) => handleFileChange(e, field.name)}
          />
        );
      case 'address':
        return (
          <div className="space-y-2">
            <Input 
              id={`${field.id}-line1`} 
              name={`${field.name}_line1`}
              value={formData[`${field.name}_line1`] || ''}
              onChange={handleInputChange}
              placeholder="Adresse" 
            />
            <div className="grid grid-cols-2 gap-2">
              <Input 
                id={`${field.id}-city`} 
                name={`${field.name}_city`}
                value={formData[`${field.name}_city`] || ''}
                onChange={handleInputChange}
                placeholder="Ville" 
              />
              <Input 
                id={`${field.id}-zip`} 
                name={`${field.name}_zip`}
                value={formData[`${field.name}_zip`] || ''}
                onChange={handleInputChange}
                placeholder="Code postal" 
              />
            </div>
          </div>
        );
      default:
        return <Input />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{formTemplate.name}</h2>
        {formTemplate.description && (
          <p className="text-muted-foreground mt-2">{formTemplate.description}</p>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {formTemplate.sections.map((section) => (
          <div key={section.id} className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-2">{section.title}</h3>
            {section.description && (
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
            )}
            
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <div className="flex items-center">
                    <label htmlFor={field.id} className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                  </div>
                  
                  {renderField(field)}
                  
                  {field.helpText && (
                    <p className="text-xs text-muted-foreground">
                      {field.helpText}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="flex justify-end">
          <Button type="submit">
            Soumettre
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPreview;

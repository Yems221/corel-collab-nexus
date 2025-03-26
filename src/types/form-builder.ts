
export type FieldType = 
  | 'text' 
  | 'textarea'
  | 'email' 
  | 'number' 
  | 'tel' 
  | 'date' 
  | 'time' 
  | 'select' 
  | 'checkbox' 
  | 'radio' 
  | 'file'
  | 'address'
  | 'url';

export interface FormField {
  id: string;
  type: FieldType;
  name: string;
  label: string;
  placeholder?: string;
  helpText?: string;
  required: boolean;
  order: number;
  options?: { value: string; label: string }[]; // For select, checkbox, radio
  defaultValue?: string | string[] | number | boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FormTemplate {
  id: string;
  name: string;
  description?: string;
  sections: FormSection[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  community?: string; // Reference to community ID
  isActive?: boolean;
  isPublic?: boolean;
}

export interface DragItem {
  type: string;
  id: string;
  index: number;
}

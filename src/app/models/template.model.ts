export interface Template {
  id?: string;
  icon?: string;
  svg?: string;
  hexColor?: string;
  prompt: string;
  label: string;
}

export type Templates = Template[];

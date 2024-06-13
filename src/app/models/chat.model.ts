export interface Message {
  id?: string;
  index?: number;
  value: string;
  role: 'user' | 'assistant';
}

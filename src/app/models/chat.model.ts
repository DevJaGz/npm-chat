export interface Message {
  id?: string;
  content: string;
  role: 'user' | 'system' | 'assistant';
}

export type Messages = Message[];

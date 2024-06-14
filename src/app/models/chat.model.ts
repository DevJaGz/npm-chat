export interface Message {
  id?: string;
  content: string;
  role: 'user' | 'system' | 'assistant';
  createdAt: number;
  tokens: number | null;
}

export type Messages = Message[];

import { create } from 'zustand';

export interface AiMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AiChatStore {
  isOpen: boolean;
  messages: AiMessage[];
  isLoading: boolean;
  openChat: () => void;
  closeChat: () => void;
  setLoading: (loading: boolean) => void;
  addMessage: (message: AiMessage) => void;
  setMessages: (messages: AiMessage[]) => void;
  clearChat: () => void;
}

export const useAiChatStore = create<AiChatStore>((set) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  clearChat: () => set({ messages: [], isOpen: false, isLoading: false }),
}));
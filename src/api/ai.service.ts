import { api } from "./instance";
import { ENDPOINTS } from "@/config/";
import type { AiMessage } from "@/store/useAiChatStore";

export const aiService = {
  send: async (messages: AiMessage[]) => {
    const { data } = await api.post(ENDPOINTS.postMessage(), {
      messages: messages,
    });

    return data.answer;
  },
};

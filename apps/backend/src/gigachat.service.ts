import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class GigaChatService {
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  private authKey = process.env.GIGACHAT_AUTH_KEY; 

  private async getToken(): Promise<string> {
    const now = Date.now();
    if (this.accessToken && this.tokenExpiresAt > now + 60000) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(
        'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
        'scope=GIGACHAT_API_PERS',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            RqUID: uuidv4(),
            Authorization: `Basic ${this.authKey}`,
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiresAt = response.data.expires_at;
      
      return this.accessToken!;
    } catch (error) {
      console.error('Ошибка получения токена GigaChat:', error);
      throw new Error('Не удалось авторизоваться в AI');
    }
  }

  public async sendMessage(messages: { role: string; content: string }[]) {
    const token = await this.getToken();

    try {
      const response = await axios.post(
        'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
        {
          model: 'GigaChat',
          messages: messages,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.choices[0].message; // { role: "assistant", content: "..." }
    } catch (error) {
      console.error('Ошибка генерации GigaChat:', error);
      throw new Error('Ошибка при запросе к AI');
    }
  }
}

export const gigaChatService = new GigaChatService();
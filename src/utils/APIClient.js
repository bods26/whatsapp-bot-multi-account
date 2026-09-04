import axios from 'axios';

class APIClient {
  constructor() {
    this.baseUrls = {
      removebg: 'https://api.remove.bg/v1.0',
      youtube: 'https://yt-api.com',
      tiktok: 'https://tiktok-api.com',
      instagram: 'https://ig-api.com'
    };
  }

  // Remove Background dari gambar
  async removeBg(imageBuffer, apiKey) {
    try {
      const form = new FormData();
      form.append('image_file', imageBuffer);
      form.append('size', 'auto');

      const response = await axios.post(`${this.baseUrls.removebg}/removebg`, form, {
        headers: {
          ...form.getHeaders(),
          'X-API-Key': apiKey
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(`Remove background failed: ${error.message}`);
    }
  }

  // Download dari YouTube
  async downloadYoutube(url) {
    try {
      const response = await axios.post(`${this.baseUrls.youtube}/download`, {
        url,
        format: 'mp4'
      });
      return response.data;
    } catch (error) {
      throw new Error(`YouTube download failed: ${error.message}`);
    }
  }

  // Download dari TikTok
  async downloadTiktok(url) {
    try {
      const response = await axios.post(`${this.baseUrls.tiktok}/download`, {
        url
      });
      return response.data;
    } catch (error) {
      throw new Error(`TikTok download failed: ${error.message}`);
    }
  }

  // Download dari Instagram
  async downloadInstagram(url) {
    try {
      const response = await axios.post(`${this.baseUrls.instagram}/download`, {
        url
      });
      return response.data;
    } catch (error) {
      throw new Error(`Instagram download failed: ${error.message}`);
    }
  }

  // AI Chat
  async aiChat(message) {
    try {
      const response = await axios.post('https://api-ai.com/chat', {
        query: message
      });
      return response.data.reply;
    } catch (error) {
      throw new Error(`AI Chat failed: ${error.message}`);
    }
  }
}

export default APIClient;

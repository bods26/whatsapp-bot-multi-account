import axios from 'axios';
import FormData from 'form-data';
import { createReadStream } from 'fs';

class MediaUtils {
  // Konversi gambar ke WebP (Sticker)
  static async convertToSticker(imageBuffer) {
    try {
      const sharp = (await import('sharp')).default;
      return await sharp(imageBuffer)
        .resize(512, 512, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .webp({ quality: 80 })
        .toBuffer();
    } catch (error) {
      throw new Error(`Sticker conversion failed: ${error.message}`);
    }
  }

  // Download media dari URL
  static async downloadMedia(url) {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      return Buffer.from(response.data);
    } catch (error) {
      throw new Error(`Media download failed: ${error.message}`);
    }
  }

  // Validate media type
  static validateMediaType(mimeType, allowedTypes) {
    return allowedTypes.some(type => mimeType.includes(type));
  }
}

export default MediaUtils;

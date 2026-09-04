import fs from 'fs';
import path from 'path';

class ValidationUtils {
  // Validasi URL
  static isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Validasi nomor WhatsApp
  static isValidPhoneNumber(number) {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(number.replace(/\D/g, ''));
  }

  // Validasi format perintah
  static parseCommand(text) {
    const match = text.match(/^[,/]([\w]+)\s*(.*)/);
    if (!match) return null;
    
    return {
      command: match[1].toLowerCase(),
      args: match[2].trim()
    };
  }

  // Rate limiting check
  static checkRateLimit(userId, limit = 5, window = 60000) {
    if (!this.rateLimits) {
      this.rateLimits = new Map();
    }

    const now = Date.now();
    const userLimits = this.rateLimits.get(userId) || [];
    const recentRequests = userLimits.filter(time => now - time < window);

    if (recentRequests.length >= limit) {
      return false;
    }

    recentRequests.push(now);
    this.rateLimits.set(userId, recentRequests);
    return true;
  }
}

export default ValidationUtils;

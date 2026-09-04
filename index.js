import dotenv from 'dotenv';
import connectDB from './config/database.js';
import WhatsAppManager from './src/whatsapp/WhatsAppManager.js';
import TelegramDashboard from './src/telegram/TelegramDashboard.js';
import WhatsAppAccount from './src/database/models/WhatsAppAccount.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BotApplication {
  constructor() {
    this.whatsappManager = new WhatsAppManager();
    this.telegramDashboard = null;
  }

  async initialize() {
    try {
      console.log('🚀 Initializing Bot Application...');

      // Connect to MongoDB
      console.log('📦 Connecting to MongoDB...');
      await connectDB();
      console.log('✅ MongoDB connected!');

      // Create necessary directories
      const dirs = ['sessions', 'auth_info', 'temp', 'backups'];
      dirs.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
      });

      // Initialize Telegram Dashboard
      console.log('📱 Initializing Telegram Dashboard...');
      this.telegramDashboard = new TelegramDashboard(this.whatsappManager);
      await this.telegramDashboard.start();
      console.log('✅ Telegram Dashboard started!');

      // Load existing accounts
      console.log('📋 Loading existing accounts...');
      await this.loadExistingAccounts();

      console.log('\n🎉 Bot Application initialized successfully!');
      console.log('📱 Telegram Bot is running...');
      console.log('💬 WhatsApp accounts are being monitored...');

    } catch (error) {
      console.error('❌ Initialization error:', error);
      process.exit(1);
    }
  }

  async loadExistingAccounts() {
    try {
      const accounts = await WhatsAppAccount.find({ isConnected: false });
      
      for (const account of accounts) {
        const sessionPath = path.join(
          __dirname,
          'sessions',
          account.accountId
        );

        if (fs.existsSync(sessionPath)) {
          console.log(`📱 Connecting to ${account.phoneNumber}...`);
          try {
            await this.whatsappManager.connectAccount(account.accountId, sessionPath);
            account.isConnected = true;
            await account.save();
            console.log(`✅ ${account.phoneNumber} connected!`);
          } catch (error) {
            console.error(`❌ Failed to connect ${account.phoneNumber}:`, error.message);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error loading accounts:', error);
    }
  }

  async shutdown() {
    console.log('\n🛑 Shutting down...');
    
    // Disconnect all WhatsApp accounts
    for (const [accountId] of this.whatsappManager.accounts) {
      await this.whatsappManager.disconnectAccount(accountId);
    }

    // Stop Telegram bot
    if (this.telegramDashboard) {
      await this.telegramDashboard.stop();
    }

    console.log('✅ Bot shut down successfully!');
    process.exit(0);
  }
}

// Main execution
const app = new BotApplication();

app.initialize().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => app.shutdown());
process.on('SIGTERM', () => app.shutdown());

export default app;

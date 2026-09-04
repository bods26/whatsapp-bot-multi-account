#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const template = `import dotenv from 'dotenv';
import connectDB from './config/database.js';
import WhatsAppManager from './src/whatsapp/WhatsAppManager.js';
import TelegramDashboard from './src/telegram/TelegramDashboard.js';

dotenv.config();

// Initialize Bot
async function startBot() {
  try {
    console.log('🚀 Starting WhatsApp Bot...');
    
    // Connect to database
    await connectDB();
    
    // Create managers
    const whatsappManager = new WhatsAppManager();
    const telegramDashboard = new TelegramDashboard(whatsappManager);
    
    // Start Telegram dashboard
    await telegramDashboard.start();
    
    console.log('✅ Bot started successfully!');
  } catch (error) {
    console.error('❌ Error starting bot:', error);
    process.exit(1);
  }
}

startBot();
`;

const envExamplePath = path.join(__dirname, '.env.example');
const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from .env.example...');
  const envContent = fs.readFileSync(envExamplePath, 'utf-8');
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created. Please edit it with your configuration.');
} else {
  console.log('✅ .env file already exists.');
}

console.log('\n📋 Setup complete! Follow these steps:');
console.log('1. Edit .env file with your configuration');
console.log('2. Run: npm install');
console.log('3. Run: npm start');
console.log('\n💡 For help: npm run help');

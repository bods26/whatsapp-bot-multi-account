import dotenv from 'dotenv';
import connectDB from './config/database.js';
import WhatsAppAccount from './src/database/models/WhatsAppAccount.js';
import TelegramUser from './src/database/models/TelegramUser.js';
import UserData from './src/database/models/UserData.js';

dotenv.config();

const commands = {
  'reset-db': resetDatabase,
  'list-accounts': listAccounts,
  'list-users': listUsers,
  'delete-account': deleteAccount,
  'help': showHelp
};

async function resetDatabase() {
  try {
    await connectDB();
    
    console.log('🗑️  Resetting database...');
    
    await WhatsAppAccount.deleteMany({});
    await TelegramUser.deleteMany({});
    await UserData.deleteMany({});
    
    console.log('✅ Database reset successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

async function listAccounts() {
  try {
    await connectDB();
    
    const accounts = await WhatsAppAccount.find();
    console.log('\n📱 WhatsApp Accounts:');
    accounts.forEach((acc, i) => {
      console.log(`${i + 1}. ${acc.phoneNumber} - ${acc.isConnected ? '🟢 Online' : '⚪ Offline'}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

async function listUsers() {
  try {
    await connectDB();
    
    const users = await TelegramUser.find();
    console.log('\n👥 Telegram Users:');
    users.forEach((user, i) => {
      console.log(`${i + 1}. ${user.firstName} (@${user.username}) - ${user.isAdmin ? '👑 Admin' : '👤 User'}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

async function deleteAccount() {
  try {
    await connectDB();
    
    const accountId = process.argv[3];
    if (!accountId) {
      console.error('❌ Please provide account ID');
      process.exit(1);
    }
    
    await WhatsAppAccount.findByIdAndDelete(accountId);
    console.log('✅ Account deleted successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
📖 CLI Commands:

node cli.js <command> [args]

Commands:
  reset-db           Reset the entire database
  list-accounts      List all WhatsApp accounts
  list-users         List all Telegram users
  delete-account <id> Delete an account by ID
  help               Show this help message

Examples:
  node cli.js list-accounts
  node cli.js delete-account 507f1f77bcf86cd799439011
  `);
  process.exit(0);
}

const command = process.argv[2];
if (!command || !commands[command]) {
  showHelp();
} else {
  commands[command]();
}

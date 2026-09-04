import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/database.js';
import WhatsAppAccount from './src/database/models/WhatsAppAccount.js';
import TelegramUser from './src/database/models/TelegramUser.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Database connection
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'WhatsApp Bot Multi-Account Dashboard API',
    version: '1.0.0',
    endpoints: {
      accounts: '/api/accounts',
      users: '/api/users',
      health: '/api/health'
    }
  });
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const accountCount = await WhatsAppAccount.countDocuments();
    const userCount = await TelegramUser.countDocuments();
    const onlineAccounts = await WhatsAppAccount.countDocuments({ isConnected: true });

    res.json({
      status: 'OK',
      timestamp: new Date(),
      stats: {
        totalAccounts: accountCount,
        onlineAccounts,
        totalUsers: userCount
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message
    });
  }
});

// Get all accounts
app.get('/api/accounts', async (req, res) => {
  try {
    const accounts = await WhatsAppAccount.find().populate('owner');
    res.json({
      success: true,
      count: accounts.length,
      data: accounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get account by ID
app.get('/api/accounts/:id', async (req, res) => {
  try {
    const account = await WhatsAppAccount.findById(req.params.id).populate('owner');
    if (!account) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }
    res.json({
      success: true,
      data: account
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await TelegramUser.find().populate('accounts');
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🌐 API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

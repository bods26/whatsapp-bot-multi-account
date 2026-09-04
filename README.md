# WhatsApp Bot Multi-Account dengan Telegram Dashboard

Bot WhatsApp yang powerful dengan fitur lengkap seperti Dils SCM Bot, dilengkapi dashboard Telegram untuk mengelola multiple akun WhatsApp.

## Fitur Utama

### Dashboard Telegram
- ✅ Kelola multiple akun WhatsApp
- ✅ Connect/Disconnect akun dengan QR Code
- ✅ Monitor status bot dan koneksi
- ✅ Backup & Restore database
- ✅ Manage user permissions

### Fitur WhatsApp Bot
- 🤖 AI Chat
- 🎨 Convert: Sticker, Quote, Emojimix, dll
- ⬇️ Downloader: YouTube, TikTok, Instagram, Facebook, dll
- 🎮 Mini Games
- 👥 Group Management
- 💰 Store & Payment System
- 🛠️ Developer Tools
- 🎭 RPG System
- 🔍 Search Tools
- ⚙️ Admin Features

## Instalasi

```bash
git clone https://github.com/bods26/whatsapp-bot-multi-account.git
cd whatsapp-bot-multi-account
npm install
cp .env.example .env
# Edit .env dengan konfigurasi Anda
npm start
```

## Konfigurasi

Edit file `.env` dengan:
- `TELEGRAM_TOKEN`: Bot token dari BotFather
- `TELEGRAM_ADMIN_ID`: ID Telegram Anda
- `MONGODB_URI`: Connection string MongoDB

## Penggunaan

### Dashboard Telegram
1. Buka bot Telegram
2. Klik /start
3. Gunakan menu interaktif untuk manage akun

### WhatsApp Commands
- Prefix: `,` atau `/`
- Contoh: `,ai apa itu javascript`
- Contoh: `/sticker` (reply gambar)

## Struktur Direktori

```
.
├── config/              # Konfigurasi
├── src/
│   ├── whatsapp/        # WhatsApp bot logic
│   ├── telegram/        # Telegram dashboard
│   ├── database/        # Database models
│   ├── handlers/        # Command handlers
│   ├── utils/           # Utility functions
│   └── services/        # External services
├── sessions/            # WhatsApp sessions
├── temp/                # Temporary files
└── index.js             # Entry point
```

## Lisensi

MIT

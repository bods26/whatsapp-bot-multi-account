# WhatsApp Bot Multi-Account dengan Telegram Dashboard

## 🚀 Fitur Utama

### Dashboard Telegram
- ✅ Kelola multiple akun WhatsApp
- ✅ Connect/Disconnect akun dengan QR Code
- ✅ Monitor status bot real-time
- ✅ Backup & Restore database
- ✅ Manage user permissions
- ✅ Statistics dan analytics

### Fitur WhatsApp Bot

#### [ AI ]
- `，ai` - Chat dengan AI Assistant
- `,gpt` - ChatGPT integration
- `,remini` - Upscale foto dengan AI

#### [ CONVERT ]
- `,sticker` - Buat sticker dari gambar/video
- `,brat` - Generate Brat style text
- `,quote` - Generate quote image
- `,emojimix` - Campur dua emoji

#### [ DOWNLOADER ]
- `,youtube` - Download video YouTube
- `,ytmp3` - YouTube ke MP3
- `,tiktok` - Download video TikTok
- `,instagram` - Download Instagram media
- `,facebook` - Download Facebook video

#### [ GAMES ]
- `,blackjack` - Permainan Blackjack
- `,hangman` - Tebak kata
- `,slot` - Slot machine game
- `,tebak` - Tebak angka
- `,snake` - Game Snake
- `,mines` - Minesweeper game

#### [ RPG SYSTEM ]
- `,mulairpg` - Mulai RPG
- `,profile` - Lihat profil karakter
- `,inventory` - Lihat inventaris
- `,berburu` - Hunt monster
- `,berlatih` - Training untuk exp

#### [ GROUP TOOLS ]
- `,antilinkon` - Enable anti-link
- `,antilinkoff` - Disable anti-link
- `,kick` - Kick member
- `,promote` - Jadikan admin
- `,demote` - Turunkan dari admin

#### [ TOOLS ]
- `,removebg` - Hapus background foto
- `,ssweb` - Screenshot website
- `,sitecheck` - Cek status website
- `,fetchurl` - Fetch URL content

#### [ SEARCH ]
- `,github` - Search GitHub repository
- `,play` - Cari lagu YouTube
- `,waifu` - Random anime girl
- `,charinfo` - Info karakter anime

## 📋 Instalasi

### Prerequisites
- Node.js >= 18.0.0
- MongoDB (local atau cloud)
- Telegram Bot Token (dari @BotFather)

### Setup

1. **Clone repository**
```bash
git clone https://github.com/bods26/whatsapp-bot-multi-account.git
cd whatsapp-bot-multi-account
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
# Edit .env dengan konfigurasi Anda
```

4. **Jalankan bot**
```bash
npm start
```

## 🔧 Konfigurasi .env

```env
# Telegram Bot
TELEGRAM_TOKEN=your_bot_token_here
TELEGRAM_ADMIN_ID=your_telegram_id

# Database
MONGODB_URI=mongodb://localhost:27017/whatsapp-bot

# Server
PORT=3000
NODE_ENV=development

# API Keys (Opsional)
REMINI_API_KEY=your_key
REMOVEBG_API_KEY=your_key
OPENAI_API_KEY=your_key
```

## 📱 Cara Menggunakan Telegram Dashboard

1. **Buka bot Telegram**: Cari bot Anda di Telegram
2. **Klik /start**: Tampil menu utama
3. **Tambah Akun**: Klik tombol "Tambah Akun" dan masukkan nomor WhatsApp
4. **Scan QR Code**: Bot akan memberikan QR code untuk autentikasi
5. **Manage Akun**: Gunakan dashboard untuk manage akun Anda

## 💬 Cara Menggunakan WhatsApp Bot

### Format Command
```
,<command> [parameter]
atau
/<command> [parameter]
```

### Contoh Penggunaan
```
,ai Apa itu JavaScript?
,sticker (reply gambar)
,youtube https://youtube.com/...
,tiktok https://tiktok.com/...
,mulairpg
,profile
,berburu
,antilinkon
```

## 🎮 RPG System

Bot memiliki sistem RPG lengkap:
- **Level & Experience** - Naik level dengan hunting dan training
- **Inventory** - Kumpulkan item dari monster
- **Gold System** - Dapatkan emas dari berbagai aktivitas
- **Stats** - Strength, Intelligence, Agility, Endurance
- **Monster** - Berbagai jenis monster dengan loot berbeda

## 🛠️ CLI Commands

```bash
# List semua akun
node cli.js list-accounts

# List semua users
node cli.js list-users

# Hapus account
node cli.js delete-account <account_id>

# Reset database
node cli.js reset-db
```

## 📊 API Endpoints

- `GET /` - Info API
- `GET /api/health` - Health check
- `GET /api/accounts` - List semua account
- `GET /api/accounts/:id` - Detail account
- `GET /api/users` - List semua user

## 🔐 Keamanan

- Rate limiting untuk prevent abuse
- Input validation untuk semua command
- Database encryption untuk sensitive data
- Admin-only commands
- Ban system untuk user yang melanggar aturan

## 📦 Struktur Direktori

```
.
├── config/              # Konfigurasi
│   ├── database.js
│   └── logger.js
├── src/
│   ├── whatsapp/        # WhatsApp logic
│   │   └── WhatsAppManager.js
│   ├── telegram/        # Telegram dashboard
│   │   └── TelegramDashboard.js
│   ├── database/        # Database models
│   │   └── models/
│   ├── handlers/        # Command handlers
│   ├── utils/           # Utility functions
│   └── services/        # External services
├── sessions/            # WhatsApp sessions
├── temp/                # Temporary files
├── index.js             # Main entry point
├── server.js            # REST API server
├── cli.js               # CLI tool
└── package.json
```

## 🚀 Deployment

### Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set TELEGRAM_TOKEN=xxx
heroku config:set MONGODB_URI=xxx
```

### VPS/Dedicated Server
```bash
npm install -g pm2
pm2 start index.js --name "whatsapp-bot"
pm2 save
pm2 startup
```

## 🐛 Troubleshooting

### Bot tidak respond
1. Cek apakah bot sudah terconnect: `/api/health`
2. Cek logs untuk error messages
3. Restart bot: `npm start`

### QR Code tidak tampil
1. Pastikan terminal support QR code
2. Gunakan SSH client yang support image display
3. Manual verify di Telegram dashboard

### Database connection error
1. Cek MongoDB URI di .env
2. Pastikan MongoDB service running
3. Test connection: `mongosh "your_mongodb_uri"`

## 📝 License

MIT License - Feel free to use and modify

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

Jika ada pertanyaan atau masalah:
- Open an issue di GitHub
- Hubungi melalui Telegram

## ⭐ Credits

Dibuat dengan ❤️ oleh Dils Bot Creator

Menggunakan:
- [Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
- [Telegraf](https://telegraf.js.org/) - Telegram Bot Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Web Framework

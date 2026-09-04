# Quick Start Guide

## 🚀 Instalasi Cepat (5 Menit)

### Step 1: Clone & Install
```bash
git clone https://github.com/bods26/whatsapp-bot-multi-account.git
cd whatsapp-bot-multi-account
npm install
```

### Step 2: Setup Environment
```bash
cp .env.example .env
```

Edit `.env` dan isi:
```env
TELEGRAM_TOKEN=YOUR_BOT_TOKEN_HERE
TELEGRAM_ADMIN_ID=YOUR_TELEGRAM_ID
MONGODB_URI=mongodb://localhost:27017/whatsapp-bot
PORT=3000
NODE_ENV=development
```

### Step 3: Jalankan Bot
```bash
npm start
```

## 🤖 Mendapatkan Bot Token Telegram

1. Buka Telegram dan cari `@BotFather`
2. Kirim perintah `/start`
3. Kirim `/newbot`
4. Ikuti instruksi untuk membuat bot baru
5. Copy token yang diberikan ke `.env`

## 📱 Setup MongoDB

### Local MongoDB
```bash
# Install MongoDB Community Edition
# Macrosoft: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
# Linux: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
# macOS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

# Jalankan MongoDB
mongod
```

### MongoDB Cloud (Recommended)
1. Buka https://www.mongodb.com/cloud/atlas
2. Buat akun gratis
3. Buat cluster baru
4. Dapatkan connection string
5. Paste ke `.env` sebagai `MONGODB_URI`

## 📱 Menambah Akun WhatsApp

1. **Buka Bot Telegram Anda**
2. **Klik /start**
3. **Tekan tombol "Tambah Akun"**
4. **Masukkan nomor WhatsApp** (format: 628xxxxx)
5. **Scan QR Code** yang diberikan dengan WhatsApp Anda
6. **Selesai!** Akun sudah connected

## 💬 Test Bot Commands

```
# Test AI
,ai Apa itu programming?

# Test sticker (reply ke gambar)
,sticker

# Test quote
,quote Hidup adalah tentang perjalanan, bukan tujuan

# Lihat menu lengkap
,menu
```

## 🎮 RPG System Tutorial

```
# 1. Mulai RPG
,mulairpg

# 2. Lihat profil
,profile

# 3. Lihat inventory
,inventory

# 4. Hunt monster (cooldown 2 menit)
,berburu

# 5. Training untuk exp
,berlatih

# 6. Naik level dengan exp
(Otomatis ketika exp penuh)
```

## 🎮 Games Tutorial

### Blackjack
```
,blackjack          # Mulai game
,hit                # Ambil kartu
,stand              # Berhenti
```

### Hangman
```
,hangman            # Mulai game
,guess a           # Tebak huruf
```

### Slot Machine
```
,slot               # Main slot
```

### Tebak Angka
```
,tebak              # Mulai game
,tebak 50           # Tebak angka
```

## 👥 Group Management

### Anti-Link
```
# Enable anti-link
,antilinkon

# Disable anti-link
,antilinkoff

# Cek status
,antilinkstatus
```

### Admin Tools
```
# Kick member (reply ke pesan member)
,kick

# Promote member menjadi admin
,promote

# Demote admin
,demote
```

## 🛠️ Troubleshooting

### Bot tidak respond
```bash
# Cek status health
curl http://localhost:3000/api/health

# Restart bot
npm start
```

### MongoDB connection error
```bash
# Test connection
mongosh "mongodb://localhost:27017/whatsapp-bot"

# Atau di MongoDB Cloud:
mongosh "your_mongodb_uri"
```

### QR Code tidak tampil
- Gunakan terminal yang support image
- Atau scan dari Telegram dashboard

## 📊 Monitor Bot

### Telegram Dashboard
- Buka bot Telegram
- Gunakan menu untuk monitor akun

### REST API
```bash
# Health check
curl http://localhost:3000/api/health

# List accounts
curl http://localhost:3000/api/accounts

# List users
curl http://localhost:3000/api/users
```

### CLI Commands
```bash
# List semua akun
node cli.js list-accounts

# List semua users
node cli.js list-users

# Reset database
node cli.js reset-db
```

## 🔧 Advanced Configuration

### Custom Prefix
Edit file `src/whatsapp/WhatsAppManager.js`:
```javascript
const cmd = ValidationUtils.parseCommand(text);
// Mendukung , dan / sebagai prefix
```

### API Keys (Opsional)
```env
REMINI_API_KEY=your_key
REMOVEBG_API_KEY=your_key
OPENAI_API_KEY=your_key
YOUTUBE_API_KEY=your_key
```

### Rate Limiting
Edit di `src/utils/ValidationUtils.js`:
```javascript
static checkRateLimit(userId, limit = 5, window = 60000) {
  // limit: jumlah command per window
  // window: waktu dalam milliseconds
}
```

## 📚 Resources

- [Baileys Documentation](https://github.com/WhiskeySockets/Baileys)
- [Telegraf Documentation](https://telegraf.js.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)

## 🆘 Support

Jika mengalami masalah:

1. **Check GitHub Issues**: https://github.com/bods26/whatsapp-bot-multi-account/issues
2. **Check GUIDE.md**: Dokumentasi lengkap
3. **Check Logs**: Console output untuk error details
4. **Open Issue**: Buat issue baru dengan detail error

## ✅ Next Steps

- [ ] Setup Telegram Bot Token
- [ ] Setup MongoDB
- [ ] Run `npm install`
- [ ] Copy `.env.example` ke `.env`
- [ ] Edit konfigurasi di `.env`
- [ ] Run `npm start`
- [ ] Test bot dengan `/start`
- [ ] Tambah akun WhatsApp
- [ ] Test command: `,menu`

## 💡 Tips & Tricks

1. **Multi-Account Management**: Anda bisa mengelola hingga N akun WhatsApp dari satu dashboard
2. **Rate Limiting**: Bot sudah dilengkapi rate limiting untuk prevent abuse
3. **Database Backup**: Gunakan `node cli.js backup` untuk backup data
4. **Analytics**: Monitor stats di Telegram dashboard
5. **Auto-Reconnect**: Bot otomatis reconnect jika connection terputus

## 🚀 Performance Tips

- Gunakan MongoDB Cloud untuk performa lebih baik
- Set `NODE_ENV=production` untuk deployment
- Gunakan PM2 untuk auto-restart
- Monitor memory usage dengan `top` command

---

**Happy Botting! 🎉**

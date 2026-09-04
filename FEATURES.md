# Features Documentation

## 📋 Complete Feature List

### AI & Language

#### ,ai
Chat dengan AI Assistant untuk menjawab pertanyaan apapun.

```
Format: ,ai <pertanyaan>
Contoh: ,ai Apa itu kecerdasan buatan?
```

**Features:**
- Natural language processing
- Context-aware responses
- Multi-topic support
- Error handling

---

#### ,gpt
Access ke ChatGPT untuk conversation yang lebih advanced.

```
Format: ,gpt <pertanyaan>
Contoh: ,gpt Bagaimana cara menulis essay yang baik?
```

---

#### ,remini
Upscale dan enhance kualitas foto menggunakan AI.

```
Format: Reply foto dengan ,remini
```

**Features:**
- 2x-4x upscaling
- Noise reduction
- Detail enhancement
- Automatic quality detection

---

### Media Conversion

#### ,sticker
Konversi gambar atau video pendek menjadi sticker WhatsApp.

```
Format: Reply gambar/video dengan ,sticker
```

**Features:**
- Auto resize to 512x512
- Transparent background support
- Video trimming (5 detik)
- Batch conversion

**Output Format:** WebP (Sticker format)

---

#### ,brat
Generate teks dengan style "Brat" (aesthetic text art).

```
Format: ,brat <teks>
Contoh: ,brat HALO DUNIA
```

**Features:**
- Spacing enhancement
- Custom fonts
- Emoji integration

---

#### ,quote
Buat gambar quote motivasi atau inspirational.

```
Format: ,quote <teks quote>
Contoh: ,quote Hidup dimulai di mana zona nyaman Anda berakhir
```

**Features:**
- Beautiful background
- Custom fonts
- Watermark support
- High resolution output

---

#### ,emojimix
Campur dua emoji menjadi emoji baru.

```
Format: ,emojimix <emoji1> <emoji2>
Contoh: ,emojimix 😀 🎉
```

**Features:**
- Google Emoji Kitchen integration
- Combination validation
- Size optimization

---

### Downloaders

#### ,youtube
Download video dari YouTube.

```
Format: ,youtube <url>
Contoh: ,youtube https://youtube.com/watch?v=...
```

**Features:**
- Multiple quality options
- Playlist support
- Download progress tracking
- Auto metadata extraction

---

#### ,ytmp3
Download audio/musik dari YouTube.

```
Format: ,ytmp3 <url>
Contoh: ,ytmp3 https://youtube.com/watch?v=...
```

**Output Format:** MP3 (128-320 kbps)

**Features:**
- High quality audio
- Metadata preservation
- Fast conversion

---

#### ,tiktok
Download video dari TikTok.

```
Format: ,tiktok <url>
Contoh: ,tiktok https://tiktok.com/@username/video/123
```

**Features:**
- No watermark option
- Original quality
- Automatic quality detection

---

#### ,instagram
Download foto atau video dari Instagram.

```
Format: ,instagram <url>
Alias: ,igdl <url>
Contoh: ,instagram https://instagram.com/p/ABC123/
```

**Features:**
- Single post support
- Carousel support
- Story download
- Reel support

---

#### ,facebook
Download video dari Facebook.

```
Format: ,facebook <url>
Contoh: ,facebook https://facebook.com/username/video/123
```

---

### Games & Entertainment

#### ,blackjack
Permainan kartu Blackjack klasik.

```
,blackjack         # Start game
,hit               # Draw card
,stand             # Finalize hand
```

**Game Rules:**
- Target: 21 atau mendekati tanpa bust
- Ace = 1 atau 11
- Face cards = 10
- Dealer harus hit di bawah 17

---

#### ,hangman
Tebak kata dengan tanda underscore.

```
,hangman           # Start game
,guess <huruf>     # Guess letter
```

**Features:**
- Random word selection
- 6 guesses allowed
- Score tracking

---

#### ,slot
Slot machine game dengan emoji.

```
,slot              # Spin slot
```

**Features:**
- Random result
- Jackpot detection
- Multiple winning combinations

---

#### ,tebak
Tebak angka antara 1-100.

```
,tebak             # Start game
,tebak <angka>     # Make guess
```

**Features:**
- 10 attempts
- Hot/cold hints
- Score calculation

---

#### ,snake
Game snake klasik.

```
,snake             # Start game
,up                # Move up
,down              # Move down
,left              # Move left
,right             # Move right
,quit              # Quit game
```

---

#### ,mines
Minesweeper game.

```
,mines             # Start game
,click <x> <y>     # Click cell
```

**Features:**
- 5x5 grid
- 5 mines
- Score system

---

### RPG System

#### ,mulairpg
Multiplayer RPG game start.

```
,mulairpg          # Create character
```

**Character Stats:**
- Level: 1 (max 99)
- HP: 100
- Mana: 50
- Gold: 0
- Inventory: 20 slots

**Attributes:**
- Strength (Damage output)
- Intelligence (Mana)
- Agility (Dodge chance)
- Endurance (HP)

---

#### ,profile
Lihat profil karakter RPG.

```
,profile           # Show character info
```

**Info Displayed:**
- Level & EXP
- HP & Mana
- Gold & Items
- Stats breakdown

---

#### ,inventory
Lihat inventaris karakter.

```
,inventory         # Show items
```

**Features:**
- Item quantity
- Rarity display
- Weight calculation

---

#### ,berburu
Hunt monster untuk mendapat EXP dan loot.

```
,berburu           # Start hunting
```

**Monsters:**
- Slime: 20 HP, 5 DMG, 25 EXP
- Goblin: 40 HP, 10 DMG, 50 EXP
- Orc: 60 HP, 15 DMG, 100 EXP
- Skeleton: 50 HP, 12 DMG, 75 EXP
- Wolf: 35 HP, 8 DMG, 40 EXP

**Cooldown:** 2 menit

---

#### ,berlatih
Training untuk mendapat EXP.

```
,berlatih          # Train & gain EXP
```

**Rewards:** 10-40 EXP per training

---

### Group Management

#### ,antilinkon
Aktifkan anti-link di grup.

```
,antilinkon        # Enable anti-link
```

**Features:**
- Automatic link detection
- Message deletion
- Warning system (3 strikes)
- Auto-kick after 3 warnings

---

#### ,antilinkoff
Nonaktifkan anti-link.

```
,antilinkoff       # Disable anti-link
```

---

#### ,antilinkstatus
Cek status anti-link.

```
,antilinkstatus    # Check status
```

---

#### ,kick
Hapus member dari grup.

```
Format: Reply pesan member dengan ,kick
```

**Requirement:** Admin only

---

#### ,promote
Jadikan member sebagai admin.

```
Format: Reply pesan member dengan ,promote
```

**Requirement:** Admin only

---

#### ,demote
Turunkan admin menjadi member.

```
Format: Reply pesan admin dengan ,demote
```

**Requirement:** Admin only

---

### Tools & Utilities

#### ,removebg
Hapus background dari foto.

```
Format: Reply foto dengan ,removebg
```

**Features:**
- Automatic edge detection
- Transparent background
- High quality output

---

#### ,ssweb
Screenshot website/webpage.

```
Format: ,ssweb <url>
Contoh: ,ssweb https://google.com
```

**Features:**
- Full page capture
- Custom resolution
- Multiple format support

---

#### ,sitecheck
Cek status website apakah online/offline.

```
Format: ,sitecheck <url>
Contoh: ,sitecheck https://google.com
```

**Outputs:**
- Status (Online/Offline)
- Response time
- HTTP code

---

#### ,fetchurl
Fetch content dari URL.

```
Format: ,fetchurl <url>
Contoh: ,fetchurl https://api.example.com/data
```

**Features:**
- JSON parsing
- Text extraction
- Size limiting

---

### Search & Info

#### ,github
Search GitHub repository.

```
Format: ,github <nama repo>
Contoh: ,github baileys
```

**Results:**
- Repository name
- Stars count
- Description
- Repository URL

---

#### ,play
Cari lagu di YouTube.

```
Format: ,play <judul lagu>
Contoh: ,play Bohemian Rhapsody
```

**Results:**
- Title
- Channel
- Duration
- Views
- URL

---

#### ,waifu
Random anime girl picture.

```
,waifu             # Get random waifu
```

---

#### ,charinfo
Info tentang karakter anime.

```
Format: ,charinfo <nama karakter>
Contoh: ,charinfo Naruto
```

---

### Admin Commands

#### ,menu
Lihat menu lengkap semua command.

```
,menu              # Show full menu
```

---

#### ,help
Dapatkan bantuan tentang penggunaan bot.

```
,help              # Show help
```

---

## 🔐 Permission Levels

- **Public**: Semua user bisa gunakan
- **Group Admin**: Hanya group admin
- **Bot Owner**: Hanya owner bot
- **Private**: Hanya di DM

## ⏱️ Command Cooldowns

- **Hunt** (Berburu): 2 menit
- **Training** (Berlatih): 1 menit
- **General Commands**: 5 per 60 detik

## 📊 Statistics Tracking

Bot automatically track:
- Messages processed
- Commands executed
- Errors encountered
- Last active time
- User preferences

---

**Last Updated:** January 2024

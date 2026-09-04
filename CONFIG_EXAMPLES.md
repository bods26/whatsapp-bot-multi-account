# Configuration Examples

## Environment Variables

### Development Configuration
```env
TELEGRAM_TOKEN=5123456789:ABCDefGHIJKlmnoPQRstuvWXYZ_1a2b3c4d5e
TELEGRAM_ADMIN_ID=123456789
MONGODB_URI=mongodb://localhost:27017/whatsapp-bot
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

### Production Configuration
```env
TELEGRAM_TOKEN=your_production_token
TELEGRAM_ADMIN_ID=your_admin_id
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp-bot
PORT=3000
NODE_ENV=production
LOG_LEVEL=warn
```

## Docker Compose Example

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  whatsapp-bot:
    build: .
    ports:
      - "3000:3000"
    environment:
      - TELEGRAM_TOKEN=${TELEGRAM_TOKEN}
      - MONGODB_URI=mongodb://mongodb:27017/whatsapp-bot
    depends_on:
      - mongodb

volumes:
  mongodb_data:
```

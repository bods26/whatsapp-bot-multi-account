# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Saat ini API tidak memerlukan authentication untuk development. Untuk production, tambahkan API key validation.

## Endpoints

### Health Check
**GET** `/api/health`

Check status bot dan statistik.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00Z",
  "stats": {
    "totalAccounts": 2,
    "onlineAccounts": 1,
    "totalUsers": 5
  }
}
```

---

### Get All Accounts
**GET** `/api/accounts`

Mendapatkan list semua WhatsApp account.

**Query Parameters:**
- `isConnected` (boolean) - Filter by connection status
- `owner` (string) - Filter by owner ID

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "accountId": "account_123",
      "phoneNumber": "628123456789",
      "displayName": "My Bot",
      "isConnected": true,
      "features": {
        "aiEnabled": true,
        "convertEnabled": true,
        "downloaderEnabled": true,
        "gamesEnabled": true,
        "groupToolsEnabled": true,
        "storeEnabled": false,
        "rpgEnabled": true
      },
      "stats": {
        "messagesProcessed": 150,
        "commandsExecuted": 45,
        "errorsCount": 2,
        "lastActive": "2024-01-15T10:25:00Z"
      },
      "createdAt": "2024-01-10T14:30:00Z",
      "updatedAt": "2024-01-15T10:25:00Z"
    }
  ]
}
```

---

### Get Account by ID
**GET** `/api/accounts/:id`

Mendapatkan detail account spesifik.

**Parameters:**
- `id` (string, required) - Account MongoDB ID

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "phoneNumber": "628123456789",
    "isConnected": true,
    "stats": {
      "messagesProcessed": 150,
      "commandsExecuted": 45,
      "errorsCount": 2,
      "lastActive": "2024-01-15T10:25:00Z"
    }
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Account not found"
}
```

---

### Get All Users
**GET** `/api/users`

Mendapatkan list semua Telegram users.

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "telegramId": 123456789,
      "username": "username123",
      "firstName": "John",
      "lastName": "Doe",
      "isAdmin": true,
      "accounts": ["507f1f77bcf86cd799439011"],
      "settings": {
        "language": "id",
        "notifications": true,
        "theme": "dark"
      },
      "createdAt": "2024-01-10T14:30:00Z"
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid input"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Rate Limiting

Setiap user dibatasi:
- **10 requests** per **60 detik** untuk API
- **10 commands** per **60 detik** untuk WhatsApp

## Response Format

Semua response dalam format JSON dengan struktur:
```json
{
  "success": boolean,
  "data": object|array,
  "error": string,
  "message": string
}
```

## Examples

### cURL Examples

```bash
# Health check
curl -X GET http://localhost:3000/api/health

# List accounts
curl -X GET http://localhost:3000/api/accounts

# Get specific account
curl -X GET http://localhost:3000/api/accounts/507f1f77bcf86cd799439011

# List users
curl -X GET http://localhost:3000/api/users
```

### JavaScript/Fetch Examples

```javascript
// Health check
fetch('http://localhost:3000/api/health')
  .then(res => res.json())
  .then(data => console.log(data));

// List accounts
fetch('http://localhost:3000/api/accounts')
  .then(res => res.json())
  .then(data => console.log(data.data));

// Get account
fetch('http://localhost:3000/api/accounts/507f1f77bcf86cd799439011')
  .then(res => res.json())
  .then(data => console.log(data.data));
```

### Axios Examples

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Get health
api.get('/health')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// Get accounts
api.get('/accounts')
  .then(res => console.log(res.data.data))
  .catch(err => console.error(err));
```

## Status Codes

| Code | Meaning |
|------|----------|
| 200 | OK |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

## Future Endpoints (Planned)

- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update account settings
- `DELETE /api/accounts/:id` - Delete account
- `POST /api/accounts/:id/send-message` - Send WhatsApp message
- `GET /api/accounts/:id/messages` - Get messages history
- `POST /api/accounts/:id/backup` - Backup account data

---

**Last Updated:** January 2024

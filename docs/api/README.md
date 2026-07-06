# LearnVeda — API Reference

## Base URL

```
Development: http://localhost:5000/api
Production:  https://learnveda.in/api
```

## Authentication

Most endpoints are public. Protected endpoints require a valid Clerk session cookie.

Send requests with credentials:
```javascript
fetch("/api/auth/me", { credentials: "include" })
```

---

## Endpoints

### Health & Status

#### `GET /api/health`
Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "services": {
    "mongodb": true,
    "redis": false,
    "clerk": true,
    "openai": false
  }
}
```

---

### Authentication

#### `GET /api/auth`
Get the currently authenticated user.

**Response (authenticated):**
```json
{
  "user": {
    "id": "user_abc123",
    "email": "student@example.com",
    "name": "Arjun Sharma",
    "role": "student",
    "plan": "free",
    "xp": 2400,
    "level": 5,
    "streak": 7
  }
}
```

**Response (unauthenticated):**
```json
{ "user": null }
```

---

### AI Tutor

#### `POST /api/ai`
Send a question to the AI Tutor.

**Request:**
```json
{
  "message": "Explain Newton's Second Law",
  "subject": "physics",
  "class": "class-11",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "reply": "Newton's Second Law states that Force = mass × acceleration (F = ma)...",
  "subject": "physics",
  "model": "gpt-4o-mini"
}
```

---

### Search

#### `GET /api/search?q=<query>`
Search across all content.

**Response:**
```json
{
  "results": [
    {
      "type": "chapter",
      "title": "Gravitation",
      "description": "Universal Law of Gravitation, Kepler's laws...",
      "href": "/learn/class-9/science/gravitation"
    }
  ],
  "total": 1
}
```

---

### Analytics

#### `GET /api/analytics`
Get platform statistics.

**Response:**
```json
{
  "stats": {
    "totalStudents": 50000,
    "totalChapters": 500,
    "totalQuizzes": 10000,
    "activeToday": 1200
  }
}
```

---

### Compiler

#### `POST /api/compiler`
Execute code in a supported language.

**Request:**
```json
{
  "language": "python",
  "code": "print('Hello, LearnVeda!')",
  "stdin": ""
}
```

**Response:**
```json
{
  "stdout": "Hello, LearnVeda!\n",
  "stderr": "",
  "error": "",
  "time": "0.05",
  "memory": "512",
  "status": "success"
}
```

**Supported languages:** `python`, `javascript`, `java`, `c`, `cpp`, `typescript`, `rust`, `kotlin`, `swift`, `sql`, `dart`, `ruby`, `go`

---

### Email

#### `POST /api/email`
Send a transactional email.

**Request:**
```json
{
  "type": "welcome",
  "to": "student@example.com",
  "name": "Arjun"
}
```

**Types:** `welcome`, `streak_reminder`, `course_update`, `contact`

---

## Error Responses

All errors follow this format:
```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

| HTTP Status | Meaning |
|-------------|---------|
| 400 | Bad request — invalid input |
| 401 | Unauthorized — login required |
| 403 | Forbidden — insufficient permissions |
| 404 | Not found |
| 429 | Rate limited — too many requests |
| 500 | Internal server error |

# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | ✅        |

## Reporting a Vulnerability

If you discover a security vulnerability within LearnVeda, please send an email to
**security@learnveda.com**. All security vulnerabilities will be promptly addressed.

**Please do NOT open a public issue for security vulnerabilities.**

### What to include

- Type of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **24 hours** — Initial acknowledgment
- **72 hours** — Assessment and action plan
- **7 days** — Fix deployed (for critical issues)

## Security Measures

LearnVeda implements the following security measures:

- **Authentication**: Clerk with JWT tokens
- **Input Validation**: Zod schemas on all inputs
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Anti-CSRF tokens
- **Rate Limiting**: API rate limiting per user/IP
- **Data Encryption**: Encrypted at rest and in transit
- **Dependency Scanning**: Automated vulnerability scanning
- **Audit Logging**: All administrative actions logged

Thank you for helping keep LearnVeda and its users safe! 🔒

# Socket Server — Real-time Battle & Live Events

Node.js + Socket.IO server powering:
- Live 1v1 academic battles
- Real-time leaderboard updates
- Live event countdowns
- Online user presence

## Tech Stack

- **Runtime**: Node.js 20 LTS
- **Framework**: Socket.IO 4.x
- **State**: Redis Pub/Sub (for horizontal scaling)
- **Auth**: Clerk JWT verification on every socket connection

## Socket Events

### Client → Server

| Event                | Payload                        | Description                     |
|---------------------|--------------------------------|---------------------------------|
| `battle:join_queue`  | `{ userId, subject, mode }`   | Join matchmaking queue          |
| `battle:leave_queue` | `{ userId }`                  | Leave queue without match       |
| `battle:submit_answer` | `{ roomId, questionIndex, answer, responseTimeMs }` | Submit answer for question |
| `battle:forfeit`     | `{ roomId }`                  | Forfeit the current match       |

### Server → Client

| Event                | Payload                        | Description                     |
|---------------------|--------------------------------|---------------------------------|
| `battle:matched`     | `{ roomId, opponent, questions }` | Match found, game starts     |
| `battle:opponent_answered` | `{ questionIndex, correct, scoreUpdate }` | Opponent answered |
| `battle:question_timeout` | `{ questionIndex }`       | Question time ran out           |
| `battle:result`      | `{ winner, scores, xpChange }` | Match ended                    |
| `presence:update`    | `{ onlineCount, topUsers }`   | Online user count update        |

## Matchmaking Algorithm

1. Player joins `battle:join_queue` with subject preference
2. Server searches Redis for an opponent in same subject (last 30 seconds)
3. If found: create `roomId`, add both players, send `battle:matched`
4. If not found after 30s: match with any subject, or create a bot match

## Scaling

Socket.IO is configured with Redis adapter (`socket.io-redis`) for horizontal scaling.
Multiple socket-server instances share state via Redis Pub/Sub channels.

## Environment Variables

```bash
PORT=3001
REDIS_URL=redis://redis:6379
CLERK_SECRET_KEY=sk_...
INTERNAL_API_SECRET=...   # Shared secret for Next.js → socket server calls
MONGODB_URI=mongodb://...  # For saving battle records
```

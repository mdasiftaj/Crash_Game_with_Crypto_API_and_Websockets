# Crypto Crash Game Backend
Description : A real-time multiplayer backend for a crypto crash game, featuring WebSocket communication, MongoDB integration, and live cryptocurrency pricing.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [WebSocket Events](#websocket-events)
- [Provably Fair Algorithm](#provably-fair-algorithm)
- [USD-to-Crypto Conversion Logic](#usd-to-crypto-conversion-logic)
- [Game Logic & Architecture](#game-logic--architecture)
- [License](#license)

## Setup Instructions

### Prerequisites

- Node.js (v22.15.0 or higher)
- MongoDB
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/crypto-crash-backend.git
   cd crypto-crash-backend

2. Install dependencies:
   npm install

3. Configure environment variables:
   
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cryptocrash
   CRYPTO_API_KEY=your_api_key_here

4. Start the server:
  npm run dev


### 5. API Endpoints

```markdown
## API Endpoints

### POST /api/user/register

Registers a new user.

**Request Body:**

```json
{
  "username": "exampleUser",
  "password": "securePassword"
}

# Reponse

{
  "message": "User registered successfully",
  "user": {
    "id": "userId",
    "username": "exampleUser",
    "balance": 0
  }
}


POST /api/user/login
Authenticates a user and returns a JWT token.
{
  "username": "exampleUser",
  "password": "securePassword"
}

{
  "message": "Login successful",
  "token": "jwtToken"
}



### 6. WebSocket Events

```markdown
## WebSocket Events

- `connection`: Triggered when a client connects.
- `update`: Sends current multiplier.

  **Payload:**

  ```json
  {
    "multiplier": 1.25
  }

# Payload
{
  "multiplier": 2.75
}
cashout: Client cashes out.

Payload:
{
  "username": "exampleUser"
}

cashed_out: Server response upon successful cashout.

Payload:
{
  "winnings": 150
}


### 7. Provably Fair Algorithm

```markdown
## Provably Fair Algorithm

The crash point is determined using a random number generator. To ensure fairness, a hash-based provably fair system using HMAC or SHA-256 seeds from both server and client can be incorporated. This allows players to verify the integrity of each game's outcome.


## USD-to-Crypto Conversion Logic

The server fetches real-time crypto prices using an external API like CoinGecko or TwelveData. User-entered USD values are converted to crypto based on the latest fetched price at the time of betting.

## Game Logic & Architecture

- The server initiates a new game every 10 seconds.
- Multiplier updates are broadcasted in real-time to all connected clients via WebSockets.
- Players can place bets and cash out at any point before the game crashes.
- The crash point is determined randomly or upon reaching a cap value.
- MongoDB is used for persistent user data storage.
- WebSocket ensures low-latency communication between the server and clients.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



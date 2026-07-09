# Platinum-Bank-

**`README.md`**
```
# Platinum Bank

A simple banking simulation app with user authentication, deposits, withdrawals, and transfers between accounts. Built with Node.js, Express, and a lightweight JSON file for storage — no external database required.

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Deposit and withdraw funds
- Transfer funds between accounts by account number
- Transaction history per user
- Simple HTML/CSS/JS frontend (login, register, dashboard)

## Tech Stack

- **Backend:** Node.js, Express
- **Auth:** bcrypt, jsonwebtoken
- **Storage:** JSON file (`data.json`) — no database setup needed
- **Frontend:** HTML, CSS, vanilla JavaScript

## Project Structure

All files are kept flat (no subfolders) for simple deployment:

```

├── app.js                   # Express app entry point
├── database.js              # JSON file read/write helper
├── User.js                  # User model
├── Transaction.js           # Transaction model
├── authRoutes.js            # Auth route definitions
├── authController.js        # Register/login logic
├── transactionRoutes.js     # Transaction route definitions
├── transactionController.js # Deposit/withdraw/transfer logic
├── index.html / login.html / register.html / dashboard.html
├── login.js / register.js / dashboard.js
├── style.css
└── package.json
```

## Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create a `.env` file in the root directory:

```
JWT_SECRET=your_secret_key_here
PORT=3000
```

### 4. Run the app

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## API Endpoints

### Auth

| Method | Endpoint             | Description         |
|--------|-----------------------|----------------------|
| POST   | `/api/auth/register`  | Register a new user  |
| POST   | `/api/auth/login`     | Log in a user        |

### Transactions

| Method | Endpoint                        | Description                  |
|--------|----------------------------------|-------------------------------|
| POST   | `/api/transactions/deposit`     | Deposit funds                 |
| POST   | `/api/transactions/withdraw`    | Withdraw funds                |
| POST   | `/api/transactions/transfer`    | Transfer funds to another user|
| GET    | `/api/transactions/history/:id` | Get a user's transaction history |

## Deployment (Render)

1. Push this repo to GitHub.
2. Create a new **Web Service** on [Render](https://render.com), connecting your GitHub repo.
3. Set the build command to `npm install` and the start command to `npm start`.
4. Add the `JWT_SECRET` environment variable in Render's dashboard.

## Notes

- Data is stored in `data.json`, created automatically on first use.
- On Render's free tier, disk storage is ephemeral — data persists while the service is running but resets on redeploy. For permanent storage, swap in a real database later.

## License

MIT
```


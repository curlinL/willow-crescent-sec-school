# Willow Crescent Backend

## Environment Variables

Create a `.env` file inside `backend/` containing:

```
PORT=5000
MONGO_URI=<mongodb connection string>
JWT_SECRET=<long random string>
ALLOWED_ORIGINS=https://your-frontend-domain.com,http://localhost:3000
```

- `PORT` is optional and defaults to `5000`.
- `ALLOWED_ORIGINS` accepts a comma-separated list. Use `*` to allow every origin (not recommended for production).

## Creating an Admin User

Run the helper script after setting your environment variables:

```
cd backend
node scripts/createAdmin.js <username> <password>
```

The script will create the user if it does not yet exist or simply reset the password if it does.

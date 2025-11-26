# Copilot Instructions for Willow Crescent Secondary School

## Project Overview

This is the official website for Willow Crescent Secondary School, consisting of:
- **Frontend**: React.js single-page application with Bootstrap 5 for styling
- **Backend**: Node.js/Express.js REST API with MongoDB database

The application is deployed on Vercel (frontend) and Render (backend).

## Technology Stack

### Frontend (`/frontend`)
- React 18 with functional components and hooks
- Bootstrap 5 + React-Bootstrap for UI components
- Bootstrap Icons for iconography
- Axios for HTTP requests
- Create React App for build tooling

### Backend (`/backend`)
- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- CORS middleware for cross-origin requests
- dotenv for environment configuration

## Code Style Guidelines

### JavaScript/React
- Use functional components with React hooks (`useState`, `useEffect`)
- Use arrow functions for component definitions and handlers
- Keep components in separate files under `frontend/src/components/`
- Use async/await for asynchronous operations
- Destructure props and state where appropriate
- Use Bootstrap classes for styling; custom styles go in `styles.css`

### Backend API
- Use Express Router for route organization
- Place models in `backend/models/` with Mongoose schemas
- Place routes in `backend/routes/` with descriptive names (e.g., `documentRoutes.js`)
- Use middleware for authentication in `backend/middleware/`
- Configuration files go in `backend/config/`
- Scripts and utilities go in `backend/scripts/`
- Return JSON responses with appropriate HTTP status codes
- Use try-catch for error handling in async route handlers

### Naming Conventions
- Components: PascalCase (e.g., `AdminDashboard.js`, `Hero.js`)
- Routes: camelCase with descriptive suffixes (e.g., `authRoutes.js`)
- Models: PascalCase singular (e.g., `Document.js`, `AdminUser.js`)
- Variables and functions: camelCase
- Constants: SCREAMING_SNAKE_CASE for environment variables

## Project Structure

```
willow-crescent-sec-school/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── api.js         # Axios instance configuration
│   │   ├── App.js         # Main application component
│   │   ├── index.js       # Entry point
│   │   └── styles.css     # Custom styles
│   └── package.json
├── backend/
│   ├── config/            # Database and other configuration
│   ├── middleware/        # Express middleware (auth, etc.)
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── scripts/           # Utility scripts
│   ├── docs/              # Static documents served by Express
│   ├── server.js          # Express server entry point
│   └── package.json
└── vercel.json            # Vercel deployment configuration
```

## Environment Variables

### Backend (`backend/.env`)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins

### Frontend
- `REACT_APP_API_URL` - Backend API base URL (optional)

## API Patterns

### Route Structure
```javascript
// Example route pattern
router.get('/', async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching documents' });
  }
});
```

### Protected Routes
- Use the auth middleware from `backend/middleware/auth.js`
- Token should be sent in `Authorization: Bearer <token>` header
- Admin routes are under `/api/admin`

## Database Models

The application uses these Mongoose models:
- `AdminUser` - Admin authentication
- `ContactMessage` - Contact form submissions
- `Document` - School documents and policies
- `GalleryItem` - Photo gallery items

## Development Commands

### Frontend
```bash
cd frontend
npm install    # Install dependencies
npm start      # Start development server on port 3000
npm run build  # Build for production
npm test       # Run tests
```

### Backend
```bash
cd backend
npm install    # Install dependencies
npm run dev    # Start with nodemon (hot reload)
npm start      # Start production server
```

## Security Considerations

- Never commit `.env` files or secrets
- Use environment variables for sensitive configuration
- JWT tokens expire after 8 hours
- Passwords are hashed using bcryptjs with default salt rounds
- CORS is configured to restrict origins in production
- Input validation should be performed on all user inputs

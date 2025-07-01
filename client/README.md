# MERN Auth App - Frontend

This is the frontend for a MERN (MongoDB, Express, React, Node.js) Authentication System.

## Project Structure

```
client/
├── src/
│   ├── components/
│   ├── context/
│   └── pages/
│       ├── EmailVerify.jsx
│       ├── Home.jsx
│       ├── Login.jsx
│       └── ResetPassword.jsx
├── package.json
└── README.md
```

### Folders

- **components/**: Reusable React components (e.g., buttons, forms).
- **context/**: React context for global state management (e.g., authentication state).
- **pages/**: Main application pages:
    - `EmailVerify.jsx`: Email verification page.
    - `Home.jsx`: Home page after login.
    - `Login.jsx`: User login page.
    - `ResetPassword.jsx`: Password reset page.

## Getting Started

1. Install dependencies:

     ```bash
     npm install
     ```

2. Start the development server:

     ```bash
     npm start
     ```

3. The app will run on [http://localhost:3000](http://localhost:3000).

## Features

- User authentication (login, registration, password reset)
- Email verification
- Protected routes

## Tech Stack

- React
- Context API
- Axios (for API requests)
- React Router

## License

MIT
# MERN Auth System

A simple authentication app built with the MERN stack (MongoDB, Express, React, Node.js). This project provides user login, signup, and a home page.

## Project Structure

```
/ (root)
│
├── frontend/   # React app for the client-side
└── backend/    # Node.js/Express API server
```

## Features

- User registration (signup)
- User login
- Protected home page

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies:**

    - For backend:
      ```bash
      cd backend
      npm install
      ```

    - For frontend:
      ```bash
      cd ../frontend
      npm install
      ```

3. **Set up environment variables:**
    - Create a `.env` file in the `backend` folder for your MongoDB URI and JWT secret.

4. **Run the app:**

    - Start backend server:
      ```bash
      cd backend
      npm start
      ```

    - Start frontend app:
      ```bash
      cd ../frontend
      npm start
      ```

## License

This project is open source and available under the [MIT License](LICENSE).
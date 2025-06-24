# Bloggr Backend

This is the backend for a personal blog platform, built with Node.js, Express, TypeScript, and MongoDB.

## Features

-   JWT-based authentication (signup/login)
-   CRUD operations for blog posts
-   Protected routes for authenticated users
-   Validation for incoming data

## Project Structure

```
bloggr-backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── index.ts
├── .env
├── .env.example
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

-   Node.js (v14 or later)
-   npm
-   MongoDB (local or remote instance)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd bloggr-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create environment files:**

    Create a `.env` file in the root directory. You can copy the example file:
    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your configuration:
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=3000
    JWT_SECRET=your_super_secret_key_for_jwt
    ```

### How to Run

**Development:**

To run the server in development mode with hot-reloading:
```bash
npm run dev
```
The server will be available at `http://localhost:3000`.

**Production:**

1.  Build the TypeScript code:
    ```bash
    npm run build
    ```
2.  Start the server:
    ```bash
    npm run start
    ```

## API Endpoints Summary

All endpoints are prefixed with `/api`.

| Method | Endpoint               | Description                           | Authentication |
| :----- | :--------------------- | :------------------------------------ | :------------- |
| `POST` | `/auth/signup`         | Register a new user                   | Public         |
| `POST` | `/auth/login`          | Login an existing user                | Public         |
| `POST` | `/posts`               | Create a new blog post                | **Required**   |
| `GET`  | `/posts`               | Get all blog posts                    | Public         |
| `GET`  | `/posts?author=userId` | Get all posts by a specific author    | Public         |

---

## Final Output for Frontend Integration

### ✅ API Routes:
- **`POST /api/auth/signup`**: Register a new user.
  - **Body**: `{ "email": "user@example.com", "password": "password123" }`
- **`POST /api/auth/login`**: Authenticate a user.
  - **Body**: `{ "email": "user@example.com", "password": "password123" }`
  - **Returns**: `{ "token": "jwt.token.here" }`
- **`POST /api/posts`**: Create a new post. (JWT Protected)
  - **Body**: `{ "title": "My First Post", "content": "This is the content of my post." }`
- **`GET /api/posts`**: Retrieve all blog posts.
- **`GET /api/posts?author=userId`**: Retrieve all posts by a specific author.

### 🪝 Client Auth Integration:
- For protected routes like `POST /api/posts`, the JWT must be sent in the request header:
  `Authorization: Bearer <token>`

### 🧪 Sample `curl` Requests

1.  **Sign Up**
    ```bash
    curl -X POST http://localhost:3000/api/auth/signup \
    -H "Content-Type: application/json" \
    -d '{"email": "testuser@example.com", "password": "password123"}'
    ```

2.  **Login**
    ```bash
    curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email": "testuser@example.com", "password": "password123"}'
    ```
    *(Save the returned token for the next request)*

3.  **Create a Post (replace `<YOUR_JWT_TOKEN>` with your token)**
    ```bash
    curl -X POST http://localhost:3000/api/posts \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
    -d '{"title": "My Awesome Post", "content": "Hello world from my new blog!"}'
    ```

4.  **Get All Posts**
    ```bash
    curl http://localhost:3000/api/posts
    ``` 
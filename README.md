# Bloggr - Backend

This is the backend for the Bloggr platform, a personal blog where users can sign up, log in, and share their posts. It is built with Node.js, Express, and MongoDB, using TypeScript.

## Features

-   **Authentication:** Secure user signup and login using JWT.
-   **Post Management:** Create, read, and filter posts.
-   **Image Uploads:** Supports image uploads for posts, stored locally.
-   **Rich Text:** Handles and sanitizes HTML content from a rich text editor.
-   **Scalable Structure:** Organized into controllers, routes, models, and middlewares.

## Getting Started

### Prerequisites

-   Node.js (v18 or newer)
-   MongoDB (A local instance or a cloud-based one like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>/bloggr-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `bloggr-backend` root directory and add the following variables:

```env
# Your MongoDB connection string
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# A strong, secret string for signing JWTs
JWT_SECRET=your-super-secret-jwt-key
```

### 4. Run the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

## API Endpoints

-   `POST /api/auth/signup`: Register a new user.
-   `POST /api/auth/login`: Log in a user.
-   `POST /api/posts/create`: Create a new post (requires auth token).
-   `GET /api/posts/get`: Get all posts.
-   `GET /api/posts/get?author=:userId`: Get all posts by a specific author.
-   `GET /api/posts/getbyid/:id`: Get a single post by its ID.
-   `POST /api/upload`: Upload an image (requires auth token).

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

## Final Output for Frontend Integration

### ✅ API Routes:
- **`POST /api/auth/signup`**: Register a new user.
  - **Body**: `{ "email": "user@example.com", "password": "password123" }`
- **`POST /api/auth/login`**: Authenticate a user.
  - **Body**: `{ "email": "user@example.com", "password": "password123" }`
  - **Returns**: `{ "token": "jwt.token.here" }`
- **`POST /api/posts/create`**: Create a new post. (JWT Protected)
  - **Body**: `{ "title": "My First Post", "content": "This is the content of my post." }`
- **`GET /api/posts/get`**: Retrieve all blog posts.
- **`GET /api/posts/get?author=userId`**: Retrieve all posts by a specific author.
- **`GET /api/posts/getbyid/:id`**: Retrieve a single post by its ID.
- **`POST /api/upload`**: Upload an image for a post. (JWT Protected)

### 🪝 Client Auth Integration:
- For protected routes like `POST /api/posts/create`, the JWT must be sent in the request header:
  `Authorization: Bearer <token>`

### 🧪 Sample `curl` Requests

1.  **Sign Up**
    ```bash
    curl -X POST http://localhost:5000/api/auth/signup \
    -H "Content-Type: application/json" \
    -d '{"email": "testuser@example.com", "password": "password123"}'
    ```

2.  **Login**
    ```bash
    curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email": "testuser@example.com", "password": "password123"}'
    ```
    *(Save the returned token for the next request)*

3.  **Create a Post (replace `<YOUR_JWT_TOKEN>` with your token)**
    ```bash
    curl -X POST http://localhost:5000/api/posts/create \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
    -d '{"title": "My Awesome Post", "content": "Hello world from my new blog!"}'
    ```

4.  **Get All Posts**
    ```bash
    curl http://localhost:5000/api/posts/get
    ```

5.  **Get a Single Post**
    ```bash
    curl http://localhost:5000/api/posts/getbyid/<post-id>
    ```

6. **Upload an Image**
    ```bash
    curl -X POST http://localhost:5000/api/upload \
    -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
    -F "image=@path/to/your/image.jpg"
    ``` 
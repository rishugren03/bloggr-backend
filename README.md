# Bloggr Backend

This is the backend for the **Bloggr** platform, a full-featured blogging application. It is built with Node.js, Express, and MongoDB, and written in TypeScript to ensure type safety and scalability.

## ✨ Features

-   **Robust Authentication:** Secure user signup and login using JSON Web Tokens (JWT).
-   **Post Management:** Full CRUD (Create, Read, Update, Delete) functionality for posts.
-   **Rich Content:** Supports rich text content with HTML sanitization to prevent XSS attacks.
-   **Image Uploads:** Handles image uploads for posts, with files stored on the server.
-   **Scalable Architecture:** A clean, modular structure separating concerns into controllers, services, routes, and models.

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or newer recommended)
-   [MongoDB](https://www.mongodb.com/) (A local instance or a cloud-based one like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/bloggr-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `bloggr-backend` root directory by copying the example file:

```bash
cp .env.example .env
```

Then, open the `.env` file and add your configuration values:

```env
# The connection string for your MongoDB database
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# A strong, secret string used for signing JWTs
JWT_SECRET=your-super-secret-and-long-jwt-key

# The port the server will run on (optional, defaults to 5000)
PORT=5000
```

### 4. Run the Development Server

The server uses `ts-node-dev` to automatically restart on file changes.

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

## Project Structure

```
bloggr-backend/
├── public/
│   └── uploads/        # Statically served directory for uploaded images
├── src/
│   ├── controllers/    # Express controllers to handle request logic
│   ├── middlewares/    # Custom middleware (e.g., authentication)
│   ├── models/         # Mongoose models for database schemas
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic separated from controllers
│   ├── utils/          # Utility functions (e.g., validation)
│   └── index.ts        # Main server entry point
├── .env                # Local environment variables (ignored by Git)
├── .env.example        # Example environment variables
├── package.json
└── tsconfig.json
```

##  API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint                    | Description                       | Auth Required |
| :----- | :-------------------------- | :-------------------------------- | :------------ |
| `POST` | `/auth/signup`              | Register a new user.              | No            |
| `POST` | `/auth/login`               | Log in a user and get a JWT.      | No            |
| `POST` | `/posts/create`             | Create a new post.                | **Yes**       |
| `GET`  | `/posts/get`                | Get all posts.                    | No            |
| `GET`  | `/posts/get?author=:userId` | Get all posts by a specific user. | No            |
| `GET`  | `/posts/getbyid/:id`        | Get a single post by its ID.      | No            |
| `POST` | `/upload`                   | Upload an image for a post.       | **Yes**       |

### Client Integration Notes

-   For protected routes, the JWT must be sent in the `Authorization` header as a Bearer token:
    `Authorization: Bearer <your_jwt_token>`

-   The `/upload` endpoint expects a `multipart/form-data` request with the image file in a field named `image`.

---

_This README was generated with assistance from an AI pair programmer._ 
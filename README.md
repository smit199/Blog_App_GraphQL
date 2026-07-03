# Blog App GraphQL

A robust GraphQL API for managing blog content with full authentication and authorization capabilities. Built with modern technologies to provide a secure and scalable blogging platform.

---

## Table of Contents

- [Description](#-description)
- [Features](#-features)
- [Tech Stake](#-tech-Stack)
- [Installation](#-installation)
  - [Prerequisites](#prerequisites)
  - [Setup Steps](#setup-steps)
- [Usage](#-usage)
  - [GraphQL Queries](#graphql-queries)
  - [GraphQL Mutations](#graphql-mutaions)
- [Authentication & Authorization](#-authentication-&-authorization)
  - [How Authentication Works](#how-authentication-works)
  - [Protected Endpoints](#protected-endpoints)
- [Project Structure](#-project-structure)
- [Testing](#🧪-testing)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Support](#-support)
- [Useful Links](#-useful links)

 ---

## 📋 Description

This project implements a complete GraphQL API that allows authors to create, view, update, and delete blog posts. It features JWT-based authentication and authorization mechanisms to ensure secure access to API endpoints, allowing only authenticated authors to manage their content.

---

## ✨ Features

- **GraphQL API** - Modern API using GraphQL for efficient data fetching
- **CRUD Operations** - Create, read, update, and delete blog posts
- **Authentication** - JWT-based user authentication for secure login
- **Authorization** - Role-based access control to protect endpoints
- **Author Management** - Authors can manage only their own blog posts
- **Secure Endpoints** - Protected API endpoints with token verification

---

## 🛠️ Tech Stack

- **Language**: JavaScript (Node.js)
- **API**: GraphQL
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: [Specify your database - e.g., MongoDB, PostgreSQL]
- **Runtime**: Node.js

---

## 📦 Installation

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/smit199/Blog_App_GraphQL.git
   cd Blog_App_GraphQL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   PORT=4000
   MONGODB_URI=your_database_uri
   JWT_SECRET=your_secret_key
   JWT_EXPIRY=7d
   ```

4. **Start the server**
   ```bash
   npm start
   ```

---

## 🚀 Usage

### GraphQL Queries

**Get all blogs**
```graphql
query {
  getAllBlogs {
    id
    title
    content
    authorId
    author {
      id
      name
      email
    }
  }
}
```

**Get a specific blog**
```graphql
query {
  getBlogById(id: "blog_id") {
    id
    title
    content
    authorId
    author {
      id
      name
      email
    }
  }
}
```

**Get logged in author's all blogs**
```graphql
query {
  getMyBlogs {
    id
    title
    content
    authorId
    author {
      id
      name
      email
    }
  }
}
```

**Get logged in author's specific blog**
```graphql
query {
  getMyBlogById(id: "blog_id") {
    id
    title
    content
    authorId
    author {
      id
      name
      email
    }
  }
}
```

### GraphQL Mutations

**Register Author**
```graphql
mutation {
  registerAuthor(name: "author name", email: "author@example.com", password: "password") {
    author {
      id
      name
      email
    }
    token
  }
}
```

**Login Author**
```graphql
mutation {
  loginAuthor(email: "author@example.com", password: "password") {
    author {
      id
      name
      email
    }
    token
  }
}
```

**Create a blog**
```graphql
mutation {
  addBlog(
    title: "My First Blog"
    content: "This is my first blog"
  ) {
    id
    title
    content
    authorId
    author {
      id
      name
      email
    }
  }
}
```

**Update a blog**
```graphql
mutation {
  updateBlog(
    id: "blog_id",
    title: "Updated Title"
    content: "Updated content"
  ) {
    id
    title
    content
    authorId
    author {
      id
      name
      email
    }
  }
}
```

**Delete a blog**
```graphql
mutation {
  deleteBlog(id: "blog_id") {
    message
  }
}
```

---

## 🔐 Authentication & Authorization

### How Authentication Works

1. Authors register/login with their credentials
2. Server generates a JWT token upon successful authentication
3. Token is sent back to the client
4. Client includes token in the `Authorization` header for subsequent requests

### Protected Endpoints

All mutations (create, update, delete) require a valid JWT token:
```
Authorization: Bearer <your_jwt_token>
```

Only authenticated authors can:
- Create new blog posts
- Update their own blog posts
- Delete their own blog posts

---

## 📂 Project Structure

```
└── 📁Blog_App_Graphql
    └── 📁config
        ├── .env
    └── 📁graphql
        └── 📁typedefs
            ├── AuthorType.js
            ├── AuthPayload.js
            ├── BlogType.js
        ├── schema.js
    └── 📁models
        ├── authorModel.js
        ├── blogModel.js
    └── 📁util
        ├── authMiddleware.js
    ├── .gitignore
    ├── app.js
    ├── package-lock.json
    ├── package.json
    └── server.js
```

---

## 🧪 Testing

To test the API, you can use:

- **GraphQL Playground** - Interactive GraphQL IDE (usually at `/graphql`)
- **Postman** - Send GraphQL queries via POST requests
- **Apollo Client** - Frontend integration

---

## 📝 API Endpoints

- `POST /graphql` - GraphQL API endpoint
- `GET /graphql` - GraphQL Playground (development)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**smit199**

---

## 🆘 Support

For issues and questions, please open an issue on the GitHub repository.

---

## 🔗 Useful Links

- [GraphQL Documentation](https://graphql.org/)
- [JWT Introduction](https://jwt.io/introduction)
- [Node.js Documentation](https://nodejs.org/)

---

---

Made with ❤️ by smit199

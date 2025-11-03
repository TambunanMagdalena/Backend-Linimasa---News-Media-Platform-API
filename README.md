# Backend-Linimasa---News-Media-Platform-API

Deskripsi Proyek
Backend Linimasa adalah RESTful API untuk platform berita dan media yang dibangun dengan Node.js, Express, dan MySQL.
API ini menyediakan endpoints untuk mengelola konten berita, video, iklan, kategori, dan user management.

Fitur Utama

- Manajemen Berita - CRUD operations untuk artikel berita
- Manajemen Video - Upload dan pengelolaan konten video
- Sistem Iklan - Management banner dan konten promosi
- Kategori Konten - Organisasi konten berdasarkan kategori
- User Management - Authentication dan authorization
- Komentar - Sistem komentar untuk konten
- File Upload - Upload gambar dan video dengan kompresi
- Pagination & Search - Filter dan pencarian data

Teknologi yang Digunakan

- Runtime: Node.js
- Framework: Express.js
- Database: MySQL
- Authentication: JWT Tokens
- File Upload: Multer
- Image Processing: Sharp (compression)
- CORS: Cross-Origin Resource Sharing
- Logging: Morgan
- Development: Nodemon

Struktur Projek
BACK-END/
├── src/
│ ├── configs/ # Konfigurasi database dan environment
│ ├── controllers/ # Business logic dan request handling
│ ├── helpers/ # Utility functions dan response helpers
│ ├── models/ # Database queries dan models
│ ├── routes/ # API routes definitions
│ └── assets/ # Uploaded files (images/videos)
├── index.js # Entry point aplikasi
├── package.json
└── .env # Environment variables

Instalasi dan Setup
Prerequisites

- Node.js (v14 atau lebih tinggi)
- MySQL Database( saya menggunakan SQL Server)
- Git

Langkah Instalasi

1. Clone Repository
   git clone https://github.com/username/BACK-END.git
   cd BACK-END

2. Install Dependencies
   npm install
3. Setup Environment Variables
   Buat file .env di root directory:
   # Server Configuration
   PORT=3001
   IP=localhost

# Database Configuration

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=linimasa_db
DB_PORT=3306

# JWT Secret

JWT_SECRET=your_jwt_secret_key

6. Setup Database
   - Buat database MySQL baru
   - Import database schema (jika ada file .sql)
7. Jalankan Aplikasi
   npm start

Testing
npm test

API Endpoints

🔐 Authentication
POST /user/register - Register new user

POST /user/login - User login

POST /user/token - Refresh token

📰 News Management
GET /news - Get all news (with pagination)

GET /news/:id - Get news detail

POST /news - Create new news (with image)

PATCH /news/:id - Update news

DELETE /news/:id - Delete news

🎥 Video Management
GET /video - Get all videos

POST /video - Upload new video

PATCH /video/:id - Update video

DELETE /video/:id - Delete video

📢 Ads Management
GET /ads - Get all advertisements

POST /ads - Upload new advertisement

PATCH /ads/:id - Update advertisement

DELETE /ads/:id - Delete advertisement

🗂️ Categories
GET /news-category - Get news categories

GET /video-category - Get video categories

💬 Comments
GET /commentar - Get all comments

POST /commentar - Create new comment

DELETE /commentar/:id - Delete comment

🔐 Authentication & Authorization
API uses JWT (JSON Web Tokens) for authentication. Add the following header for requests requiring auth:

http
Authorization: Bearer <your_jwt_token>

Development
Magdalena Pebrianty Tambunan - Backend Developer

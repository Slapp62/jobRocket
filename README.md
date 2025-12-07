# 🚀 JobRocket

**JobRocket** is a modern, AI-powered job matching platform that connects jobseekers with employers through intelligent matching algorithms and an intuitive user experience. Built with React, TypeScript, Node.js, and MongoDB, JobRocket leverages OpenAI embeddings to provide smart job recommendations.

[![Live Site](https://img.shields.io/badge/Live-jobrocket.onrender.com-blue)](https://jobrocket-site.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61dafb)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47a248)](https://www.mongodb.com/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [User Roles](#-user-roles)
- [Authentication](#-authentication)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Features

### For Jobseekers
- 👤 **Profile Management** - Create detailed profiles with skills, education, and work preferences
- 🔍 **Smart Job Search** - Advanced filtering by location, industry, work arrangement, and more
- 📊 **AI Match Scores** - Get personalized match scores for job listings using OpenAI embeddings
- 📝 **Application Tracking** - Submit and track application status (pending, reviewed, rejected)
- ❤️ **Favorites System** - Save and organize favorite job listings
- 📱 **Responsive Design** - Seamless experience across desktop and mobile devices

### For Employers
- 🏢 **Company Profiles** - Showcase your business with logo, description, and social links
- 📢 **Job Posting** - Create and manage job listings with rich descriptions
- 📈 **Business Dashboard** - Track applications, listings, and metrics
- 📊 **Application Management** - Review applications and update their status
- 🎯 **Targeted Matching** - AI-powered candidate matching for your listings

### For Admins
- 🛠️ **User Management** - Oversee all platform users
- 🔧 **Content Moderation** - Manage listings and applications
- 📊 **System Analytics** - Monitor platform health and usage

### Technical Features
- 🤖 **AI-Powered Matching** - OpenAI embeddings for intelligent job-candidate matching
- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing
- 🛡️ **Security Hardened** - Rate limiting, input sanitization, CORS, Helmet
- 📧 **Email Integration** - EmailJS for contact and notifications
- 🎨 **Modern UI/UX** - Mantine component library with Framer Motion animations
- 🗄️ **Robust Backend** - RESTful API with Express and MongoDB
- ✅ **Comprehensive Testing** - Jest and Vitest test suites

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.3 with TypeScript
- **Build Tool:** Vite 6.2
- **UI Library:** Mantine 7.17
- **State Management:** Redux Toolkit + Redux Persist
- **Routing:** React Router DOM 7.5
- **Forms:** React Hook Form + Joi validation
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Icons:** Tabler Icons
- **Testing:** Vitest + Testing Library
- **Email:** EmailJS

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.1
- **Database:** MongoDB with Mongoose 8.16
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt/bcryptjs
- **Validation:** Joi
- **Security:** Helmet, CORS, Rate Limiting, Mongo Sanitize
- **AI/ML:** OpenAI SDK (text-embedding-3-small)
- **Logging:** Morgan + custom error logging
- **Testing:** Jest + Supertest

---

## 📁 Project Structure

```
jobRocket/
├── frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── pages/              # Route pages
│   │   │   ├── AllUsers/       # Login, Register, Search
│   │   │   ├── BusinessUsers/  # Dashboard, Create Listing
│   │   │   ├── Jobseekers/     # Applications, Favorites
│   │   │   ├── AdminControls/  # Admin panel
│   │   │   ├── EditProfilePage/
│   │   │   ├── HomePage/
│   │   │   └── Static/         # About, Privacy, Terms, 404
│   │   ├── components/         # Reusable components
│   │   │   ├── Application/    # Application modal
│   │   │   ├── registrationForms/
│   │   │   ├── Navigation/
│   │   │   ├── Modals/
│   │   │   ├── ListingComponents/
│   │   │   ├── Filters/
│   │   │   └── AI_Components/
│   │   ├── routing/            # Router configuration
│   │   ├── store/              # Redux store
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Utility functions
│   │   ├── validationRules/    # Form validation schemas
│   │   ├── types.ts            # TypeScript definitions
│   │   └── theme.ts            # Mantine theme
│   └── package.json
│
├── backend/                     # Node.js Express backend
│   ├── auth/                   # JWT authentication
│   ├── config/                 # Environment configs
│   ├── controllers/            # Request handlers
│   │   ├── userController.js
│   │   ├── listingController.js
│   │   ├── applicationsController.js
│   │   └── recommendationController.js
│   ├── models/                 # Mongoose schemas
│   │   ├── Users.js
│   │   ├── Listings.js
│   │   └── Applications.js
│   ├── routes/                 # API routes
│   ├── middleware/             # Express middleware
│   │   ├── authService.js
│   │   ├── validation/
│   │   ├── rateLimiter.js
│   │   └── logging/
│   ├── services/               # Business logic
│   │   ├── userService.js
│   │   ├── listingService.js
│   │   ├── applicationsService.js
│   │   ├── embeddingService.js
│   │   ├── recommendationService.js
│   │   └── matchingService.js
│   ├── database/               # DB connection
│   ├── tests/                  # Jest test suites
│   ├── seeding/                # Dev data seeding
│   ├── utils/                  # Utility functions
│   ├── data/                   # Static data (industries, cities)
│   ├── app.js                  # Express app setup
│   └── index.js                # Entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **OpenAI API Key** (for AI matching features)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/jobRocket.git
cd jobRocket
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

#### 4. Set up environment variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
MONGO_ATLAS_URI=your_mongodb_atlas_connection_string

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# OpenAI API (for embeddings)
OPENAI_API_KEY=your_openai_api_key
```

Create a `backend/config/development.json` file:

```json
{
  "MONGO_LOCAL_URI": "mongodb://localhost:27017/jobRocket",
  "MONGO_ATLAS_URI": "",
  "TOKEN_GENERATOR": "jwt",
  "PORT": 3000
}
```

#### 5. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend will run on [http://localhost:3000](http://localhost:3000)

#### 6. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173)

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode (development/production/test) | Yes |
| `PORT` | Server port (default: 3000) | No |
| `MONGO_ATLAS_URI` | MongoDB Atlas connection string | Yes* |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `OPENAI_API_KEY` | OpenAI API key for embeddings | Yes |

*Either `MONGO_ATLAS_URI` or local MongoDB required

---

## 📡 API Documentation

### Base URL

- **Development:** `http://localhost:3000/api`
- **Production:** `https://your-backend-url.com/api`

### Authentication

Include JWT token in request headers:
```
x-auth-token: your_jwt_token_here
```

### Endpoints

#### User Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/users` | ❌ | Register new user |
| POST | `/users/login` | ❌ | User login |
| GET | `/users` | Admin | Get all users |
| GET | `/users/:id` | User/Admin | Get user by ID |
| PUT | `/users/:id` | User/Admin | Update user profile |
| PATCH | `/users/:id` | User/Admin | Toggle user role |
| DELETE | `/users/:id` | User/Admin | Delete user account |

#### Listing Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/listings` | ❌ | Get all active listings |
| GET | `/listings/search` | ❌ | Search/filter listings |
| GET | `/listings/business-listings` | Business | Get user's own listings |
| GET | `/listings/liked` | User | Get liked listings |
| GET | `/listings/favorites/:userId` | ❌ | Get user's favorites |
| GET | `/listings/:id` | ❌ | Get listing by ID |
| POST | `/listings` | Business | Create new listing |
| PUT | `/listings/:id` | Creator | Update listing |
| POST | `/listings/:id/like` | User | Toggle listing like |
| DELETE | `/listings/:id` | Creator/Admin | Delete listing |

#### Application Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/applications/:listingId` | Optional | Submit application |
| GET | `/applications/my-applications` | User | Get applicant's applications |
| GET | `/applications/business/dashboard/metrics` | Business | Get dashboard metrics |
| GET | `/applications/business-applications` | Business | Get business applications |
| GET | `/applications/listing/:listingId` | User | Get applications for listing |
| PATCH | `/applications/status/:id` | User | Update application status |
| PUT | `/applications/:id` | User | Update application |
| DELETE | `/applications/:id` | User | Delete application |

#### Recommendation Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/recommendations/match-score/:listingId` | User | Get AI match score |

---

## 👥 User Roles

### Jobseeker
- Create and manage personal profile
- Search and filter job listings
- Submit applications to jobs
- Track application status
- Save favorite listings
- View AI match scores

### Business
- Create company profile
- Post and manage job listings
- View received applications
- Update application status
- Access dashboard metrics
- Manage company information

### Admin
- Access admin panel
- Manage all users
- Oversee listings and applications
- Moderate content
- System-wide access

---

## 🔒 Authentication

### JWT Token Structure

```json
{
  "_id": "user_mongodb_id",
  "isAdmin": false,
  "profileType": "jobseeker"
}
```

### Security Features

- **Password Hashing:** bcrypt with salt rounds
- **Token Expiration:** 24 hours
- **Rate Limiting:**
  - Login: 5 attempts / 15 minutes
  - Registration: 5 attempts / hour
  - Listings: 10 attempts / 24 hours
  - Applications: 50 attempts / hour
- **Account Lockout:** 3 failed login attempts = 15 minute lockout
- **Input Sanitization:** Joi validation + Mongo sanitization
- **Security Headers:** Helmet middleware
- **CORS Protection:** Configured origins only

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run specific test suites
npm run test:users
npm run test:cards

# Watch mode
npm run test:watch
```

**Test Coverage:**
- User registration and authentication
- Listing CRUD operations
- Application submission and management
- Input validation
- Authorization checks

### Frontend Tests

```bash
cd frontend

# Run tests
npm run vitest

# Watch mode
npm run vitest:watch

# Type checking
npm run typecheck
```

---

## 📦 Available Scripts

### Frontend

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run typecheck        # TypeScript type checking
npm run lint             # Run ESLint
npm run prettier:check   # Check code formatting
npm run prettier:write   # Format code
npm run test             # Run all tests
```

### Backend

```bash
npm run dev              # Start development server (nodemon)
npm start                # Start production server
npm test                 # Run all tests
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run prettier:check   # Check code formatting
npm run prettier:write   # Format code
```

---

## 🌐 Deployment

### Production Deployment

The application is deployed on **Render.com**:

- **Frontend:** [https://jobrocket-site.onrender.com](https://jobrocket-site.onrender.com)
- **Backend:** Express server on Render
- **Database:** MongoDB Atlas

### Build Commands

#### Frontend
```bash
npm run build
```
Output: `dist/` directory

#### Backend
```bash
npm start
```
Entry point: `index.js`

### Environment Configuration

**Production CORS:**
```javascript
origin: 'https://jobrocket-site.onrender.com'
```

**MongoDB:**
- Use MongoDB Atlas for production
- Set `MONGO_ATLAS_URI` in environment variables

---

## 🗄️ Database Schema

### Users Collection

```javascript
{
  email: String (unique, required),
  password: String (hashed),
  phone: String,
  profileType: enum ['jobseeker', 'business', 'admin'],
  isAdmin: Boolean,

  jobseekerProfile: {
    embedding: [Number],  // OpenAI vector
    firstName: String,
    lastName: String,
    highestEducation: String,
    preferredWorkArrangement: String,
    linkedinPage: String,
    resume: String,
    skills: [String],
    description: String
  },

  businessProfile: {
    companyName: String,
    location: { country: String, city: String },
    logo: { url: String, alt: String },
    industry: String,
    numberOfEmployees: String,
    website: String,
    contactEmail: String,
    socialMedia: Object,
    description: String
  },

  createdAt: Date
}
```

### Listings Collection

```javascript
{
  businessId: ObjectId,
  embedding: [Number],  // OpenAI vector
  companyName: String,
  jobTitle: String,
  jobDescription: String,
  requirements: [String],
  advantages: [String],
  location: {
    region: String,
    city: String
  },
  workArrangement: String,
  industry: String,
  apply: {
    method: enum ['email', 'link'],
    contact: String
  },
  likes: [ObjectId],
  isActive: Boolean,
  createdAt: Date,
  expiresAt: Date
}
```

### Applications Collection

```javascript
{
  listingId: ObjectId,
  applicantId: ObjectId (optional),
  firstName: String,
  lastName: String,
  applicantEmail: String,
  phone: String,
  resume: String,
  message: String,
  status: enum ['pending', 'reviewed', 'rejected'],
  hiddenFromBusiness: Boolean,
  createdAt: Date
}
```

---

## 🤖 AI Features

### OpenAI Integration

**Model:** `text-embedding-3-small`

**Use Cases:**
1. **Profile Embeddings** - Convert jobseeker profiles into vector representations
2. **Listing Embeddings** - Convert job listings into vector representations
3. **Match Scoring** - Calculate similarity between jobseeker and listing vectors
4. **Recommendations** - Suggest best-fit jobs based on profile match

**How It Works:**
```javascript
// Generate embedding for jobseeker profile
const profileText = `${skills.join(', ')} ${description} ${education}`;
const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: profileText
});

// Calculate match score using cosine similarity
const matchScore = cosineSimilarity(jobseekerEmbedding, listingEmbedding);
```

---

## 📊 Development Features

### Auto-Seeding (Development Mode)

When `NODE_ENV=development`, the server automatically seeds:
- Dummy jobseekers
- Dummy businesses
- Sample job listings
- Sample applications

### Logging

- **HTTP Requests:** Morgan middleware
- **Errors:** Custom error logger with file output
- **Console:** Chalk-colored logs for better readability

---

## 🔧 Configuration Files

### Backend Config Structure

```
backend/config/
├── default.json       # Base configuration
├── development.json   # Dev overrides
├── production.json    # Prod overrides
└── test.json         # Test overrides
```

**Example `development.json`:**
```json
{
  "MONGO_LOCAL_URI": "mongodb://localhost:27017/jobRocket",
  "MONGO_ATLAS_URI": "",
  "TOKEN_GENERATOR": "jwt",
  "PORT": 3000
}
```

---

## 🎨 Design & UI

### Mantine Theme

Custom theme configuration with:
- Custom color schemes
- Typography settings
- Component overrides
- Responsive breakpoints

### Animations

Framer Motion animations for:
- Page transitions
- Modal dialogs
- List items
- Button interactions

---

## 🐛 Error Handling

### Backend

- Centralized error handling middleware
- Custom error objects with status codes
- Validation error responses
- Try-catch in all async operations
- Error logging to files

### Frontend

- Axios interceptors for API errors
- Toast notifications for user feedback
- Error boundaries for React components
- Form validation error displays

---

## 🛡️ Security Best Practices

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Rate limiting on sensitive endpoints
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ MongoDB injection prevention
- ✅ Account lockout mechanism
- ✅ HTTPS in production
- ✅ Environment variable protection

---

## 📝 License

This project is for educational and portfolio purposes.

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Mantine UI](https://mantine.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [OpenAI](https://openai.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📞 Contact & Support

For questions, issues, or contributions, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, Node.js, and MongoDB**

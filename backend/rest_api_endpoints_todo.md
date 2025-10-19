# REST API Endpoints - Development Checklist

## Users Endpoints

### 1. User Registration (POST)
- [X] **1.1** Create POST endpoint for user registration
- [X] **1.2** Implement user schema with name object (first, middle, last)
- [ ] **1.3** Add email validation and required field validation
- [ ] **1.4** Check for existing user and return 400 error with joi validation
- [ ] **1.5** Return 200 response with user ID and email on success
- [ ] **1.6** Store user data in database successfully
- [ ] **1.7** Handle default values for database fields:
  - [ ] **1.7.1** Generate unique _id
  - [ ] **1.7.2** Set default image.url if not provided
  - [ ] **1.7.3** Set default image.alt if not provided
  - [ ] **1.7.4** Set default address.state if not provided
  - [ ] **1.7.5** Set isAdmin default to false
  - [ ] **1.7.6** Add createdAt timestamp
  - [ ] **1.7.7** Add __v version field
- [ ] Encrypt password using bcrypt module

### 2. User Login (POST)
- [ ] **2.1** Create POST endpoint for user login
- [ ] **2.2** Validate email exists and password is correct
- [ ] **2.3** Return 400 error with "Invalid email or password" for wrong credentials
- [ ] **2.4** Generate and return JWT token on successful login containing:
  - [ ] **2.4.1** User _id
  - [ ] **2.4.2** isBusiness status
  - [ ] **2.4.3** isAdmin status

### 3. Get All Users (GET)
- [ ] **3.1** Create GET endpoint to retrieve all users
- [ ] **3.2** Verify valid token (from section 2)
- [ ] **3.3** Return 401 if no valid token provided
- [ ] **3.4** Return 403 if user is not admin
- [ ] **3.5** Return 200 with all users (excluding passwords)

### 4. Get User Profile (GET)
- [ ] **4.1** Create GET endpoint with user ID as param
- [ ] **4.2** Verify token is provided
- [ ] **4.3** Return 401 if no valid token
- [ ] **4.4** Return 403 if user cannot access profile
- [ ] **4.5** Return 200 with user profile data (exclude password, isAdmin, __v)

### 5. Update User Status (PATCH)
- [ ] **5.1** Create PATCH endpoint to change user to business user
- [ ] **5.2** Verify token is provided
- [ ] **5.3** Return 401 if no valid token
- [ ] **5.4** Return 403 if unauthorized
- [ ] **5.5** Return 200 with updated user data (exclude isAdmin, password, __v)

### 6. Edit User Profile (PUT)
- [ ] **6.1** Create PUT endpoint for editing user profile
- [ ] **6.2** Verify token is provided
- [ ] **6.3** Return 401 if no valid token
- [ ] **6.4** Return 403 if unauthorized
- [ ] **6.5** Update user and return 200 (exclude password, __v)

### 7. Delete User (DELETE)
- [ ] **7.1** Create DELETE endpoint for user deletion
- [ ] **7.2** Verify token is provided
- [ ] **7.3** Return 401 if no valid token
- [ ] **7.4** Return 403 if unauthorized
- [ ] **7.5** Delete user and return 200 (exclude password, isAdmin)

## Cards Endpoints

### 1. Get All Cards (GET)
- [ ] **1.1** Create GET endpoint to retrieve all cards
- [ ] **1.2** Allow access without authentication (public endpoint)
- [ ] **1.3** Return all preserved cards

### 2. Get Card by ID (GET)
- [ ] **2.1** Create GET endpoint with card ID as param
- [ ] **2.2** Allow access without authentication
- [ ] **2.3** Return specific card data

### 3. Get User's Cards (GET)
- [ ] **3.1** Create GET endpoint for registered user's cards
- [ ] **3.2** Verify token is provided
- [ ] **3.3** Return 401 if no valid token
- [ ] **3.4** Return cards associated with authenticated user

### 4. Get Liked Cards (GET)
- [ ] **4.1** Create GET endpoint for user's liked cards
- [ ] **4.2** Verify token is provided
- [ ] **4.3** Return 401 if no valid token
- [ ] **4.4** Return cards marked as liked by user

### 5. Create New Card (POST)
- [ ] **5.1** Create POST endpoint for new card creation
- [ ] **5.2** Verify token is provided
- [ ] **5.3** Return 401 if no valid token
- [ ] **5.4** Validate user is business account
- [ ] **5.5** Perform card validation using joi and mongoose
- [ ] **5.6** Handle successful card creation
- [ ] **5.7** Implement email and required field validation
- [ ] **5.8** Store card data in database
- [ ] **5.9** Handle default database values:
  - [ ] **5.9.1** Generate unique _id
  - [ ] **5.9.2** Set default image.url
  - [ ] **5.9.3** Set default image.alt
  - [ ] **5.9.4** Set default address.state
  - [ ] **5.9.5** Initialize likes array
- [ ] **5.10** Set user relationship fields:
  - [ ] **5.10.1** Generate unique bizNumber
  - [ ] **5.10.2** Add createdAt timestamp
  - [ ] **5.10.3** Add __v version
- [ ] **5.11** Save card to database
- [ ] **5.12** Return 201 response with created card
- [ ] **5.13** Return 400 with mongoose error on failure

### 6. Edit Card (PUT)
- [ ] **6.1** Create PUT endpoint with card ID param
- [ ] **6.2** Verify token is provided
- [ ] **6.3** Return 401 if no valid token
- [ ] **6.4** Validate user owns the card or is admin
- [ ] **6.5** Return 400 if card not found
- [ ] **6.6** Update card and return success response

### 7. Delete Card (DELETE)
- [ ] **7.1** Create DELETE endpoint with card ID param
- [ ] **7.2** Verify token is provided
- [ ] **7.3** Return 401 if no valid token
- [ ] **7.4** Validate user is business or admin
- [ ] **7.5** Delete card and return success response

### 8. Toggle Card Like (PATCH)
- [ ] **8.1** Create PATCH endpoint for like/unlike functionality
- [ ] **8.2** Verify token is provided
- [ ] **8.3** Return 401 if no valid token
- [ ] **8.4** Toggle like status for the card
- [ ] **8.5** Update likes array in database
- [ ] **8.6** Return updated card data

## General Requirements

### Project Setup
- [ ] Initialize Node.js project with required dependencies
- [ ] Configure Express server
- [ ] Set up MongoDB connection (local and Atlas)
- [ ] Configure environment variables
- [ ] Set up middleware (cors, morgan, express.json, etc.)

### Security & Validation
- [ ] Implement JWT authentication
- [ ] Set up bcrypt password hashing  
- [ ] Configure joi validation schemas
- [ ] Add error handling middleware
- [ ] Implement request logging with morgan

### Initial Data
- [ ] Create seed data for 3 sample users
- [ ] Create seed data for 3 sample cards

### Error Handling
- [ ] Configure 404 "Page not found" handler
- [ ] Implement consistent error response format
- [ ] Add chalk for colored console logging
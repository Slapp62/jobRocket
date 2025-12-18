# Logging Examples - Before & After

This document shows real examples of how to integrate the new logging system into existing JobRocket code.

## Example 1: Embedding Service

### Before (No Logging)

```javascript
// services/embeddingService.js
async function generateEmbedding(text) {
  if (!openai) {
    return Array(1536).fill(0);
  }
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}
```

### After (With Logging)

```javascript
// services/embeddingService.js
const { logAI, logExternalAPI, logError, createTimer } = require('../utils/logHelpers');

async function generateEmbedding(text, entityType = 'unknown', entityId = null) {
  const endTimer = createTimer('generate-embedding');

  try {
    if (!openai) {
      // Mock for testing
      logAI('generate-embedding-mock', {
        entityType,
        entityId,
        textLength: text.length,
        environment: 'test'
      });
      return Array(1536).fill(0);
    }

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    const embedding = response.data[0].embedding;

    // Log successful API call
    logExternalAPI('OpenAI', 'embeddings.create', {
      model: 'text-embedding-3-small',
      inputLength: text.length,
      tokensUsed: response.usage?.total_tokens,
      success: true
    });

    // Log AI operation
    logAI('generate-embedding', {
      entityType,
      entityId,
      vectorDimensions: embedding.length,
      textLength: text.length
    });

    endTimer({ success: true, entityType });
    return embedding;

  } catch (error) {
    logError(error, {
      operation: 'generate-embedding',
      entityType,
      entityId,
      textLength: text.length
    });
    endTimer({ success: false, entityType });
    throw error;
  }
}
```

## Example 2: User Controller

### Before (No Logging)

```javascript
// controllers/usersController.js
const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### After (With Logging)

```javascript
// controllers/usersController.js
const { logAuth, logDatabase, logError } = require('../utils/logHelpers');

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword
    });

    // Log database operation
    logDatabase('create', 'Users', {
      userId: user._id,
      profileType: user.profileType,
      email: user.email
    });

    // Log authentication event
    logAuth('register', user._id, {
      profileType: user.profileType,
      ip: req.ip
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logError(error, {
      operation: 'user-registration',
      email: req.body.email,
      profileType: req.body.profileType,
      ip: req.ip
    });
    res.status(500).json({ message: error.message });
  }
};
```

## Example 3: Matching Service

### Before (No Logging)

```javascript
// services/matchingService.js
async function calculateMatchScore(jobseekerId, listingId) {
  const jobseeker = await User.findById(jobseekerId);
  const listing = await Listing.findById(listingId);

  const score = cosineSimilarity(jobseeker.embedding, listing.embedding);
  return normalizeScore(score);
}
```

### After (With Logging)

```javascript
// services/matchingService.js
const { logAI, logPerformance, logError, createTimer } = require('../utils/logHelpers');

async function calculateMatchScore(jobseekerId, listingId) {
  const endTimer = createTimer('calculate-match-score');

  try {
    const jobseeker = await User.findById(jobseekerId);
    const listing = await Listing.findById(listingId);

    if (!jobseeker?.embedding || !listing?.embedding) {
      logError(new Error('Missing embeddings'), {
        operation: 'calculate-match-score',
        jobseekerId,
        listingId,
        hasJobseekerEmbedding: !!jobseeker?.embedding,
        hasListingEmbedding: !!listing?.embedding
      });
      return 0;
    }

    const score = cosineSimilarity(jobseeker.embedding, listing.embedding);
    const normalized = normalizeScore(score);

    // Log AI operation
    logAI('calculate-match', {
      jobseekerId,
      listingId,
      matchScore: normalized,
      algorithm: 'cosine-similarity'
    });

    // Log performance if slow
    const duration = Date.now();
    endTimer({
      jobseekerId,
      listingId,
      matchScore: normalized
    });

    return normalized;

  } catch (error) {
    logError(error, {
      operation: 'calculate-match-score',
      jobseekerId,
      listingId
    });
    endTimer({ success: false });
    throw error;
  }
}
```

## Example 4: Authentication Middleware

### Before (No Logging)

```javascript
// middleware/authMiddleware.js
const authenticateUser = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Access denied. Please log in.' });
  }
  req.user = req.session.user;
  next();
};
```

### After (With Logging)

```javascript
// middleware/authMiddleware.js
const { logSecurity } = require('../utils/logHelpers');

const authenticateUser = (req, res, next) => {
  if (!req.session.user) {
    // Log unauthorized access attempt
    logSecurity('unauthorized-access', {
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
      userAgent: req.get('user-agent')
    });
    return res.status(401).json({ message: 'Access denied. Please log in.' });
  }
  req.user = req.session.user;
  next();
};
```

## Example 5: Rate Limiting

### Before (No Logging)

```javascript
// middleware/rateLimiting.js
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts. Please try again later.'
});
```

### After (With Logging)

```javascript
// middleware/rateLimiting.js
const { logSecurity } = require('../utils/logHelpers');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts. Please try again later.',
  handler: (req, res) => {
    // Log rate limit violation
    logSecurity('rate-limit-exceeded', {
      ip: req.ip,
      endpoint: 'login',
      userAgent: req.get('user-agent')
    });
    res.status(429).json({
      message: 'Too many login attempts. Please try again later.'
    });
  }
});
```

## Example 6: Application Service

### Before (No Logging)

```javascript
// services/applicationService.js
async function submitApplication(applicantId, listingId, applicationData) {
  const application = await Application.create({
    applicantId,
    listingId,
    ...applicationData,
    status: 'pending'
  });

  return application;
}
```

### After (With Logging)

```javascript
// services/applicationService.js
const { logBusiness, logDatabase, logError } = require('../utils/logHelpers');

async function submitApplication(applicantId, listingId, applicationData) {
  try {
    const application = await Application.create({
      applicantId,
      listingId,
      ...applicationData,
      status: 'pending'
    });

    // Get additional context
    const listing = await Listing.findById(listingId);

    // Log database operation
    logDatabase('create', 'Applications', {
      applicationId: application._id,
      applicantId,
      listingId,
      status: 'pending'
    });

    // Log business event
    logBusiness('application-submitted', {
      applicationId: application._id,
      applicantId,
      listingId,
      businessId: listing?.user_id,
      jobTitle: listing?.jobTitle
    });

    return application;

  } catch (error) {
    logError(error, {
      operation: 'submit-application',
      applicantId,
      listingId
    });
    throw error;
  }
}
```

## Example 7: Cloudinary Upload

### Before (No Logging)

```javascript
// services/cloudinaryService.js
async function uploadResume(fileBuffer, userId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'resumes' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}
```

### After (With Logging)

```javascript
// services/cloudinaryService.js
const { logExternalAPI, logError, createTimer } = require('../utils/logHelpers');

async function uploadResume(fileBuffer, userId) {
  const endTimer = createTimer('cloudinary-upload');

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'resumes' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });

    // Log successful upload
    logExternalAPI('Cloudinary', 'upload-resume', {
      userId,
      fileSize: fileBuffer.length,
      publicId: result.public_id,
      url: result.secure_url,
      success: true
    });

    endTimer({ success: true, userId });
    return result;

  } catch (error) {
    logError(error, {
      operation: 'cloudinary-upload',
      userId,
      fileSize: fileBuffer.length
    });
    endTimer({ success: false, userId });
    throw error;
  }
}
```

## Quick Reference: Which Helper to Use?

| Scenario | Helper Function | Category |
|----------|----------------|----------|
| User registers | `logAuth('register', userId, {...})` | authentication |
| User logs in | `logAuth('login', userId, {...})` | authentication |
| Login fails | `logAuth('failed-login', null, {...})` | authentication |
| Create/update/delete DB record | `logDatabase('create', 'ModelName', {...})` | database |
| Job application submitted | `logBusiness('application-submitted', {...})` | business |
| Match score calculated | `logBusiness('match-calculated', {...})` | business |
| OpenAI API call | `logExternalAPI('OpenAI', 'operation', {...})` | external-api |
| Cloudinary upload | `logExternalAPI('Cloudinary', 'upload', {...})` | external-api |
| Rate limit hit | `logSecurity('rate-limit-exceeded', {...})` | security |
| Unauthorized access | `logSecurity('unauthorized-access', {...})` | security |
| Try/catch error | `logError(error, {...})` | error |
| Measure performance | `createTimer('operation-name')` | performance |
| Generate embedding | `logAI('generate-embedding', {...})` | ai |
| Calculate recommendation | `logAI('calculate-match', {...})` | ai |

## Tips for Adding Logging to Existing Code

1. **Start with error handlers** - Add `logError()` to all try/catch blocks
2. **Add auth events** - Log all login, logout, register events
3. **Log external APIs** - Track OpenAI, Cloudinary, etc.
4. **Monitor performance** - Add timers to slow operations
5. **Track business events** - Applications, matches, listings
6. **Don't overdo it** - Focus on important events, not every line

## What NOT to Log

```javascript
// ❌ BAD - Logging sensitive data
logAuth('login', user._id, {
  password: req.body.password  // NEVER!
});

// ❌ BAD - Logging full objects
logDatabase('create', 'Users', {
  user: user  // Too verbose, logs everything
});

// ❌ BAD - Logging in loops
for (let i = 0; i < 1000; i++) {
  logger.debug(`Processing item ${i}`);  // Creates noise
}

// ✅ GOOD - Sanitized, relevant data
logAuth('login', user._id, {
  email: user.email,
  ip: req.ip
});

// ✅ GOOD - Specific fields only
logDatabase('create', 'Users', {
  userId: user._id,
  email: user.email,
  profileType: user.profileType
});

// ✅ GOOD - Summary logging
logger.info('Batch process completed', {
  itemsProcessed: 1000,
  duration: '5s',
  errors: 3
});
```

const { encryptPassword } = require('../utils/bcrypt');
const normalizeListing = require('../utils/normalizeListing');
const Listing = require('../models/Listings');
const Users = require('../models/Users');
const Applications = require('../models/Applications');

const seedDevData = async (users, listings, applications = []) => {
  for (const user of users) {
    try {
      const existingUser = await Users.findOne({ email: user.email });
      if (existingUser) {
        continue;
      }
      const hashedPassword = await encryptPassword(user.password);
      user.password = hashedPassword;
      const newUser = new Users(user);
      await newUser.save();
    } catch (error) {
      console.error('Error seeding user:', error);
    }
  }

  const businessUser = await Users.findOne({ profileType: 'business' });
  const seededListings = [];
  for (const listing of listings) {
    try {
      const storedListing = await Listing.findOne({
        jobTitle: listing.jobTitle,
      });
      if (storedListing) {
        seededListings.push(storedListing);
        continue;
      }
      const normalizedListing = await normalizeListing(
        listing,
        businessUser._id
      );
      const newListing = new Listing(normalizedListing);
      await newListing.save();
      seededListings.push(newListing);
    } catch (error) {
      console.error('Error seeding listing:', error);
    }
  }

  // Seed applications
  for (const application of applications) {
    try {
      const applicant = await Users.findOne({
        email: application.applicantEmail,
      });
      if (!applicant) {
        console.error(`Applicant not found: ${application.applicantEmail}`);
        continue;
      }

      const listing = seededListings[application.listingIndex];
      if (!listing) {
        console.error(
          `Listing not found at index: ${application.listingIndex}`
        );
        continue;
      }

      // Check if application already exists
      const existingApplication = await Applications.findOne({
        listingId: listing._id,
        applicantId: applicant._id,
      });
      if (existingApplication) {
        continue;
      }

      const newApplication = new Applications({
        listingId: listing._id,
        firstName: application.firstName,
        lastName: application.lastName,
        applicantEmail: application.applicantEmail,
        phone: application.phone,
        applicantId: applicant._id,
        resume: application.resume,
        coverLetter: application.coverLetter,
        message: application.message,
        status: application.status,
      });
      await newApplication.save();
    } catch (error) {
      console.error('Error seeding application:', error);
    }
  }
};

const seedTestData = async (users, listings, applications = []) => {
  try {
    await Users.deleteMany({});
    await Listing.deleteMany({});
    await Applications.deleteMany({});
  } catch (error) {
    console.error('Error deleting data:', error);
  }

  for (const user of users) {
    try {
      const hashedPassword = await encryptPassword(user.password);
      const userCopy = { ...user, password: hashedPassword };
      const newUser = new Users(userCopy);
      await newUser.save();
    } catch (error) {
      console.error('Error seeding user:', error);
    }
  }

  const businessUser = await Users.findOne({ profileType: 'business' });
  const seededListings = [];
  for (const listing of listings) {
    try {
      const normalizedListing = await normalizeListing(
        listing,
        businessUser._id
      );
      const newListing = new Listing(normalizedListing);
      await newListing.save();
      seededListings.push(newListing);
    } catch (error) {
      console.error('Error seeding listing:', error);
    }
  }

  // Seed applications
  for (const application of applications) {
    try {
      const applicant = await Users.findOne({
        email: application.applicantEmail,
      });
      if (!applicant) {
        console.error(`Applicant not found: ${application.applicantEmail}`);
        continue;
      }

      const listing = seededListings[application.listingIndex];
      if (!listing) {
        console.error(
          `Listing not found at index: ${application.listingIndex}`
        );
        continue;
      }

      const newApplication = new Applications({
        listingId: listing._id,
        applicantId: applicant._id,
        resume: application.resume,
        coverLetter: application.coverLetter,
        message: application.message,
        status: application.status,
      });
      await newApplication.save();
    } catch (error) {
      console.error('Error seeding application:', error);
    }
  }
};

module.exports = {
  seedDevData,
  seedTestData,
};

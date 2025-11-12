const { encryptPassword } = require('../utils/bcrypt');
const normalizeListing = require('../utils/normalizeListing');
const Listing = require('../models/Listings');
const Users = require('../models/Users');

const seedDevData = async (users, listings) => {
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
  for (const listing of listings) {
    try {
      const storedListing = await Listing.findOne({
        jobTitle: listing.jobTitle,
      });
      if (storedListing) {
        continue;
      }
      const normalizedListing = await normalizeListing(
        listing,
        businessUser._id
      );
      const newListing = new Listing(normalizedListing);
      await newListing.save();
    } catch (error) {
      console.error('Error seeding listing:', error);
    }
  }
};

const seedTestData = async (users, listings) => {
  try {
    await Users.deleteMany({});
    await Listing.deleteMany({});
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
  for (const listing of listings) {
    try {
      const normalizedListing = await normalizeListing(
        listing,
        businessUser._id
      );
      const newListing = new Listing(normalizedListing);
      await newListing.save();
    } catch (error) {
      console.error('Error seeding listing:', error);
    }
  }
};

module.exports = {
  seedDevData,
  seedTestData,
};

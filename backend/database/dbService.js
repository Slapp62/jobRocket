const { connectLocalDB } = require('./mongoDB/connectLocally');
const { connectAtlasDB } = require('./mongoDB/connectAtlas');
const { connectTestDB } = require('./mongoDB/connectTest');

// Use process.env.NODE_ENV directly instead of config
const ENV = process.env.NODE_ENV || 'development';

const connectToDB = async () => {
  if (ENV === 'development') {
    await connectLocalDB();
  }
  if (ENV === 'production') {
    await connectAtlasDB();
  }
  if (ENV === 'test') {
    await connectTestDB();
  }
};

module.exports = { connectToDB };

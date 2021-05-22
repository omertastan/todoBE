const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  collections.forEach(async (coll) => await coll.deleteMany({}));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

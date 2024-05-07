const mongoose = require('mongoose');

const mongoURI = "mongodb://0.0.0.0/iNotebook"; 

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:");
  }
};

module.exports = connectToMongo;

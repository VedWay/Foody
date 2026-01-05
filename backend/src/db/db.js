import mongoose from 'mongoose';

function connectDb() {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
}

export default connectDb;



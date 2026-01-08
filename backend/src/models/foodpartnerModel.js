import mongoose from 'mongoose';

const foodPartnerSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  businessCategory: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('FoodPartner', foodPartnerSchema);


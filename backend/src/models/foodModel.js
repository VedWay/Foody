import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
    default: 'In Stock',
  },
  veg: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodPartner', 
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Food", foodSchema);

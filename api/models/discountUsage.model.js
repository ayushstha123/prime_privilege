import mongoose from 'mongoose';

const discountUsageSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const DiscountUsage = mongoose.model('DiscountUsage', discountUsageSchema);

export default DiscountUsage;

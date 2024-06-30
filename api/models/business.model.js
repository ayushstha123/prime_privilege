import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      default: '',
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    socialMedia: {
      type: [String],
      unique: true,
    },
    role: {
      type: String,
      enum: ['idleBusiness', 'business'],
      default: 'idleBusiness',
    },
  },
  { timestamps: true }
);

const Business = mongoose.model('Business', businessSchema);

export default Business;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    college:{
      type:String,
      required:true,
      default:"Prime College"
    },
    level:{
      type:String,
      required:true,
      default:'+2'
    },
    phoneNum: {
      type: String,
      required: true,
    },
    address:{
      type:String,
      required:true,
    },
    collegeId: {
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    role: {
      type: String,
      enum: ['visitor', 'student', 'shopkeeper', 'admin'],
      default: 'visitor', 
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;

const mongoose =require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
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
      default:"Prime College"
    },
    level:{
      type:String,
      default:''
    },
    phoneNum: {
      type: String,
    },
    address:{
      type:String,
    },
    document: {
      type: String,
      default:'',
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    role: {
      type: String,
      enum: ['idleStudent','student','admin'],
      required:true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;

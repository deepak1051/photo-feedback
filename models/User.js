import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);
export default User;

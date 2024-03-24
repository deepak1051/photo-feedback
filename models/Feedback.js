import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  votes: [
    {
      userId: String,
      imageUrl: String,
    },
  ],
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;

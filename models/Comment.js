import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feedback',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // replies: [
    //   {
    //     text: {
    //       type: String,
    //       required: true,
    //     },
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'User',
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;

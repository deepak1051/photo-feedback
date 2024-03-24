import mongoose from 'mongoose';

const replyCommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const ReplyComment = mongoose.model('ReplyComment', replyCommentSchema);
export default ReplyComment;

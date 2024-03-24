import Comment from '../models/Comment.js';
import ReplyComment from '../models/ReplyComment.js';

export const getComments = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    if (!feedbackId)
      return res.status(400).json({ msg: 'Feedback ID is required' });

    const comments = await Comment.find({ feedback: feedbackId }).populate(
      'user'
    );

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { feedbackId } = req.params;

    if (!feedbackId)
      return res.status(400).json({ msg: 'Feedback ID is required' });
    if (!text) return res.status(400).json({ msg: 'Comment text is required' });

    const comment = await Comment.create({
      text,
      feedback: feedbackId,
      user: req.user._id,
    });

    res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createReplyComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment)
      return res.status(400).json({ msg: 'Comment does not exist' });

    const newCommentReply = await ReplyComment.create({
      text,
      comment: commentId,
      user: req.user._id,
    });

    return res.status(201).json(newCommentReply);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getReplyComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const commentReplys = await ReplyComment.find({
      comment: commentId,
    }).populate('user');

    return res.status(200).json(commentReplys);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!commentId)
      return res.status(400).json({ msg: 'Comment ID is required' });

    await Comment.findByIdAndDelete(commentId);

    await ReplyComment.deleteMany({ comment: commentId });

    return res.status(200).json('Comment deleted with Its Replies');
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

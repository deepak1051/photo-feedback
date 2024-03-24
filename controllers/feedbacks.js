import Feedback from '../models/Feedback.js';

export const getUserFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user._id });
    return res.status(200).json(feedbacks);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getSingleFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const feedback = await Feedback.findById(feedbackId);
    return res.status(200).json(feedback);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    return res.status(200).json(feedbacks);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createFeedback = async (req, res) => {
  try {
    const { title, image1, image2 } = req.body;

    if (!title || !image1 || !image2) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const newFeedback = Feedback.create({
      title,
      image1,
      image2,
      user: req.user._id,
    });

    return res.status(201).json(newFeedback);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const voteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ msg: 'Feedback Image is Required' });
    }

    const feedback = await Feedback.findById(feedbackId);

    const isUserExist = feedback.votes.find((v) => v.userId == req.user._id);

    if (!isUserExist) {
      await feedback.updateOne({
        $push: { votes: { userId: req.user._id, imageUrl } },
      });
      return res.status(200).json({ message: 'the feedback has been voted' });
    }

    const isUserAndImageExist = feedback.votes.find(
      (v) => v.userId == req.user._id && v.imageUrl == imageUrl
    );

    if (isUserAndImageExist) {
      await feedback.updateOne({ $pull: { votes: { userId: req.user._id } } });

      return res
        .status(200)
        .json({ message: 'the feedback has been un voted' });
    } else {
      await feedback.updateOne({ $pull: { votes: { userId: req.user._id } } });

      await feedback.updateOne({
        $push: { votes: { userId: req.user._id, imageUrl } },
      });

      return res
        .status(200)
        .json({ message: 'the feedback has been togggled' });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

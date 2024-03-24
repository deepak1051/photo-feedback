import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user_id: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, date } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const _newNote = new Note({
      title,
      content,
      date,
      user_id: req.user._id,
    });

    const newNote = await _newNote.save();
    return res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: 'Note ID is required' });
    }

    await Note.findByIdAndDelete(id);

    res.json({ msg: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, content, date } = req.body;
    await Note.findByIdAndUpdate(id, {
      title,
      content,
      date,
    });
    res.json({ msg: 'Note updated' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const User = require('../models/user')

exports.saveFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { movieId } = req.body;

  if (!user.favorites.includes(movieId)) {
    user.favorites.push(movieId);
    await user.save();
  }

  res.json({ favorites: user.favorites });
};

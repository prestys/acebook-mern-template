const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
  Index: (req, res) => {
    const userID = req.params.userID;
    User.findById(userID, async (err, user) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(user._id);
      res.status(200).json({ user: user, token: token });
    });
  },
  
};

module.exports = UsersController;

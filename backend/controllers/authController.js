const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const harshed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: harshed});
    res.status(201).json({message: 'User created' });
};

exports.login = async (req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid Credentials"});

    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d'});

    const safeUser = {
        id: user._id,
        username: user.username,
        email: user.email
    }
    res.json({token, user:safeUser });
};
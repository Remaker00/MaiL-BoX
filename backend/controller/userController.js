const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.insertusers = async (req, res) => {
    const { email, password } = req.body.dataToSend;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(409).send('Email ID is already registered.');
        }
        const hashpass = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashpass });
        res.status(201).send('User SignedIn successfully.');

    } catch (err) {
        console.error(err);
        res.status(500).send('Error Signing user.');
    }
};

exports.checkusers = async (req, res) => {
    const { email, password } = req.body.dataToSend;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send('Invalid credentials.');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials.');
        }

        const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET);
        res.status(200).json({ message: `Login successful`, email: user.email, token });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error Logging user.');
    }
};
const { userService } = require('../services')
const { asyncWrap } = require('../utils/error')

const signUp = asyncWrap(async (req, res) => {
    const { name, email, password, address, phoneNumber } = req.body;

    if (!name || !email || !password || !address || !phoneNumber) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await userService.signUp(name, email, password, address, phoneNumber);

    res.status(201).json({ message: 'User created successfully!' })
})

const signIn = asyncWrap(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const tokens = await userService.signIn(email, password);

    if (tokens.adminAccessToken) {
        return res.status(201).json({ adminAccessToken: tokens.adminAccessToken })
    }

    res.status(201).json({ accessToken: tokens.accessToken });
})

const getAdmin = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const user = userService.getAdmin(token);
        if (user.role === 'admin') {
            return res.json({ message: 'Welcome to the admin Page' });
        } else {
            return res.sendStatus(403);
        }
    } catch (err) {
        return res.sendStatus(403);
    }
}

module.exports = {
    signUp,
    signIn,
    getAdmin
}
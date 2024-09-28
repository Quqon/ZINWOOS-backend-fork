require('dotenv').config();
const userRepository = require('./api/repositories/userRepository');

const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const routes = require('./api/routes');
const { globalErrorHandler } = require('./api/utils/error');
const path = require('path');
const { sequelize } = require('./api/models');
const session = require('express-session');
const fs = require('fs');
const crypto = require('crypto');
const FileStore = require('session-file-store')(session);
// const RedisStore = require('connect-redis').default;
// const redis = require('redis');

// const redisClient = redis.createClient();
// redisClient.on('error', (err) => {
//     console.log('Redis error: ', err);
// });
// redisClient.connect().catch(console.error);

const envPath = path.resolve(__dirname, '.env');

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');

    if (envContent.includes('SESSION_SECRET')) {
        console.log('SESSION_SECRET already exists in .env file. No changes made.')
    } else {
        const secret = crypto.randomBytes(32).toString('hex');
        const newContent = `${envContent}\nSESSION_SECRET=${secret}\n`;

        fs.writeFile(envPath, newContent, (err) => {
            if (err) {
                console.error('Error writing to .env file:', err);
            } else {
                console.log('SESSION_SECRET added to existing .env file.');
            }
        })
    }
} else {
    const secret = crypto.randomBytes(32).toString('hex');
    const envData = `SESSION_SECRET=${secret}\n`;

    fs.writeFile(envPath, envData, (err) => {
        if (err) {
            console.error('Error writing to .env file:', err)
        } else {
            console.log('.env file created/updated with SESSION_SECRET')
        }
    })
}

app.use(cors({
    origin: "http://zinwoos-frontend-fork.vercel.app",
    credentials: true,
}))
app.use(morgan('combined'));
app.use(express.json());
app.use(session({
    // store: new RedisStore({ client: redisClient }),
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 30,
        sameSite: 'none',
        httpOnly: true,
        secure: false,
    }
}));

app.get('/', (req, res) => {
    if (!req.session.sessionId) {
        req.session.sessionId = `sess_${Math.random().toString(36).substr(2, 9)}`;
    }

    res.json({ sessionId: req.session.sessionId })
});

app.use(routes);
app.use(globalErrorHandler);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT;

(async () => {
    try {
        await sequelize.sync({ logging: false, retry: { max: 3 }, pool: { acquire: 60000 } }); // 데이터베이스 동기화

        userRepository.setUserRole(1, 'admin')
            .then(() => console.log('Admin role set successfully'))
            .catch(err => console.error(err));

        app.listen(port, () => {
            console.log(`Listening to request on 127.0.0.1:${port}`);
        });
    } catch (err) {
        console.error('Failed to sync database:', err);
    }
})();
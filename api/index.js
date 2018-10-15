import express from 'express'
import session from 'express-session'
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken'

// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();

router.use(express.json());

router.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
});

app.use(
    jwt({ secret: 'dummy' }).unless({
        path: '/api/login'
    })
);

// Add POST - /api/login
router.post('/login', (req, res) => {
    if (req.body.username === 'demo' && req.body.password === 'demo') {
        req.session.authUser = { username: 'demo' }
        return res.json({ username: 'demo' })
    }
    //return res.json({ username: 'demo' })
    //res.status(401).json({ message: 'Bad credentials' })
    let username = 'demo';

    const accessToken = jsonwebtoken.sign(
        {
            username,
            picture: 'https://github.com/nuxt.png',
            name: 'User ' + username,
            scope: ['test', 'user']
        },
        'dummy'
    );
    
    res.json({
        token: {
            accessToken
        }       
    });
})

router.all('/me', (req, res) => {
    return res.json({ user: { username: 'demo' }})
})

// Add POST - /api/logout
router.all('/logout', (req, res) => {
    delete req.session.authUser
    res.json({ ok: true })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}

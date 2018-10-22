import express from 'express'
import session from 'express-session'
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken'

import axios from 'axios';

// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();

router.use(express.json());

/* router.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
})); */

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
});

/* router.use(
    jwt({ secret: 'dummy' })
        .unless({
            path: ['*']
            //path: ['*', '/api/login', '/api/logout', '/api/hot', '/api/me', '/api/filters', '/api/about', '/api/building/*']
        })
); */

router.all('/hot', async (req, res, next) => {
    try {
        let response = await axios.get('http://localhost:8001/api/landing');
        return res.json(response.data);
    }
    catch(err) {
        console.log(err);
        return next(err);
    }
});

router.all('/filters', async (req, res, next) => {
    try {
        return res.json({
            price: {
                min: 10000,
                max: 100000
            }
        });
    }
    catch(err) {
        console.log(err);
        return next(err);
    }

});
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
            email: 'email',
            picture: 'https://github.com/nuxt.png',
            name: 'User ' + username,
            scope: ['test', 'user']
        },
        'dummy',
        {
            expiresIn: '10s'
        }
    );
    
    res.json({
        token: {
            accessToken
        }       
    });
})

router.all('/me', (req, res) => {
    return res.json({ user: { username: 'demo', email: 'email' }})
})

router.all('/building/:id', async (req, res) => {
    //return res.json({ building: { id: 'demo', _id: req.params.id }})
    try {
        let response = await axios.get('http://localhost:8001/api/building/' + req.params.id);
        return res.json(response.data);
    }
    catch(err) {
        console.log(err);
        return next(err);
    }
})

// Add POST - /api/logout
router.all('/logout', (req, res) => {
    //delete req.session.authUser
    res.json({ ok: true })
})

router.all('*', (req, res) => {
    res.json({ ok: true })
})

router.use(
    function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send('invalid token...');
        }
        else {
            delete err.config;
            delete err.request;
            let error = JSON.stringify(err);
            res.status(error.httpStatusCode || 400).json(JSON.parse(error));
        }
    }
);

// Export the server middleware
export default {
  path: '/api',
  handler: router
}

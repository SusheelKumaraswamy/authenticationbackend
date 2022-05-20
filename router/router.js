const signupmodule = require('../module/module');
const express= require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup',signupmodule.signup);

router.post ('/login',signupmodule.login);

router.get("/welcome", auth, signupmodule.welcome);

module.exports = router;


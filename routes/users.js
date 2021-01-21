const {Router} = require('express');
const User = require('../models/user');
const router = Router();


router.get('/login', (req, res) => {
    res.render('login')
});
router.get('/register', (req, res) => {
    res.render('registration')
});

router.post('/login', async (req, res) => {
    const user = User.findOne({login: req.body.login}).lean()
    console.log(user)
    if(user!=null && user.password === req.body.password){
        res.redirect('/')
    }
    else {
        res.render('Sign up error')
    }
});
router.post('/register', async (req, res) => {
    const user = new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    });

    await user.save()
    res.redirect('/')
});
router.get('/', (req, res) =>{
    res.render('index')
})

module.exports = router;
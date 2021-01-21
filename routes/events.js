const {Router} = require('express');
const EventApplication = require('../models/eventapplication');
const router = Router();

router.get('/events', async (req, res) => {
    const applications = await EventApplication.find({}).lean()
    res.render('events', {
        title: 'Events',
        isIndex: true,
        applications
    })
});
router.get('/events/:id', async (req, res) =>{
    const event = await EventApplication.findById(req.params.id).lean()
    res.render('event', {
        event
    })
})
module.exports = router;
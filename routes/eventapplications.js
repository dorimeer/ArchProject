const {Router} = require('express');
const EventApplication = require('../models/eventapplication');
const router = Router();
const methodOverride = require('method-override');
router.use(methodOverride('_method'))

router.get('/applications', async (req, res) => {
    const applications = await EventApplication.find({}).lean()
        res.render('applications', {
        title: 'Event applications',
        isIndex: true,
        applications
    })
});
router.get('/applications/create',  (req, res) => {
    res.render('create', {
        title: 'Create Event Application',
        isCreate: true
    })
});
router.post('/applications/create', async (req, res) => {
    const app = new EventApplication({
        title: req.body.title,
        description: req.body.description,
        plannedTime: req.body.plannedTime,
    });

    await app.save();
    res.redirect('/applications')
});
router.get('/applications/:id', async (req, res) =>{
    const app = await EventApplication.findById(req.params.id).lean()
    res.render('app', {
        app
    })
})
router.post('/applications/:id', async (req, res) =>{
    const app = await  EventApplication.findById(req.body.id)
    app.accepted = true
    await app.save()
    res.redirect('/events')
})
router.delete('/applications/:id', (req, res) =>{
    EventApplication.findById(req.body.id).deleteOne()
    res.redirect('/applications')
})
module.exports = router;
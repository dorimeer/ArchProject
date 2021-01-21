const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const applicationRoutes = require('./routes/eventapplications')
const eventRoutes = require('./routes/events')
const userRoutes = require('./routes/users')


const PORT = process.env.PORT || 3000



const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(applicationRoutes)
app.use(eventRoutes)
app.use(userRoutes)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


async function start() {
    try {
        await mongoose.connect(
            'connectionstring',
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false
            }
        )
        app.listen(PORT, () => {
            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)
    }
}

start();

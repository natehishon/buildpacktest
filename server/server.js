const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const cors = require('cors');
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express()

const PORT = process.env.PORT  || 5000;





const user = require('./routes/user')

const router = express.Router();


// Middleware
app.use(morgan('dev'))

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())


//sessions
app.use(
    session({
        secret: 'pine-cone-yo-yo', //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false, //required
        saveUninitialized: false //required
    })
)

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

app.use('/user', user)



// Starting Server
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})

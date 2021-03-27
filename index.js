/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

// const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://Samuel:Lt1YGw42ik6YTuhc@cluster0.k4ttt.mongodb.net/test';
const app = express();
// const store = new MongoDBStore({
//     uri: MONGODB_URL,
//     collection: "sessions"
//   });

const chat = require('./routes/prove/prove12')
  

app
.set('view engine', 'ejs')
.set('views', path.join(__dirname, 'views'))
.use(express.static(path.join(__dirname, 'public')))
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.use(
    session({
        secret: 'random_text',
        cookie: {
            httpOnly: false
        }
    })
)
.use('/', chat)

const corsOptions = {
    origin: "https://cse341assignments.herokuapp.com/",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

                        
// mongoose
//     .connect(MONGODB_URL, options)
//     .then(result => {
//         User.findOne().then(user => {
//             if(!user) {
//                 const user = new User({
//                     name: 'Samuel',
//                     email: 'fakeemail@real.com',
//                     cart: {
//                         items: []
//                     }
//                 });
//                 user.save();
//             }
//         });
//     })
//     .catch(err => console.log(err));
const server = app.listen(PORT)
console.log('Connected to port 5000');

const io = require('socket.io')(server)
io.on('connection', socket => {
    console.log('Client connected!')

    socket
        .on('disconnect', () => {
            console.log('A client disconnected!')
        })
        .on('newUser', (username, time) => {
            // A new user logs in.
            const message = `${username} has logged on.`
            // Tell other users someone has logged on.
            socket.broadcast.emit('newMessage', {
                message,
                time,
                from: 'admin'
            })
        })
        .on('message', data => {
            // Receive a new message
            console.log('Message received')
            console.log(data)
            // This one is simple. Just broadcast the data we received.
            // We can use { ...data } to copy the data object.
            socket.broadcast.emit('newMessage', {
                ...data
            }) // Note, only emits to all OTHER clients, not sender.
        })
})

// pw:Lt1YGw42ik6YTuhc
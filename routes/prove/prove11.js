const express = require('express')
const router = express.Router()

const dummyData = {
    "avengers": [
        {
            "name": "Tony Stark",
            "favoriteColor": "Red"
        },
        {
            "name": "Steve Rogers",
            "favoriteColor": "Blue"
        },
        {
            "name": "Thor Odinson",
            "favoriteColor": "Yellow"
        },
        {
            "name": "Bruce Banner",
            "favoriteColor": "Green"
        },
        {
            "name": "Natasha Romanova",
            "favoriteColor": "Black"
        },
        {
            "name": "Clint Barton",
            "favoriteColor": "Purple"
        }
    ]
}

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData)
});

router.post('/insert', (req, res, next) => {
    console.log(req.body)
    // Typically you should do some sort of filtering and error checking. This is minimal, and makes sure we're not accepting empty values
    if (req.body.newName !== undefined || req.body.favoriteColor !== undefined) {
        const newName = req.body.newName
        const favoriteColor = req.body.favoriteColor
        if (dummyData.avengers.find(element => element.name === req.body.newName) === undefined
        ) { // Make our submissions somewhat unique.
            dummyData.avengers.push({ name: newName, favoriteColor: favoriteColor})
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400)
    }
})

router.get('/', (req, res, next) => {
    res.render('pages/prove/prove11', {
        title: 'Prove Assignment 11', 
        path: '/prove11'
    });
});

module.exports = router
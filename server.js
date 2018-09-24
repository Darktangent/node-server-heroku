const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
var app = express()
const port = process.env.PORT || 3000
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
// middleware
// app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log file')
        }
    })
    next()
})
// MAINTENANCE MIDDLEWARE
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         welcomeMessage: "Maintenence",
//         pageTitle: "Site is down"
//     })
// })
app.use(express.static(__dirname + '/public'))
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome to the Home Page',
        // currentYear: new Date().getFullYear(),
        welcomeMessage: "Welcome to the home page"
    })

    // res.send('<h1>Hello Express</h1>')
    // res.send({
    //     name: 'Rohan',
    //     likes: [
    //         'Biking',
    //         'swimming'
    //     ]
    // })
})
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'ABOUT PAGE',
        // currentYear: new Date().getFullYear()
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to resolve request"
    })
})
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        welcomeMessage: "Welcome to the Projects Page"
    })
})


app.listen(port, () => {
    console.log(`Server is up in port ${port}`)
})
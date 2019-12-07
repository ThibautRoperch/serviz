const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const home = require('./front/home')
const charts = require('./api/charts')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Routers
app.use('/', home)
app.use('/api/charts', charts)

// Listen
const port = 5000
app.listen(port, () => console.log(`Server listening on the port ${port}`))

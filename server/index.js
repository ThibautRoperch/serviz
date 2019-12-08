const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Config JSON
global.config = require('../config.json')

// Server
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Routers
const home = require('./front/home')
const charts = require('./api/charts')
app.use('/', home)
app.use('/api/charts', charts)

// Listen
const port = global.config.outputs.api.port || 5000
app.listen(port, () => console.log(`Server is listening on port ${port}`))

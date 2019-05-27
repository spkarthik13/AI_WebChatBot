const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

require('./routes/dialogFlowRoutes')(app)


const port = process.env.PORT || 1321
app.listen(port)

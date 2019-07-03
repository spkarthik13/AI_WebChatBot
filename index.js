const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

const config = require('./config/keys')
require('./models/Registration')
require('./models/Demand')
require('./models/Recommendations')

mongoose.connect(config.mongoURI, {useNewUrlParser: true})
app.use(bodyParser.json())

require('./routes/dialogFlowRoutes')(app)
require('./routes/fulfillmentRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    // js and css files
    app.use(express.static('client/build'));

    // index.html for all page routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 1321
app.listen(port)

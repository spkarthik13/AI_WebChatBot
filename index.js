const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.send({'Hello' : 'there!'})
})

const port = process.env.PORT || 1321
app.listen(port)

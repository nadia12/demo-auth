const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/', routes)


app.listen(PORT, () => console.log('Listen to port', PORT))

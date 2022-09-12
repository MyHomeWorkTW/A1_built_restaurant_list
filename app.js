// app.js
// require packages used in the project
const express = require('express')
const router = express.Router()


const exphbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
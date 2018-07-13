const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = (module.exports = express())
const port = parseInt(process.env.PORT || 3001)

const friends = require('./api/friends')
const restaurants = require('./api/restaurants')
const comments = require('./api/comments')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))
app.use(cors({ origin: true, credentials: true }))

app.use('/friends', friends)
app.use('/restaurants', restaurants)
app.use('/comments', comments)

app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
  const url = req.originalUrl
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    console.error('[404: Requested file not found] ', url)
  }
  res.status(404).send({ error: 'Url not found', status: 404, url })
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({ error: err.message, stack, url: req.originalUrl })
}

app
  .listen(port)
  .on('error', console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on ' + port))

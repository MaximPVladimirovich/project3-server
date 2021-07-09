require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
import app from "./express"
import path from 'path'
import devBundle from './devBundle'
import template from '../template'
devBundle.compile(app)


const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR,
  'dists')))

// Mongoose connection
mongoose.Promise = global.Promise
let DB_url = process.env.MONGODB_URI;
let database = mongoose.connection;
mongoose.connect(DB_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// Check db connection 
database.on(`error`, console.error.bind(console, `connection error`));
database.once(`open`, function () {
  console.log(`connected to db`)
})


app.get('/', function (req, res) {
  res.status(200).send(template())
})

// Listen on port
let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', port)
})
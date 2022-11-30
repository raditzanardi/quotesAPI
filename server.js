require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rzanardi:Aobcd8663@reactproject.onlmixx.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const quotesRouter = require('./routes/quotes')
app.use('/', quotesRouter)

app.listen(process.env.PORT || 3000, () => console.log('server started'))
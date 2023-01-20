const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require("./config/db")
const port = process.env.PORT || 5000
const fileupload = require('express-fileupload'); 

connectDB()
const app = express()

var cors = require('cors');
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(fileupload({useTempFiles: true}))

app.use('/auth', require('./routes/userRoute'))
app.use('/products', require('./routes/productsRoute'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server Started On Port ${port}!`))
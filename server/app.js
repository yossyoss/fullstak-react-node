const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const helmet = require("helmet")
const bodyParser = require("body-parser")

const { notFound, errorHandler } = require("./middlewares")

const app = express()
app.use(cors())
require("dotenv").config()

app.use(helmet())
app.use(morgan("dev"))
app.use(bodyParser.json())

const employees = require("./routes/employees")

app.use("/api/employees", employees)

app.use(notFound)
app.use(errorHandler)

module.exports = app
